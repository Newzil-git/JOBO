import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, message, Input } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { GraduationCap, BookOpen, Briefcase, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import logoSvg from '../assets/logo.svg';

const IdentitySelection = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [verificationSent, setVerificationSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [selectedIdentity, setSelectedIdentity] = useState(null);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && verificationSent) {
      setVerificationSent(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, verificationSent]);

  const sendVerificationCode = () => {
    const phoneNumber = form.getFieldValue('parentPhone');
    if (!phoneNumber || !/^1[3-9]\d{9}$/.test(phoneNumber)) {
      message.error('请输入有效的手机号码');
      return;
    }
    message.success('验证码已发送');
    setVerificationSent(true);
    setCountdown(60);
  };

  const handleSubmit = (values) => {
    console.log('表单提交:', values);
    message.success('身份绑定成功');
    navigate('/login');
  };

  const selectIdentity = (identity) => {
    setSelectedIdentity(identity);
    setTimeout(() => {
      document.getElementById('parent-binding')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 顶部绿色背景区域 */}
      <div className="green-header">
        <img src={logoSvg} alt="Logo" className="logo" />
        <h1>选择你的身份</h1>
        <p>为你提供更精准的服务</p>
      </div>

      {/* 内容区域 */}
      <div className="content-container">
        {/* 身份选择卡片组 */}
        <div className="identity-cards">
          <motion.div 
            className={`identity-card ${selectedIdentity === 'junior' ? 'selected' : ''}`}
            onClick={() => selectIdentity('junior')}
            whileTap={{ scale: 0.98 }}
          >
            <div className="card-icon">
              <GraduationCap className="icon" />
            </div>
            <div className="card-content">
              <h3>初三学生</h3>
              <p>精准推荐院校、专业</p>
            </div>
            <ChevronRight className="arrow" />
          </motion.div>
          
          <motion.div 
            className={`identity-card ${selectedIdentity === 'student' ? 'selected' : ''}`}
            onClick={() => selectIdentity('student')}
            whileTap={{ scale: 0.98 }}
          >
            <div className="card-icon">
              <BookOpen className="icon" />
            </div>
            <div className="card-content">
              <h3>在校学生</h3>
              <p>同步我的课程</p>
            </div>
            <ChevronRight className="arrow" />
          </motion.div>
          
          <motion.div 
            className={`identity-card ${selectedIdentity === 'graduate' ? 'selected' : ''}`}
            onClick={() => selectIdentity('graduate')}
            whileTap={{ scale: 0.98 }}
          >
            <div className="card-icon">
              <Briefcase className="icon" />
            </div>
            <div className="card-content">
              <h3>毕业生</h3>
              <p>开启职业测评</p>
            </div>
            <ChevronRight className="arrow" />
          </motion.div>
        </div>

        {/* 家长绑定认证 */}
        <div id="parent-binding" className="parent-binding">
          <h2>家长绑定认证</h2>
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item name="parentPhone">
              <Input
                placeholder="请输入家长手机号"
                className="input-field"
              />
            </Form.Item>
            
            <Form.Item name="verificationCode">
              <div className="verification-container">
                <Input
                  placeholder="请输入验证码"
                  className="input-field verification-input"
                />
                <motion.button
                  type="button"
                  onClick={sendVerificationCode}
                  disabled={verificationSent}
                  className={`verification-btn ${verificationSent ? 'disabled' : ''}`}
                  whileTap={{ scale: 0.98 }}
                >
                  {verificationSent ? `${countdown}s` : '获取验证码'}
                </motion.button>
              </div>
            </Form.Item>

            <div className="warning-message">
              <WarningOutlined />
              <span>未绑定将无法提交决策</span>
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              whileTap={{ scale: 0.98 }}
            >
              确认绑定
            </motion.button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default IdentitySelection;