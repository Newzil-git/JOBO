import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { PhoneOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const ForgotPassword = () => {
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
    <div className="auth-page forgot-page">
      {/* 渐变头部 */}
      <div className="auth-header gradient-bg">
        <div className="logo">logo</div>
      </div>

      {/* 表单区域 */}
      <div className="auth-form-container">
        <div className="auth-form-card">
          <h2 className="form-title">忘记密码</h2>

          <Form form={form}>
            <Form.Item name="phone">
              <Input
                prefix={<PhoneOutlined className="input-icon" />}
                placeholder="请输入手机号"
                className="auth-input"
              />
            </Form.Item>

            <Form.Item name="code">
              <div className="code-input-group">
                <Input
                  prefix={<MailOutlined className="input-icon" />}
                  placeholder="请输入验证码"
                  className="auth-input"
                />
                <Button 
                  onClick={sendCode} 
                  disabled={countdown > 0}
                  className="code-btn"
                >
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </Button>
              </div>
            </Form.Item>

            <Form.Item name="newPassword">
              <Input.Password
                prefix={<LockOutlined className="input-icon" />}
                placeholder="请输入新密码"
                className="auth-input"
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="submit-btn">
              提交
            </Button>

            <Button className="back-btn" onClick={() => navigate('/login')}>
              返回登录
            </Button>

            <div className="agreement">
              登录即代表同意 <a>用户协议</a> 和 <a>隐私政策</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
