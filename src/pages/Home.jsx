// 能力分析结果选择页面

// 能力分析结果选择页面

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card } from 'antd';
import { UserOutlined, FileTextOutlined, LeftOutlined } from '@ant-design/icons';

const Home = () => {
  const navigate = useNavigate();

  // 前往能力画像页面
  const goToAbilityProfile = () => {
    navigate('/ability-profile');
  };

  // 前往档案分析页面
  const goToProfileAnalysis = () => {
    navigate('/profile-analysis');
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="gradient-header relative">
        <Button 
          type="text" 
          icon={<LeftOutlined />} 
          onClick={goBack} 
          className="absolute left-2 top-2 text-white"
        />
        <h1 className="text-xl font-bold text-center pt-4">能力分析结果</h1>
        <p className="text-center text-sm opacity-80 pb-4">请选择您想查看的分析结果</p>
      </div>

      {/* 内容区域 */}
      <div className="container mx-auto px-4 py-6 -mt-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="text-center mb-6">
            <p className="text-lg">AI已完成对您的能力分析，您可以查看以下结果：</p>
          </motion.div>

          {/* 选择卡片 */}
          <motion.div variants={itemVariants}>
            <Card 
              className="mb-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={goToAbilityProfile}
            >
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <UserOutlined className="text-2xl text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">能力画像</h3>
                  <p className="text-gray-500">查看您的能力分布、兴趣偏好和职业倾向</p>
                </div>
              </div>
            </Card>

            <Card 
              className="shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={goToProfileAnalysis}
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FileTextOutlined className="text-2xl text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">档案分析</h3>
                  <p className="text-gray-500">查看您的学习风格、能力评估和院校专业推荐</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;