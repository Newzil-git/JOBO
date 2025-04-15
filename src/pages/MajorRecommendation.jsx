// 专业推荐

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Tabs, Select, Tag, Divider, message } from 'antd';
import { LeftOutlined, FilterOutlined, FireOutlined, WarningOutlined } from '@ant-design/icons';
 
const { TabPane } = Tabs;
const { Option } = Select;
 
const MajorRecommendation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMajors, setSelectedMajors] = useState([]);
  const [activeTab, setActiveTab] = useState('3');
   
  // 筛选条件
  const [filters, setFilters] = useState({
    major: '',
    school: '',
    sortBy: ''
  });
 
  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
 
  // 推荐专业数据
  const recommendedMajors = [
    {
      id: 1,
      name: '浙江工业职业技术学院 数控技术',
      tags: ['省重点', '就业率98%'],
      acceptanceRate: 85,
      schoolCode: '14325',
      enrollmentCount: 120,
      minScore: 385,
      minRank: 12580,
      majorCode: '082500'
    },
    {
      id: 2,
      name: '金华职业技术学院 机械制造与自动化',
      tags: ['国家示范', '就业率96%'],
      acceptanceRate: 82,
      schoolCode: '14269',
      enrollmentCount: 150,
      minScore: 375,
      minRank: 13650,
      majorCode: '082502'
    },
    {
      id: 3,
      name: '温州职业技术学院 智能制造技术',
      tags: ['省示范', '就业率95%'],
      acceptanceRate: 88,
      schoolCode: '14289',
      enrollmentCount: 140,
      minScore: 368,
      minRank: 14280,
      majorCode: '082503'
    }
  ];
 
  // 处理筛选条件变化
  const handleFilterChange = (value, type) => {
    setFilters({
      ...filters,
      [type]: value
    });
  };
 
  // 添加专业到对比
  const addToCompare = (majorId) => {
    if (selectedMajors.includes(majorId)) {
      setSelectedMajors(selectedMajors.filter(id => id !== majorId));
      message.success('已从对比中移除');
    } else {
      if (selectedMajors.length >= 3) {
        message.warning('最多只能对比3个专业');
        return;
      }
      setSelectedMajors([...selectedMajors, majorId]);
      message.success('已添加到对比');
    }
  };
 
  // 进入对比页面
  const goToCompare = () => {
    if (selectedMajors.length < 2) {
      message.warning('请至少选择2个专业进行对比');
      return;
    }
    navigate('/school-compare', { state: { schoolIds: selectedMajors } });
  };
 
  // 查看就业方向详情
  const viewCareerDetail = (majorId) => {
    navigate(`/career-detail/${majorId}`);
  };
 
  // 查看培养计划详情
  const viewTrainingPlan = (majorId) => {
    navigate(`/training-plan/${majorId}`);
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
 
  // 渲染专业卡片
  const renderMajorCard = (major) => {
    const isSelected = selectedMajors.includes(major.id);
     
    return (
      <motion.div 
        key={major.id}
        variants={itemVariants}
        className="bg-white rounded-lg shadow-md p-4 mb-4"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{major.name}</h3>
            <div className="flex mt-1">
              {major.tags.map((tag, index) => (
                <Tag key={index} color={index === 0 ? 'blue' : 'green'} className="mr-1">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
          <div className="flex">
            <Button 
              size="small" 
              type="primary" 
              ghost
              className="mr-2"
              onClick={() => addToCompare(major.id)}
            >
              {isSelected ? '已选择' : '可选'}
            </Button>
            <Button 
              size="small" 
              type="primary"
              onClick={() => addToCompare(major.id)}
            >
              加入对比
            </Button>
          </div>
        </div>
         
        <div className="mt-3">
          <div className="text-green-600 font-medium">录取率: {major.acceptanceRate}%</div>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <div>院校代码: {major.schoolCode}</div>
            <div>24年招生数: {major.enrollmentCount}人</div>
            <div>24年最低分: {major.minScore}分</div>
            <div>24年最低位次: {major.minRank}名</div>
            <div>专业代码: {major.majorCode}</div>
          </div>
        </div>
         
        <div className="mt-3 flex justify-between">
          <Button 
            type="default" 
            onClick={() => viewCareerDetail(major.id)}
          >
            就业方向详情
          </Button>
          <Button 
            type="primary" 
            onClick={() => viewTrainingPlan(major.id)}
          >
            培养计划详情与咨询
          </Button>
        </div>
      </motion.div>
    );
  };
 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部标签页 - 专业推荐 */}
      <div className="bg-white">
        <Tabs 
          activeKey="3" 
          onChange={(key) => {
            if (key === '1') navigate('/profile-analysis');
            else if (key === '2') navigate('/school-recommendation');
          }}
          centered
          className="custom-tabs"
        >
          <TabPane tab="我的分析" key="1" />
          <TabPane tab="院校推荐" key="2" />
          <TabPane tab="专业推荐" key="3" />
        </Tabs>
      </div>
      
      {/* 专业推荐标题 */}
      <div className="bg-white px-4 py-2 mb-4 shadow-sm">
        <h2 className="text-xl font-bold text-center">专业推荐</h2>
        <p className="text-center text-gray-500 text-sm">根据您的能力特点和兴趣匹配的专业推荐</p>
      </div>
 
      {/* 筛选条件 - 专业推荐特有的筛选条件 */}
      <div className="bg-white p-3 shadow-sm">
        <div className="flex flex-wrap justify-between items-center">
          <Select
            placeholder="专业"
            style={{ width: 120 }}
            onChange={(value) => handleFilterChange(value, 'major')}
            suffixIcon={<FilterOutlined />}
            className="mr-2 mb-2"
          >
            <Option value="mechanical">机械类</Option>
            <Option value="electronic">电子信息类</Option>
            <Option value="computer">计算机类</Option>
          </Select>
           
          <Select
            placeholder="院校"
            style={{ width: 120 }}
            onChange={(value) => handleFilterChange(value, 'school')}
            suffixIcon={<FilterOutlined />}
            className="mr-2 mb-2"
          >
            <Option value="zhejiang">浙江工业职业技术学院</Option>
            <Option value="jinhua">金华职业技术学院</Option>
            <Option value="wenzhou">温州职业技术学院</Option>
          </Select>
           
          <Select
            placeholder="排序方式"
            style={{ width: 120 }}
            onChange={(value) => handleFilterChange(value, 'sortBy')}
            suffixIcon={<FilterOutlined />}
            className="mb-2"
          >
            <Option value="match">匹配度</Option>
            <Option value="employment">就业率</Option>
            <Option value="score">最低分</Option>
          </Select>
        </div>
      </div>
 
      {/* 专业列表 */}
      <div className="container mx-auto px-4 py-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {recommendedMajors.map(major => renderMajorCard(major))}
        </motion.div>
 
        {/* 底部对比按钮 */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
          <Button 
            type="primary" 
            block 
            size="large"
            onClick={goToCompare}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white"
          >
            进入对比 {selectedMajors.length > 0 && `(${selectedMajors.length}/3)`}
          </Button>
        </div>
      </div>
    </div>
  );
};
 
export default MajorRecommendation;