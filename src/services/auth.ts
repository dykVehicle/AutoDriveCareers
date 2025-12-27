import { loadFromStorage, saveToStorage } from './storage';

export type AuthRole = 'candidate' | 'company';
export type AuthMethod = 'email' | 'phone';

export interface StoredUser {
  id: string;
  role: AuthRole;
  email?: string;
  phone?: string;
  passwordHash: string;
  createdAt: number;

  // candidate
  displayName?: string;

  // company
  companyName?: string;
  contactName?: string;
}

export interface AuthSession {
  token: string;
  userId: string;
  role: AuthRole;
  createdAt: number;
}

interface EmailCodeRecord {
  email: string;
  code: string;
  expiresAt: number;
  createdAt: number;
}

const USERS_KEY = 'adc_users_v1';
const SESSION_KEY = 'adc_session_v1';
const EMAIL_CODES_KEY = 'adc_email_codes_v1';

function randomId(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, '').trim();
}

export function isValidEmail(email: string) {
  const v = normalizeEmail(email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function isValidCnPhone(phone: string) {
  const v = normalizePhone(phone);
  return /^1[3-9]\d{9}$/.test(v);
}

export async function hashPassword(password: string): Promise<string> {
  const trimmed = password.trim();
  const data = new TextEncoder().encode(trimmed);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function loadUsers(): StoredUser[] {
  return loadFromStorage<StoredUser[]>(USERS_KEY, []);
}

export function saveUsers(users: StoredUser[]) {
  saveToStorage(USERS_KEY, users);
}

export function loadSession(): AuthSession | null {
  return loadFromStorage<AuthSession | null>(SESSION_KEY, null);
}

export function saveSession(session: AuthSession | null) {
  saveToStorage(SESSION_KEY, session);
}

export function getUserById(userId: string): StoredUser | undefined {
  return loadUsers().find((u) => u.id === userId);
}

export function findUserByIdentifier(role: AuthRole, identifier: { email?: string; phone?: string }) {
  const users = loadUsers();
  const email = identifier.email ? normalizeEmail(identifier.email) : undefined;
  const phone = identifier.phone ? normalizePhone(identifier.phone) : undefined;
  return users.find((u) => {
    if (u.role !== role) return false;
    if (email && u.email) return normalizeEmail(u.email) === email;
    if (phone && u.phone) return normalizePhone(u.phone) === phone;
    return false;
  });
}

export function createSession(user: StoredUser): AuthSession {
  const session: AuthSession = {
    token: randomId('token'),
    userId: user.id,
    role: user.role,
    createdAt: Date.now()
  };
  saveSession(session);
  return session;
}

export function clearSession() {
  saveSession(null);
}

export function sendEmailCode(email: string, ttlMs = 5 * 60 * 1000): EmailCodeRecord {
  const normalized = normalizeEmail(email);
  if (!isValidEmail(normalized)) {
    throw new Error('邮箱格式不正确');
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const rec: EmailCodeRecord = {
    email: normalized,
    code,
    createdAt: Date.now(),
    expiresAt: Date.now() + ttlMs
  };
  const all = loadFromStorage<Record<string, EmailCodeRecord>>(EMAIL_CODES_KEY, {});
  all[normalized] = rec;
  saveToStorage(EMAIL_CODES_KEY, all);
  return rec;
}

export function verifyEmailCode(email: string, code: string): void {
  const normalized = normalizeEmail(email);
  const all = loadFromStorage<Record<string, EmailCodeRecord>>(EMAIL_CODES_KEY, {});
  const rec = all[normalized];
  if (!rec) throw new Error('请先获取验证码');
  if (Date.now() > rec.expiresAt) throw new Error('验证码已过期，请重新获取');
  if (rec.code !== code.trim()) throw new Error('验证码不正确');
}

export async function registerUser(params: {
  role: AuthRole;
  method: AuthMethod;
  email?: string;
  phone?: string;
  password: string;
  displayName?: string;
  companyName?: string;
  contactName?: string;
  emailCode?: string;
}): Promise<StoredUser> {
  const users = loadUsers();

  const passwordHash = await hashPassword(params.password);
  const now = Date.now();

  const email = params.email ? normalizeEmail(params.email) : undefined;
  const phone = params.phone ? normalizePhone(params.phone) : undefined;

  if (params.method === 'email') {
    if (!email || !isValidEmail(email)) throw new Error('请输入正确的邮箱');
    if (params.role === 'candidate') {
      if (!params.emailCode) throw new Error('请输入邮箱验证码');
      verifyEmailCode(email, params.emailCode);
    }
  } else {
    if (!phone || !isValidCnPhone(phone)) throw new Error('请输入正确的手机号');
  }

  const existed = findUserByIdentifier(params.role, { email, phone });
  if (existed) throw new Error('该账号已存在，请直接登录');

  const user: StoredUser = {
    id: randomId('u'),
    role: params.role,
    email,
    phone,
    passwordHash,
    createdAt: now,
    displayName: params.displayName?.trim() || undefined,
    companyName: params.companyName?.trim() || undefined,
    contactName: params.contactName?.trim() || undefined
  };

  users.push(user);
  saveUsers(users);
  return user;
}

export async function login(params: {
  role: AuthRole;
  identifier: { email?: string; phone?: string };
  password: string;
}): Promise<StoredUser> {
  const user = findUserByIdentifier(params.role, params.identifier);
  if (!user) throw new Error('账号不存在或角色不匹配');
  const passwordHash = await hashPassword(params.password);
  if (user.passwordHash !== passwordHash) throw new Error('密码不正确');
  return user;
}

