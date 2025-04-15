import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Checkbox, Button } from 'antd';
import { PhoneOutlined, MailOutlined, LockOutlined, WechatOutlined } from '@ant-design/icons';
import logoSvg from '../assets/logo.svg';
import { motion } from 'framer-motion';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(0);

  const sendCode = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => prev <= 1 ? (clearInterval(timer), 0) : prev - 1);
    }, 1000);
  };

  const onFinish = (values) => {
    console.log('登录信息:', values);
    navigate('/home');
  };

  return (
    <div className="auth-page login-page">
      {/* 渐变绿色背景头部 */}
      <div className="auth-header gradient-bg">
        <img src={logoSvg} alt="Logo" className="auth-logo" />
      </div>

      <div className="auth-form-container">
        <div className="auth-form-card">
          {/* 圆角切换按钮 */}
          <div className="auth-tabs">
            <motion.button 
              className="auth-tab active"
              whileTap={{ scale: 0.98 }}
            >
              登录
            </motion.button>
            <motion.button 
              className="auth-tab"
              onClick={() => navigate('/register')}
              whileTap={{ scale: 0.98 }}
            >
              注册
            </motion.button>
          </div>

          <Form form={form} onFinish={onFinish}>
            <Form.Item name="phone" rules={[{ required: true, message: '请输入手机号' }]}>
              <Input
                prefix={<PhoneOutlined className="input-icon" />}
                placeholder="请输入手机号"
                className="auth-input"
              />
            </Form.Item>

            <Form.Item name="code" rules={[{ required: true, message: '请输入短信验证码' }]}>
              <div className="code-input-group">
                <Input
                  prefix={<MailOutlined className="input-icon" />}
                  placeholder="请输入短信验证码"
                  className="auth-input"
                />
                <motion.button 
                  type="button"
                  onClick={sendCode}
                  disabled={countdown > 0}
                  className={`code-btn ${countdown > 0 ? 'disabled' : ''}`}
                  whileTap={{ scale: 0.98 }}
                >
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </motion.button>
              </div>
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password
                prefix={<LockOutlined className="input-icon" />}
                placeholder="请输入密码"
                className="auth-input"
              />
            </Form.Item>

            <div className="form-options">
              <Checkbox>记住密码</Checkbox>
              <Link to="/forgot-password" className="forgot-link">忘记密码?</Link>
            </div>

            <motion.button 
              type="submit" 
              className="submit-btn"
              whileTap={{ scale: 0.98 }}
            >
              登录
            </motion.button>

            <div className="divider">
              <span>其他登录方式</span>
            </div>

            <div className="social-login">
              <div className="wechat-container">
                <WechatOutlined className="wechat-icon" />
              </div>
            </div>

            <div className="agreement">
              登录即代表同意 <a>用户协议</a> 和 <a>隐私政策</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;