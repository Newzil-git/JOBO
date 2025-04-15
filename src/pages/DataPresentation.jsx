// 数据展示页面

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Progress, Tag, Button, Divider } from 'antd';
import { RightOutlined, FireOutlined, WarningOutlined, CalendarOutlined, FileTextOutlined, BarChartOutlined } from '@ant-design/icons';

const DataPresentation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 学生数据
  const studentData = {
    name: '张同学',
    overallScore: 82,
    percentile: 82,
    improvement: 20,
    recommendedSchools: [
      {
        id: 1,
        name: '广州市机电技师学院',
        recommendationIndex: 4,
        competitionIndex: '较高',
        isHot: true
      },
      {
        id: 2,
        name: '深圳技师学院',
        recommendationIndex: 5,
        competitionIndex: '激烈',
        isHot: true
      }
    ]
  };

  // 前往开放日预约页面
  const goToOpenDayBooking = () => {
    navigate('/open-day-booking');
  };

  // 前往备选方案页面
  const goToAlternativePlans = () => {
    navigate('/alternative-plans');
  };

  // 前往成绩分析页面
  const goToScoreAnalysis = () => {
    navigate('/score-analysis');
  };

  // 查看所有推荐院校
  const viewAllSchools = () => {
    navigate('/school-recommendation');
  };

  // 查看院校详情
  const viewSchoolDetail = (schoolId) => {
    navigate(`/school-detail/${schoolId}`);
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

  // 渲染推荐院校卡片
  const renderSchoolCard = (school) => {
    return (
      <div 
        key={school.id} 
        className="border-b pb-4 last:border-b-0 last:pb-0"
        onClick={() => viewSchoolDetail(school.id)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium">{school.name}</h3>
          {school.isHot && (
            <Tag color="red" className="flex items-center">
              <FireOutlined className="mr-1" /> 热门
            </Tag>
          )}
        </div>
        <div className="flex justify-between items-center mt-2">
          <div>
            <div className="text-sm">推荐指数: 
              <span className="text-yellow-500">
                {'★'.repeat(school.recommendationIndex) + '☆'.repeat(5 - school.recommendationIndex)}
              </span>
            </div>
            <div className="text-sm flex items-center">
              <span>竞争指数: </span>
              <Tag 
                color={school.competitionIndex === '激烈' ? 'warning' : 'orange'}
                className="ml-1 flex items-center"
              >
                <WarningOutlined className="mr-1" /> {school.competitionIndex}
              </Tag>
            </div>
          </div>
          <RightOutlined className="text-gray-400" />
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-primary text-lg">正在加载数据...</div>
          <Progress percent={75} status="active" strokeColor="#4CAF50" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">学生端</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-white overflow-hidden">
          <img 
            src="https://via.placeholder.com/40" 
            alt="用户头像" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 内容区域 */}
      <div className="container mx-auto px-4 py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* 综合能力评估 */}
          <motion.div variants={itemVariants} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">综合能力评估</h2>
              <Button type="link" className="text-green-500 p-0">详情 &gt;</Button>
            </div>
            
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-40 h-40">
                <Progress 
                  type="circle" 
                  percent={studentData.overallScore} 
                  strokeColor="#4CAF50"
                  strokeWidth={6}
                  width={160}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{studentData.overallScore}%</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-1">你太棒了！</h3>
              <p className="text-gray-600 mb-2">
                动手能力击败了 {studentData.percentile}% 同龄人
              </p>
              <p className="text-gray-600">
                理论成绩位于年级前 {studentData.improvement}%
              </p>
            </div>
          </motion.div>

          {/* 功能按钮 */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
            <div 
              className="bg-white rounded-lg shadow p-3 flex flex-col items-center justify-center"
              onClick={goToOpenDayBooking}
            >
              <div className="w-10 h-10 flex items-center justify-center mb-2">
                <CalendarOutlined style={{ fontSize: '24px', color: '#4CAF50' }} />
              </div>
              <span className="text-sm text-center">开放日预约</span>
            </div>
            
            <div 
              className="bg-white rounded-lg shadow p-3 flex flex-col items-center justify-center"
              onClick={goToAlternativePlans}
            >
              <div className="w-10 h-10 flex items-center justify-center mb-2">
                <FileTextOutlined style={{ fontSize: '24px', color: '#2196F3' }} />
              </div>
              <span className="text-sm text-center">备选方案</span>
            </div>
            
            <div 
              className="bg-white rounded-lg shadow p-3 flex flex-col items-center justify-center"
              onClick={goToScoreAnalysis}
            >
              <div className="w-10 h-10 flex items-center justify-center mb-2">
                <BarChartOutlined style={{ fontSize: '24px', color: '#FF5722' }} />
              </div>
              <span className="text-sm text-center">成绩分析</span>
            </div>
          </motion.div>

          {/* 推荐院校 */}
          <motion.div variants={itemVariants} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">推荐院校</h2>
              <Button 
                type="link" 
                className="text-green-500 p-0"
                onClick={viewAllSchools}
              >
                查看全部 &gt;
              </Button>
            </div>
            
            <div className="space-y-4">
              {studentData.recommendedSchools.map(school => renderSchoolCard(school))}
            </div>
          </motion.div>

          {/* 数据来源 */}
          <motion.div variants={itemVariants} className="text-center text-xs text-gray-500 mt-4">
            数据来源: 教育部 2023 年职教白皮书
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DataPresentation;