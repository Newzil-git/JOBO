// 学校对比页面

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Tabs, Progress, Divider, Image } from 'antd';
import { LeftOutlined, InfoCircleOutlined, BookOutlined, TeamOutlined, BankOutlined, DollarOutlined, StarOutlined, PercentageOutlined } from '@ant-design/icons';
 
const SchoolCompare = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('resources');
   
  // 从路由获取选中的学校ID
  const selectedSchoolIds = location.state?.schoolIds || [];
 
  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
 
  // 学校数据
  const schoolsData = {
    1: {
      name: '广州信息技术学院',
      resources: 85,
      employment: 78,
      certification: 68,
      expenses: 75,
      features: 82,
      match: 90,
      trainingRooms: 25,
      images: ['https://via.placeholder.com/150']
    },
    2: {
      name: '深圳职业技术学院',
      resources: 78,
      employment: 72,
      certification: 72,
      expenses: 68,
      features: 75,
      match: 85,
      trainingRooms: 32,
      images: ['https://via.placeholder.com/150']
    },
    3: {
      name: '东莞职业技术学院',
      resources: 92,
      employment: 65,
      certification: 65,
      expenses: 70,
      features: 80,
      match: 88,
      trainingRooms: 28,
      images: ['https://via.placeholder.com/150']
    }
  };
 
  // 获取选中的学校数据
  const selectedSchools = selectedSchoolIds.map(id => ({
    id,
    ...schoolsData[id]
  }));
 
  // 返回上一页
  const goBack = () => {
    navigate(-1);
  };
 
  // 查看学校详情
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
 
  // 渲染对比类别
  const renderCompareCategory = (category, icon, label) => {
    return (
      <div 
        className={`flex items-center p-3 ${activeCategory === category ? 'bg-gray-100 border-l-4 border-green-500' : ''}`}
        onClick={() => setActiveCategory(category)}
      >
        <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full mr-3">
          {icon}
        </div>
        <span>{label}</span>
      </div>
    );
  };
 
  // 渲染进度条对比
  const renderProgressCompare = (title, schools) => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        {schools.map(school => (
          <div key={school.id} className="mb-3">
            <div className="flex justify-between mb-1">
              <span>{school.name}</span>
              <span className="text-green-600">{school[activeCategory]}%</span>
            </div>
            <Progress 
              percent={school[activeCategory]} 
              showInfo={false} 
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            />
          </div>
        ))}
      </div>
    );
  };
 
  // 渲染双师型教师比例
  const renderTeacherRatio = () => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">双师型教师占比</h3>
        {selectedSchools.map(school => (
          <div key={school.id} className="mb-3">
            <div className="flex justify-between mb-1">
              <span>{school.name}</span>
              <span className="text-green-600">{Math.floor(60 + Math.random() * 20)}%</span>
            </div>
            <Progress 
              percent={Math.floor(60 + Math.random() * 20)} 
              showInfo={false} 
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            />
          </div>
        ))}
      </div>
    );
  };
 
  // 渲染实训设施与基地
  const renderTrainingFacilities = () => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">实训设施与基地</h3>
        <div className="grid grid-cols-3 gap-3">
          {selectedSchools.map(school => (
            <div key={school.id} className="text-center">
              <Image 
                src={school.images[0]} 
                alt={school.name}
                className="rounded-lg mb-2"
              />
              <div className="text-sm">{school.name}</div>
              <div className="text-green-600 text-sm">{school.trainingRooms} 个实训室</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
 
  // 渲染对比内容
  const renderCompareContent = () => {
    switch (activeCategory) {
      case 'resources':
        return (
          <div>
            {renderProgressCompare('师生对比', selectedSchools)}
            {renderTeacherRatio()}
            {renderTrainingFacilities()}
          </div>
        );
      case 'employment':
        return renderProgressCompare('就业触达', selectedSchools);
      case 'certification':
        return renderProgressCompare('开学与认证', selectedSchools);
      case 'expenses':
        return renderProgressCompare('费用与生活', selectedSchools);
      case 'features':
        return renderProgressCompare('特色优势', selectedSchools);
      case 'match':
        return renderProgressCompare('匹配程度', selectedSchools);
      default:
        return null;
    }
  };
 
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-primary text-lg">正在加载对比数据...</div>
          <Progress percent={75} status="active" strokeColor="#4CAF50" />
        </div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white p-4 shadow-sm flex items-center">
        <Button 
          type="text" 
          icon={<LeftOutlined />} 
          onClick={goBack} 
          className="mr-2"
        />
        <h1 className="text-lg font-bold">返回推荐</h1>
      </div>
 
      {/* 内容区域 */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* 左侧分类菜单 */}
        <div className="w-1/4 bg-white border-r">
          {renderCompareCategory('resources', <BookOutlined />, '教学资源')}
          {renderCompareCategory('employment', <TeamOutlined />, '就业触达')}
          {renderCompareCategory('certification', <BankOutlined />, '开学与认证')}
          {renderCompareCategory('expenses', <DollarOutlined />, '费用与生活')}
          {renderCompareCategory('features', <StarOutlined />, '特色优势')}
          {renderCompareCategory('match', <PercentageOutlined />, '匹配程度')}
        </div>
         
        {/* 右侧对比内容 */}
        <div className="w-3/4 p-4 overflow-y-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              {renderCompareContent()}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
 
export default SchoolCompare;