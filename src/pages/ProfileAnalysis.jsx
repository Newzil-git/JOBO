// 档案分析页面

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Tag, Progress, Divider, message, Tabs } from 'antd';
import { LeftOutlined, ShareAltOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
import RadarChart from '../components/RadarChart';

const ProfileAnalysis = () => {
  // 初始化导航
  const navigate = useNavigate();
  // 初始化加载状态
  const [isLoading, setIsLoading] = useState(true);
  
  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // 定义能力数据
  const abilityData = [
    { label: '逻辑思维', value: 85 },
    { label: '空间感知', value: 60 },
    { label: '动手操作', value: 75 },
    { label: '艺术感知', value: 55 },
    { label: '语言表达', value: 70 },
    { label: '社交协作', value: 80 },
  ];

  // 定义兴趣标签
  const interestTags = [
    '机械组装', '界面设计', '户外活动', '电子制作', '编程开发'
  ];

  // 定义学习风格数据
  const learningStyles = [
    { name: '理论型', value: 65, opposite: '实践型' },
    { name: '独立学习', value: 40, opposite: '团队学习' },
  ];

  // 定义院校专业推荐数据
  const recommendations = [
    {
      school: '深圳职业技术学院',
      match: 95,
      majors: ['机械设计制造及自动化', '电子信息工程']
    },
    {
      school: '广州市工程技术职业学院',
      match: 92,
      majors: ['工业设计', '数控技术']
    },
  ];

  // 分享个人画像
  const shareProfile = () => {
    message.success('分享链接已复制到剪贴板');
  };

  // 返回上一页
  const goBack = () => {
    navigate(-1);
  };

  // 前往院校推荐页面
  const goToSchoolRecommendation = () => {
    navigate('/school-recommendation');
  };

  // 定义动画变体
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
          <div className="mb-4 text-primary text-lg">正在生成个人画像分析...</div>
          <div className="w-64 mx-auto">
            <Progress percent={75} status="active" strokeColor="#4CAF50" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部标签页 - 我的分析 */}
      <div className="bg-white">
        <Tabs 
          activeKey="1"
          onChange={(key) => {
            if (key === '2') navigate('/school-recommendation');
            else if (key === '3') navigate('/major-recommendation');
          }}
          centered
          className="custom-tabs"
        >
          <TabPane tab="我的分析" key="1" />
          <TabPane tab="院校推荐" key="2" />
          <TabPane tab="专业推荐" key="3" />
        </Tabs>
      </div>
      
      {/* 个人分析标题 */}
      <div className="bg-white px-4 py-2 mb-4 shadow-sm">
        <h2 className="text-xl font-bold text-center">个人能力画像分析</h2>
        <p className="text-center text-gray-500 text-sm">基于您的测评结果生成的个性化分析</p>
      </div>

      {/* 内容区域 */}
      <div className="container mx-auto px-4 py-6 -mt-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* 兴趣标签 */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-5 shadow-card">
            <h2 className="text-lg font-bold mb-4">兴趣标签</h2>
            <div>
              {interestTags.map((tag, index) => (
                <Tag 
                  key={index} 
                  className="mb-2 mr-2 px-3 py-1 rounded-full bg-primary-50 text-primary border-0"
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </motion.div>

          {/* 能力雷达图 */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-5 shadow-card">
            <h2 className="text-lg font-bold mb-4">基础能力分析</h2>
            <div className="radar-chart">
              <RadarChart data={abilityData} />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              你的社交协作和逻辑思维能力较强，动手操作能力也不错，适合需要团队合作的技术类专业。
            </p>
          </motion.div>

          {/* 学习风格 */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-5 shadow-card">
            <h2 className="text-lg font-bold mb-4">学习风格</h2>
            <div className="space-y-4">
              {learningStyles.map((style, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">{style.name}</span>
                    <span className="text-gray-600">{style.opposite}</span>
                  </div>
                  <Progress 
                    percent={style.value} 
                    strokeColor={{from: '#4CAF50', to: '#2196F3'}} 
                    showInfo={false} 
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* 院校专业推荐 */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-5 shadow-card">
            <h2 className="text-lg font-bold mb-4">院校专业推荐</h2>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{rec.school}</span>
                    <span className="text-primary font-bold">{rec.match}% 匹配</span>
                  </div>
                  <Progress 
                    percent={rec.match} 
                    strokeColor={{from: '#4CAF50', to: '#2196F3'}} 
                    showInfo={false}
                    className="mb-2"
                  />
                  <div className="text-sm text-gray-600">
                    推荐专业：
                    {rec.majors.map((major, idx) => (
                      <span key={idx} className="mr-2">{major}{idx < rec.majors.length - 1 ? '、' : ''}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="pt-4 pb-8"
          >
            <Button 
              type="primary" 
              size="large" 
              block
              onClick={goToSchoolRecommendation}
              className="bg-gradient-primary hover:shadow-lg transition-shadow rounded-lg h-12"
            >
              查看详细院校推荐
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileAnalysis;