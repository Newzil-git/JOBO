import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import IdentitySelection from './pages/IdentitySelection';
import Home from './pages/Home';
import AIChat from './pages/AIChat';
import AIConsultation from './pages/AIConsultation';
import AbilityProfile from './pages/AbilityProfile';
import ProfileAnalysis from './pages/ProfileAnalysis';
import SchoolRecommendationNew from './pages/SchoolRecommendationNew';
import MajorRecommendation from './pages/MajorRecommendation';
import SchoolCompare from './pages/SchoolCompare';
import DataPresentation from './pages/DataPresentation';
import StudentProfile from './pages/StudentProfile';

// 导入CSS文件
import './auth.css';
import './globals.css';
import './index.css';
import './mobile.css';

const theme = {
  token: {
    colorPrimary: '#4CAF50',
    colorInfo: '#2196F3',
    borderRadius: 6,
    fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Router>
        <Routes>
          {/* 默认路由重定向到身份选择页面 */}
          <Route path="/" element={<Navigate to="/identity-selection" replace />} />
          
          {/* 用户流程路由 */}
          <Route path="/identity-selection" element={<IdentitySelection />} />
          <Route path="/login" element={<Navigate to="/ai-chat" replace />} /> {/* 登录后直接进入个人访谈页面 */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ai-chat" element={<AIChat />} /> {/* 个人访谈页面 */}
          <Route path="/ai-consultation" element={<AIConsultation />} />
          <Route path="/home" element={<Home />} /> {/* 能力分析结果选择页面 */}
          <Route path="/ability-profile" element={<AbilityProfile />} /> {/* 个人画像分析界面 */}
          <Route path="/profile-analysis" element={<ProfileAnalysis />} /> {/* 我的分析页面 - 显示分期个人信息 */}
          <Route path="/school-recommendation" element={<SchoolRecommendationNew />} />
          <Route path="/major-recommendation" element={<MajorRecommendation />} />
          <Route path="/school-compare" element={<SchoolCompare />} />
          <Route path="/data-presentation" element={<DataPresentation />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          
          {/* 未匹配路由重定向到身份选择页面 */}
          <Route path="*" element={<Navigate to="/identity-selection" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;