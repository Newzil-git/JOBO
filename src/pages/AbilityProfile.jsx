// 能力分析页面：评估学生能力（如学生倾向、技能等）

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Progress, Tag, Divider } from 'antd';
import { ArrowRightOutlined, LeftOutlined, UserOutlined } from '@ant-design/icons';
import RadarChart from '../components/RadarChart';

const AbilityProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // 能力数据
  const abilityData = [
    { label: '语言能力', value: 85 },
    { label: '逻辑思维', value: 70 },
    { label: '空间感知', value: 60 },
    { label: '创造力', value: 75 },
    { label: '人际交往', value: 90 },
    { label: '自我管理', value: 65 },
  ];

  // 兴趣标签
  const interestTags = [
    '心理学', '编程', '阅读', '旅行', '产品设计', '用户体验', '市场营销'
  ];

  // 学习风格数据
  const learningStyles = [
    { label: '视觉学习', value: 80 },
    { label: '听觉学习', value: 60 },
    { label: '动手实践', value: 75 },
    { label: '社交学习', value: 85 },
    { label: '独立学习', value: 65 },
  ];

  // 职业倾向
  const careerTendencies = [
    { career: '产品经理', match: 92 },
    { career: '用户体验设计师', match: 85 },
    { career: '市场营销专员', match: 78 },
    { career: '人力资源管理', match: 75 },
    { career: '软件开发工程师', match: 65 },
  ];

  // 前往院校推荐页面
  const goToRecommendation = () => {
    navigate('/school-recommendation');
  };

  // 返回上一页
  const goBack = () => {
    navigate(-1);
  };

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-primary text-lg">正在生成你的能力画像...</div>
          <div className="w-64 mx-auto">
            <Progress percent={75} status="active" strokeColor="#4CAF50" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-gradient-primary text-white p-4 relative rounded-b-2xl shadow-md">
        <Button 
          type="text" 
          icon={<LeftOutlined />} 
          onClick={goBack} 
          className="absolute left-2 top-2 text-white"
        />
        <div className="absolute right-4 top-4">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <UserOutlined className="text-white" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-center pt-2">能力画像</h1>
        <p className="text-center text-sm opacity-80 pb-2">基于你的测评结果生成</p>
      </div>

      {/* 内容区域 */}
      <div className="container mx-auto px-4 py-6 -mt-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* 能力雷达图 */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-5 shadow-card">
            <h2 className="text-lg font-bold mb-4">基础能力分析</h2>
            <div className="radar-chart">
              <RadarChart data={abilityData} />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              你的人际交往能力最为突出，语言能力和创造力也较强，可以考虑需要这些能力的专业方向。
            </p>
          </motion.div>

          {/* 兴趣标签 */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-5 shadow-card">
            <h2 className="text-lg font-bold mb-4">兴趣标签</h2>
            <div>
              {interestTags.map((tag, index) => (
                <Tag key={index} className="mb-2 mr-2 px-3 py-1 rounded-full bg-primary-50 text-primary border-0">
                  {tag}
                </Tag>
              ))}
            </div>
          </motion.div>

          {/* 学习风格 */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-5 shadow-card">
            <h2 className="text-lg font-bold mb-4">学习风格</h2>
            <div className="space-y-4">
              {learningStyles.map((style, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">理论型</span>
                    <span className="text-gray-600">实践型</span>
                  </div>
                  <Progress percent={style.value} strokeColor={{from: '#4CAF50', to: '#2196F3'}} showInfo={false} />
                  <div className="flex justify-between mt-4 mb-1">
                    <span className="text-gray-600">独立学习</span>
                    <span className="text-gray-600">团队学习</span>
                  </div>
                  <Progress percent={40} strokeColor={{from: '#4CAF50', to: '#2196F3'}} showInfo={false} />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              你更倾向于社交学习和视觉学习，在团队环境中学习效果更好，建议选择有更多小组活动和视觉教学的专业。
            </p>
          </motion.div>

          {/* 职业倾向 */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-5 shadow-card">
            <h2 className="text-lg font-bold mb-4">职业倾向</h2>
            <div className="space-y-4">
              {careerTendencies.map((career, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">{career.career}</span>
                    <span className={`font-bold ${career.match >= 80 ? 'text-primary' : career.match >= 70 ? 'text-secondary' : 'text-gray-500'}`}>
                      {career.match}%
                    </span>
                  </div>
                  <Progress 
                    percent={career.match} 
                    strokeColor={{from: '#4CAF50', to: '#2196F3'}} 
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* 综合分析 */}
          <motion.div variants={itemVariants} className="card">
            <h2 className="text-lg font-bold mb-4">综合分析</h2>
            <p className="text-gray-700 mb-3">
              根据你的能力分布、兴趣偏好和学习风格，你最适合在<span className="text-primary font-medium">产品设计</span>和<span className="text-primary font-medium">用户体验</span>相关领域发展。
            </p>
            <p className="text-gray-700 mb-3">
              你的人际交往能力突出，善于团队协作，同时具备较强的语言表达和创造力，这些都是产品经理岗位的核心要求。
            </p>
            <p className="text-gray-700">
              建议选择<span className="text-primary font-medium">数字媒体技术</span>、<span className="text-primary font-medium">市场营销</span>或<span className="text-primary font-medium">电子商务</span>相关专业，这些专业将充分发挥你的优势，并弥补技术方面的不足。
            </p>
          </motion.div>

          {/* 下一步按钮 */}
          <motion.div 
            variants={itemVariants}
            className="pt-4 pb-8"
          >
            <Button 
              type="primary" 
              size="large" 
              block 
              onClick={goToRecommendation}
              className="bg-gradient-primary hover:shadow-lg transition-shadow rounded-lg h-12"
              icon={<ArrowRightOutlined />}
            >
              查看院校推荐
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AbilityProfile;