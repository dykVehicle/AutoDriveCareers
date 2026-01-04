# 后端API文档

本文档说明了前端应用所需的后端API接口规范。如果您想使用服务器端持久化用户数据，需要实现以下API接口。

## 配置方法

1. 复制 `.env.example` 为 `.env`
2. 设置 `VITE_API_BASE_URL` 为您的后端API地址
3. 如果不配置此环境变量，应用将使用浏览器的 localStorage 存储数据

## API接口规范

### 基础配置

- **Base URL**: 由环境变量 `VITE_API_BASE_URL` 配置
- **认证方式**: Bearer Token (通过 `Authorization: Bearer <token>` 请求头传递)
- **响应格式**: JSON

所有API响应应遵循以下格式：

```json
{
  "success": true,
  "data": { ... },
  "message": "操作成功"
}
```

或错误响应：

```json
{
  "success": false,
  "error": "错误信息"
}
```

---

## 认证相关接口

### 1. 用户注册

**接口**: `POST /auth/register`

**请求体**:
```json
{
  "role": "candidate" | "company",
  "email": "user@example.com",
  "phone": "13800000000",
  "password": "password123",
  "displayName": "张三",
  "companyName": "科技公司",
  "contactName": "李四",
  "emailCode": "123456"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "u_xxx",
      "role": "candidate",
      "email": "user@example.com",
      "phone": "13800000000",
      "passwordHash": "...",
      "createdAt": 1704355200000,
      "displayName": "张三"
    },
    "token": "jwt_token_here"
  }
}
```

### 2. 用户登录

**接口**: `POST /auth/login`

**请求体**:
```json
{
  "role": "candidate" | "company",
  "email": "user@example.com",
  "phone": "13800000000",
  "password": "password123"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "u_xxx",
      "role": "candidate",
      "email": "user@example.com",
      "displayName": "张三",
      ...
    },
    "token": "jwt_token_here"
  }
}
```

### 3. 发送邮箱验证码

**接口**: `POST /auth/send-code`

**请求体**:
```json
{
  "email": "user@example.com"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "code": "123456"
  },
  "message": "验证码已发送到邮箱"
}
```

注意：实际应用中，验证码应通过邮件发送给用户，而不是在响应中返回。返回验证码仅用于开发测试。

### 4. 获取当前用户信息

**接口**: `GET /auth/me`

**请求头**: 
```
Authorization: Bearer <token>
```

**响应**:
```json
{
  "success": true,
  "data": {
    "id": "u_xxx",
    "role": "candidate",
    "email": "user@example.com",
    "displayName": "张三",
    ...
  }
}
```

### 5. 登出

**接口**: `POST /auth/logout`

**请求头**: 
```
Authorization: Bearer <token>
```

**响应**:
```json
{
  "success": true,
  "message": "登出成功"
}
```

---

## 数据模型

### StoredUser

```typescript
interface StoredUser {
  id: string;                    // 用户唯一标识
  role: 'candidate' | 'company'; // 用户角色
  email?: string;                // 邮箱
  phone?: string;                // 手机号
  passwordHash: string;          // 密码哈希
  createdAt: number;             // 创建时间戳
  
  // 候选人特有字段
  displayName?: string;          // 显示名称
  
  // 企业特有字段
  companyName?: string;          // 公司名称
  contactName?: string;          // 联系人姓名
}
```

---

## 实现建议

### 技术栈建议

- **Node.js**: Express.js / Fastify / NestJS
- **数据库**: PostgreSQL / MySQL / MongoDB
- **认证**: JWT (jsonwebtoken)
- **密码加密**: bcrypt
- **邮件服务**: nodemailer / SendGrid / 阿里云邮件服务

### 安全要求

1. **密码存储**: 使用 bcrypt 或 argon2 加密存储密码
2. **JWT Token**: 设置合理的过期时间（如24小时）
3. **验证码**: 验证码应设置5分钟有效期，使用后立即失效
4. **HTTPS**: 生产环境必须使用 HTTPS
5. **CORS**: 配置正确的 CORS 策略
6. **速率限制**: 对登录、注册、发送验证码等接口实施速率限制

### 示例后端实现（Node.js + Express）

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const users = []; // 实际应用应使用数据库

// 注册接口
app.post('/api/auth/register', async (req, res) => {
  try {
    const { role, email, phone, password, displayName, companyName, contactName } = req.body;
    
    // 检查用户是否已存在
    const existingUser = users.find(u => 
      u.role === role && (u.email === email || u.phone === phone)
    );
    if (existingUser) {
      return res.status(400).json({ success: false, error: '该账号已存在' });
    }
    
    // 加密密码
    const passwordHash = await bcrypt.hash(password, 10);
    
    // 创建用户
    const user = {
      id: `u_${Date.now()}_${Math.random().toString(16).slice(2)}`,
      role,
      email,
      phone,
      passwordHash,
      createdAt: Date.now(),
      displayName,
      companyName,
      contactName
    };
    
    users.push(user);
    
    // 生成token
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    
    // 返回用户信息（不包含密码）
    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json({ success: true, data: { user: userWithoutPassword, token } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 登录接口
app.post('/api/auth/login', async (req, res) => {
  try {
    const { role, email, phone, password } = req.body;
    
    const user = users.find(u => 
      u.role === role && (u.email === email || u.phone === phone)
    );
    
    if (!user) {
      return res.status(401).json({ success: false, error: '账号不存在或角色不匹配' });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: '密码不正确' });
    }
    
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    
    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json({ success: true, data: { user: userWithoutPassword, token } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log('API server running on http://localhost:3000');
});
```

---

## 测试

使用 curl 或 Postman 测试API接口：

```bash
# 注册
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "role": "candidate",
    "email": "test@example.com",
    "password": "password123",
    "displayName": "测试用户"
  }'

# 登录
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "role": "candidate",
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 迁移现有数据

如果您已经有用户在使用 localStorage，可以提供一个迁移工具将数据导入到服务器：

1. 从 localStorage 导出用户数据
2. 调用批量导入API（需要额外实现）
3. 清除 localStorage 并引导用户重新登录

---

## 常见问题

**Q: 如果不配置后端API会怎样？**  
A: 应用会继续使用浏览器的 localStorage 存储数据，功能完全正常，但数据仅存储在用户本地浏览器中。

**Q: 可以逐步迁移吗？**  
A: 可以。配置 API 后，新注册的用户会自动使用服务器存储，老用户可以继续使用本地数据或重新注册。

**Q: 安全性如何保证？**  
A: 建议使用 HTTPS、JWT认证、密码加密等标准安全措施。详见"安全要求"部分。
