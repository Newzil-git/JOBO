// 学校推荐页面（新版）

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Tabs, Select, Tag, Divider, message, Progress } from 'antd';
import { LeftOutlined, FilterOutlined, FireOutlined, WarningOutlined } from '@ant-design/icons';
 
const { TabPane } = Tabs;
const { Option } = Select;
 
const SchoolRecommendationNew = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
   
  // 筛选条件
  const [filters, setFilters] = useState({
    region: '',
    tuition: '',
    type: '',
    sortBy: ''
  });
 
  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
 
  // 推荐学校数据
  const recommendedSchools = [
    {
      id: 1,
      name: '广州市机电技师学院',
      type: '公办学校',
      level: '国家重点',
      acceptanceRate: 89.6,
      schoolCode: '12345',
      enrollmentCount: 2800,
      minScore: 385,
      minRank: 12680,
      majorCount: 28,
      tags: ['公办', '国家重点']
    },
    {
      id: 2,
      name: '深圳技师学院',
      type: '公办学校',
      level: '省重点',
      acceptanceRate: 92.3,
      schoolCode: '12346',
      enrollmentCount: 3200,
      minScore: 375,
      minRank: 13580,
      majorCount: 32,
      tags: ['公办', '省重点']
    },
    {
      id: 3,
      name: '东莞技师学院',
      type: '公办学校',
      level: '市重点',
      acceptanceRate: 94.1,
      schoolCode: '12347',
      enrollmentCount: 2600,
      minScore: 365,
      minRank: 14280,
      majorCount: 25,
      tags: ['公办', '市重点']
    }
  ];
 
  // 处理筛选条件变化
  const handleFilterChange = (value, type) => {
    setFilters({
      ...filters,
      [type]: value
    });
  };
 
  // 添加学校到对比
  const addToCompare = (schoolId) => {
    if (selectedSchools.includes(schoolId)) {
      setSelectedSchools(selectedSchools.filter(id => id !== schoolId));
      message.success('已从对比中移除');
    } else {
      if (selectedSchools.length >= 3) {
        message.warning('最多只能对比3所学校');
        return;
      }
      setSelectedSchools([...selectedSchools, schoolId]);
      message.success('已添加到对比');
    }
  };
 
  // 进入对比页面
  const goToCompare = () => {
    if (selectedSchools.length < 2) {
      message.warning('请至少选择2所学校进行对比');
      return;
    }
    navigate('/school-compare', { state: { schoolIds: selectedSchools } });
  };
 
  // 查看学校详情
  const viewSchoolDetail = (schoolId) => {
    navigate(`/school-detail/${schoolId}`);
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
 
  // 渲染学校卡片
  const renderSchoolCard = (school) => {
    const isSelected = selectedSchools.includes(school.id);
     
    return (
      <motion.div 
        key={school.id}
        variants={itemVariants}
        className="bg-white rounded-lg shadow-md p-4 mb-4"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{school.name}</h3>
            <div className="flex mt-1">
              {school.tags.map((tag, index) => (
                <Tag key={index} color={index === 0 ? 'green' : 'blue'} className="mr-1">
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
              onClick={() => addToCompare(school.id)}
            >
              {isSelected ? '已选择' : '可选校'}
            </Button>
            <Button 
              size="small" 
              type="primary"
              onClick={() => addToCompare(school.id)}
            >
              加入对比
            </Button>
          </div>
        </div>
         
        <div className="mt-3">
          <div className="text-green-600 font-medium">录取率: {school.acceptanceRate}%</div>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <div>院校代码: {school.schoolCode}</div>
            <div>24年招生数: {school.enrollmentCount}人</div>
            <div>24年最低分: {school.minScore}分</div>
            <div>24年最低位次: {school.minRank}名</div>
          </div>
          <div className="mt-3 text-sm">可报专业数: {school.majorCount}个</div>
        </div>
         
        <div className="mt-3 flex justify-end">
          <Button 
            type="primary" 
            onClick={() => viewSchoolDetail(school.id)}
          >
            查看详情与咨询
          </Button>
        </div>
      </motion.div>
    );
  };
 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部标签页 */}
      <div className="bg-white">
        <Tabs 
          activeKey="2" 
          onChange={(key) => {
            if (key === "1") navigate('/profile-analysis');
            else if (key === "3") navigate('/major-recommendation');
          }}
          centered
          className="custom-tabs"
        >
          <TabPane tab="我的分析" key="1" />
          <TabPane tab="院校推荐" key="2" />
          <TabPane tab="专业推荐" key="3" />
        </Tabs>
      </div>

      {/* 筛选条件 */}
      <div className="bg-white p-3 flex flex-wrap items-center justify-between space-y-2 md:space-y-0 border-b shadow-sm">
        <Select
          placeholder="地区"
          style={{ width: 100 }}
          onChange={(value) => handleFilterChange(value, 'region')}
          className="mr-2 mb-2 md:mb-0"
          allowClear
          suffixIcon={<FilterOutlined />}
        >
          <Option value="beijing">北京</Option>
          <Option value="shanghai">上海</Option>
          <Option value="guangdong">广东</Option>
        </Select>

        <Select
          placeholder="学费"
          style={{ width: 100 }}
          onChange={(value) => handleFilterChange(value, 'tuition')}
          className="mr-2 mb-2 md:mb-0"
          allowClear
          suffixIcon={<FilterOutlined />}
        >
          <Option value="low">5000以下</Option>
          <Option value="medium">5000-8000</Option>
          <Option value="high">8000以上</Option>
        </Select>

        <Select
          placeholder="公立/私立"
          style={{ width: 100 }}
          onChange={(value) => handleFilterChange(value, 'type')}
          className="mr-2 mb-2 md:mb-0"
          allowClear
          suffixIcon={<FilterOutlined />}
        >
          <Option value="public">公办</Option>
          <Option value="private">民办</Option>
        </Select>

        <Select
          placeholder="排序方式"
          style={{ width: 100 }}
          onChange={(value) => handleFilterChange(value, 'sortBy')}
          className="mb-2 md:mb-0"
          allowClear
          suffixIcon={<FilterOutlined />}
        >
          <Option value="match">匹配度</Option>
          <Option value="rate">录取率</Option>
          <Option value="score">最低分</Option>
        </Select>
      </div>
 
      {/* 学校列表 */}
      <div className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="text-center py-10">
            <div className="text-lg mb-2">正在加载推荐院校...</div>
            <div className="w-64 mx-auto">
              <Progress percent={75} status="active" strokeColor={{from: '#4CAF50', to: '#2196F3'}} />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendedSchools.map((school) => (
              <div key={school.id} className="bg-white rounded-lg shadow-card p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">{school.name}</h3>
                    <div className="flex flex-wrap mt-1">
                      {school.tags.map((tag, idx) => (
                        <Tag key={idx} className="mr-1 mb-1 px-2 py-0.5 rounded-full bg-primary-50 text-primary border-0">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="small" 
                      type="primary" 
                      ghost
                      className="rounded-full border-primary text-primary"
                      onClick={() => addToCompare(school.id)}
                    >
                      {selectedSchools.includes(school.id) ? '已选择' : '可选校'}
                    </Button>
                    <Button 
                      size="small"
                      className="rounded-full" 
                      onClick={() => addToCompare(school.id)}
                    >
                      加入对比
                    </Button>
                  </div>
                </div>
                
                <div className="mt-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>录取率: <span className="text-primary font-medium">{school.acceptanceRate}%</span></div>
                    <div>院校代码: {school.schoolCode}</div>
                    <div>24年招生数: {school.enrollmentCount}人</div>
                    <div>24年最低分: {school.minScore}分</div>
                    <div>24年最低位次: {school.minRank}名</div>
                    <div>可报专业数: {school.majorCount}个</div>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-end">
                  <Button 
                    type="primary" 
                    size="small" 
                    className="bg-secondary hover:bg-secondary-600 border-0 rounded-lg"
                    onClick={() => viewSchoolDetail(school.id)}
                  >
                    查看详情与咨询
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* 底部按钮 - 始终显示 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-3 shadow-md">
          <Button 
            type="primary" 
            block 
            onClick={goToCompare}
            disabled={selectedSchools.length < 2}
            className="bg-gradient-primary hover:shadow-lg transition-shadow rounded-lg h-12"
          >
            进入对比 ({selectedSchools.length}/3)
          </Button>
        </div>
      </div>
    </div>
  );
};
 
export default SchoolRecommendationNew;