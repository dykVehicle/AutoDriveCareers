import emailjs from '@emailjs/browser';

// EmailJS配置
// 请在 https://www.emailjs.com/ 注册账号并配置服务
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// 初始化EmailJS
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// 检查EmailJS是否已配置
export function isEmailConfigured(): boolean {
  return Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
}

// 发送验证码邮件
export async function sendVerificationEmail(email: string, code: string): Promise<boolean> {
  if (!isEmailConfigured()) {
    console.warn('EmailJS 未配置，使用模拟模式');
    return false;
  }

  try {
    const templateParams = {
      to_email: email,
      verification_code: code,
      to_name: email.split('@')[0]
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return true;
  } catch (error) {
    console.error('发送验证码邮件失败:', error);
    return false;
  }
}

/**
 * EmailJS配置说明
 * 
 * 1. 注册EmailJS账号
 *    访问 https://www.emailjs.com/ 并注册
 * 
 * 2. 创建邮件服务
 *    - 进入 Email Services 页面
 *    - 选择邮件服务提供商（Gmail, Outlook, 等）
 *    - 按照指引完成授权
 *    - 记录 Service ID
 * 
 * 3. 创建邮件模板
 *    - 进入 Email Templates 页面
 *    - 创建新模板
 *    - 使用以下模板内容：
 *    
 *    主题: AutoDrive Careers - 验证码
 *    
 *    内容:
 *    您好 {{to_name}}，
 *    
 *    感谢您注册 AutoDrive Careers！
 *    
 *    您的验证码是：{{verification_code}}
 *    
 *    验证码将在5分钟内有效，请尽快完成注册。
 *    
 *    如果您没有请求此验证码，请忽略此邮件。
 *    
 *    AutoDrive Careers 团队
 *    
 *    - 记录 Template ID
 * 
 * 4. 获取Public Key
 *    - 进入 Account 页面
 *    - 在 API Keys 部分找到 Public Key
 * 
 * 5. 配置环境变量
 *    在 .env 文件中添加：
 *    
 *    VITE_EMAILJS_SERVICE_ID=your_service_id
 *    VITE_EMAILJS_TEMPLATE_ID=your_template_id
 *    VITE_EMAILJS_PUBLIC_KEY=your_public_key
 * 
 * 6. 免费额度
 *    EmailJS 免费版提供每月200封邮件额度，足够开发和小规模使用
 */
