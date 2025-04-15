import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Checkbox } from 'antd';
import { PhoneOutlined, LockOutlined, WechatOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import registerBgSvg from '../assets/register-bg.svg';

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(0);

  const sendCode = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => prev <= 1 ? (clearInterval(timer), 0) : prev - 1);
    }, 1000);
  };

  return (
    <div className="auth-page register-page">
      {/* 教室背景图 */}
      <div className="auth-header register-header">
        <img src={registerBgSvg} alt="Background" className="register-bg" />
      </div>

      <div className="auth-form-container">
        <div className="auth-form-card">
          {/* 登录/注册切换标签 */}
          <div className="auth-tabs register-tabs">
            <motion.button 
              className="auth-tab" 
              onClick={() => navigate('/login')}
              whileTap={{ scale: 0.98 }}
            >
              登录
            </motion.button>
            <motion.button className="auth-tab active" whileTap={{ scale: 0.98 }}>
              注册
              <div className="tab-indicator"></div>
            </motion.button>
          </div>

          <Form form={form}>
            <Form.Item name="phone" rules={[{ required: true, message: '请输入手机号' }]}>
              <div className="input-container">
                <PhoneOutlined className="input-icon" />
                <Input
                  placeholder="请输入手机号"
                  className="auth-input"
                />
              </div>
            </Form.Item>

            <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]}>
              <div className="code-input-group">
                <div className="input-container verification-container">
                  <div className="verification-icon"></div>
                  <Input
                    placeholder="请输入验证码"
                    className="auth-input verification-input"
                  />
                </div>
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
              <div className="input-container">
                <LockOutlined className="input-icon" />
                <Input.Password
                  placeholder="请输入密码"
                  className="auth-input"
                />
              </div>
            </Form.Item>

            <div className="agreement-check">
              <Checkbox />
              <span className="agreement-text">同意用户协议和隐私政策</span>
            </div>

            <motion.button 
              type="submit" 
              className="submit-btn"
              whileTap={{ scale: 0.98 }}
            >
              注册
            </motion.button>

            <div className="divider">
              <span>其他登录方式</span>
            </div>

            <div className="social-login">
              <div className="wechat-container">
                <WechatOutlined className="wechat-icon" />
              </div>
            </div>
            
            <div className="forgot-password">
              <Link to="/forgot-password" className="forgot-link">忘记密码?</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;