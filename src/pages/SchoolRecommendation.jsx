// 学校推荐页面

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Tabs, Tag, Rate, Progress, Divider, Radio } from 'antd';
import { LeftOutlined, RightOutlined, HeartOutlined, HeartFilled, EnvironmentOutlined, BookOutlined, TeamOutlined, BankOutlined, CheckCircleOutlined } from '@ant-design/icons';
 
// 学校推荐组件，用于展示推荐的院校和专业，支持收藏和比较功能
const SchoolRecommendation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('schools');
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [compareMode, setCompareMode] = useState(false);
   
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
      name: '北京信息职业技术学院',
      location: '北京市',
      type: '公办',
      level: '国家示范',
      matchScore: 95,
      majors: ['数字媒体技术', '电子商务', '计算机网络技术'],
      features: ['师资力量雄厚', '校企合作紧密', '就业率高'],
      employmentRate: 98,
      avgSalary: 7500,
      facilities: 4.5,
      teaching: 4.8,
      internship: 4.7,
    },
    {
      id: 2,
      name: '上海工艺美术职业学院',
      location: '上海市',
      type: '公办',
      level: '市级重点',
      matchScore: 88,
      majors: ['视觉传达设计', '数字媒体艺术', '产品设计'],
      features: ['艺术特色鲜明', '实训设备先进', '国际交流机会多'],
      employmentRate: 95,
      avgSalary: 8000,
      facilities: 4.7,
      teaching: 4.5,
      internship: 4.6,
    },
    {
      id: 3,
      name: '广州番禺职业技术学院',
      location: '广东省广州市',
      type: '公办',
      level: '国家优质',
      matchScore: 85,
      majors: ['市场营销', '电子商务', '商务管理'],
      features: ['校园环境优美', '创新创业氛围浓厚', '实习机会丰富'],
      employmentRate: 93,
      avgSalary: 7200,
      facilities: 4.3,
      teaching: 4.4,
      internship: 4.8,
    },
    {
      id: 4,
      name: '深圳职业技术学院',
      location: '广东省深圳市',
      type: '公办',
      level: '国家示范',
      matchScore: 82,
      majors: ['电子商务', '数字媒体技术', '市场营销'],
      features: ['地处经济特区', '产教融合深入', '创新能力培养突出'],
      employmentRate: 96,
      avgSalary: 8500,
      facilities: 4.8,
      teaching: 4.6,
      internship: 4.9,
    },
  ];
 
  // 推荐专业数据
  const recommendedMajors = [
    {
      id: 1,
      name: '数字媒体技术',
      category: '电子信息',
      matchScore: 94,
      description: '培养具备数字媒体内容设计、制作、传播能力的技术技能人才',
      courses: ['UI设计基础', '数字媒体制作', '网页设计与制作', '移动应用开发'],
      careerPath: ['UI/UX设计师', '前端开发工程师', '数字媒体运营'],
      employmentRate: 96,
      avgSalary: 7800,
      difficulty: 3.5,
    },
    {
      id: 2,
      name: '电子商务',
      category: '财经商贸',
      matchScore: 90,
      description: '培养具备电子商务运营、网络营销、客户服务等能力的复合型人才',
      courses: ['电子商务概论', '网络营销', '客户关系管理', '数据分析基础'],
      careerPath: ['电商运营', '网络营销专员', '客户服务主管'],
      employmentRate: 95,
      avgSalary: 7500,
      difficulty: 3.2,
    },
    {
      id: 3,
      name: '市场营销',
      category: '财经商贸',
      matchScore: 88,
      description: '培养具备市场分析、营销策划、客户开发与管理能力的应用型人才',
      courses: ['市场营销学', '消费者行为学', '营销策划', '商务谈判'],
      careerPath: ['市场专员', '销售代表', '营销策划师'],
      employmentRate: 93,
      avgSalary: 7200,
      difficulty: 3.0,
    },
    {
      id: 4,
      name: '视觉传达设计',
      category: '艺术设计',
      matchScore: 85,
      description: '培养具备视觉设计、品牌形象设计、广告设计能力的创意型人才',
      courses: ['设计基础', '字体设计', '品牌形象设计', '包装设计'],
      careerPath: ['平面设计师', '品牌设计师', '广告设计师'],
      employmentRate: 92,
      avgSalary: 7600,
      difficulty: 3.8,
    },
  ];
 
  // 切换收藏状态
  const toggleFavorite = (id) => {
    if (selectedSchools.includes(id)) {
      setSelectedSchools(selectedSchools.filter(schoolId => schoolId !== id));
    } else {
      setSelectedSchools([...selectedSchools, id]);
    }
  };
 
  // 切换比较模式
  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
  };
 
  // 返回上一页
  const goBack = () => {
    navigate(-1);
  };
 
  // 前往学生档案页面
  const goToStudentProfile = () => {
    navigate('/student-profile');
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
 
  // 渲染学校卡片 - 按照用户描述的院校推荐视图格式
  const renderSchoolCard = (school) => {
    const isFavorite = selectedSchools.includes(school.id);
     
    return (
      <motion.div 
        key={school.id}
        variants={itemVariants}
        className="bg-white rounded-lg shadow-md p-4 mb-4"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{school.name}</h3>
          </div>
          <div className="flex">
            <Button 
              size="small" 
              type="primary" 
              ghost
              className="mr-2"
            >
              {isFavorite ? '不可选校' : '可选校'}
            </Button>
            <Button 
              size="small" 
              type="primary"
              onClick={() => toggleFavorite(school.id)}
            >
              加入对比
            </Button>
          </div>
        </div>
         
        <div className="flex mt-1">
          <Tag color={school.type === '公办' ? 'blue' : 'purple'} className="mr-1">
            {school.type}
          </Tag>
          {school.level && (
            <Tag color="gold" className="mr-1">
              {school.level}
            </Tag>
          )}
        </div>
         
        <div className="mt-3 text-green-600 font-medium">录取率: {school.employmentRate}%</div>
         
        <div className="grid grid-cols-1 gap-2 mt-2 text-sm">
          <div>院校代码: {school.id}</div>
          <div>24年招生数: {school.enrollmentCount || '2800'}人</div>
          <div>24年最低分: {school.minScore || '385'}分</div>
          <div>24年最低位次: {school.minRank || '12680'}名</div>
        </div>
         
        <div className="mt-3 flex justify-between items-center">
          <div>可报专业数: {school.majors ? school.majors.length : '28'}个</div>
          <Button 
            type="primary" 
            className="bg-blue-500 text-white"
          >
            查看详情与咨询
          </Button>
        </div>
      </motion.div>
    );
  };
 
  // 渲染专业卡片
  const renderMajorCard = (major) => {
    return (
      <motion.div 
        key={major.id}
        variants={itemVariants}
        className="school-card"
      >
        <div className="school-header">
          <div className="school-name">{major.name}</div>
          <Tag color="purple">{major.category}</Tag>
        </div>
         
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm">匹配度</div>
          <div className="flex items-center">
            <span className="match-score mr-2">{major.matchScore}%</span>
            <div className="w-24 progress-bar">
              <div 
                className="progress-value" 
                style={{ 
                  width: `${major.matchScore}%`,
                  backgroundColor: '#4CAF50'
                }}
              ></div>
            </div>
          </div>
        </div>
         
        <div className="mb-3">
          <div className="text-sm text-gray-700">{major.description}</div>
        </div>
         
        <div className="mb-3">
          <div className="text-sm mb-1">核心课程</div>
          <div className="flex flex-wrap">
            {major.courses.map((course, index) => (
              <Tag key={index} className="mb-1 mr-1" color="blue">
                <BookOutlined className="mr-1" />
                {course}
              </Tag>
            ))}
          </div>
        </div>
         
        <div className="mb-3">
          <div className="text-sm mb-1">就业方向</div>
          <div className="flex flex-wrap">
            {major.careerPath.map((career, index) => (
              <Tag key={index} className="mb-1 mr-1" color="green">
                <TeamOutlined className="mr-1" />
                {career}
              </Tag>
            ))}
          </div>
        </div>
         
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <div className="text-gray-500">就业率</div>
            <div className="font-bold text-primary">{major.employmentRate}%</div>
          </div>
          <div>
            <div className="text-gray-500">平均薪资</div>
            <div className="font-bold text-primary">{major.avgSalary}元</div>
          </div>
          <div>
            <div className="text-gray-500">难度系数</div>
            <div>
              <Rate disabled defaultValue={Math.round(major.difficulty)} className="text-xs" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };
 
  // 渲染比较视图
  const renderComparisonView = () => {
    const selectedSchoolsData = recommendedSchools.filter(school => 
      selectedSchools.includes(school.id)
    );
 
    if (selectedSchoolsData.length < 2) {
      return (
        <div className="text-center py-10">
          <div className="text-lg font-medium mb-2">请至少选择两所学校进行比较</div>
          <div className="text-sm text-gray-500">在学校列表中点击心形图标选择学校</div>
        </div>
      );
    }
 
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left font-medium text-gray-600">比较项目</th>
              {selectedSchoolsData.map(school => (
                <th key={school.id} className="p-3 text-left font-medium text-gray-600">
                  {school.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="p-3 text-gray-600">学校类型</td>
              {selectedSchoolsData.map(school => (
                <td key={school.id} className="p-3">{school.type}</td>
              ))}
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-3 text-gray-600">学校等级</td>
              {selectedSchoolsData.map(school => (
                <td key={school.id} className="p-3">
                  <Tag color="blue">{school.level}</Tag>
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-3 text-gray-600">匹配度</td>
              {selectedSchoolsData.map(school => (
                <td key={school.id} className="p-3">
                  <div className="flex items-center">
                    <span className="match-score mr-2">{school.matchScore}%</span>
                    <div className="w-24 progress-bar">
                      <div 
                        className="progress-value" 
                        style={{ 
                          width: `${school.matchScore}%`,
                          backgroundColor: '#4CAF50'
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-3 text-gray-600">推荐专业</td>
              {selectedSchoolsData.map(school => (
                <td key={school.id} className="p-3">
                  <div className="flex flex-wrap">
                    {school.majors.map((major, index) => (
                      <Tag key={index} className="mb-1 mr-1">{major}</Tag>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-3 text-gray-600">就业率</td>
              {selectedSchoolsData.map(school => (
                <td key={school.id} className="p-3">
                  <span className="font-medium">{school.employmentRate}%</span>
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-3 text-gray-600">平均薪资</td>
              {selectedSchoolsData.map(school => (
                <td key={school.id} className="p-3">
                  <span className="font-medium">{school.avgSalary}元/月</span>
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-3 text-gray-600">教学质量</td>
              {selectedSchoolsData.map(school => (
                <td key={school.id} className="p-3">
                  <Rate disabled defaultValue={Math.round(school.teaching)} className="text-xs" />
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-3 text-gray-600">实习资源</td>
              {selectedSchoolsData.map(school => (
                <td key={school.id} className="p-3">
                  <Rate disabled defaultValue={Math.round(school.internship)} className="text-xs" />
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-3 text-gray-600">校园设施</td>
              {selectedSchoolsData.map(school => (
                <td key={school.id} className="p-3">
                  <Rate disabled defaultValue={Math.round(school.facilities)} className="text-xs" />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
 
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-primary text-lg">正在为你匹配最适合的院校和专业...</div>
          <div className="w-64 mx-auto">
            <Progress percent={60} status="active" strokeColor="#4CAF50" />
          </div>
        </div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部标签页 */}
      <div className="bg-white">
        <Tabs 
          activeKey={activeTab} 
          onChange={(key) => {
            setActiveTab(key);
            if (key === 'profile') {
              navigate('/profile-analysis');
            } else if (key === 'majors') {
              navigate('/major-recommendation');
            }
          }}
          centered
          className="custom-tabs"
        >
          <TabPane tab="我的分析" key="profile" />
          <TabPane tab="院校推荐" key="schools" />
          <TabPane tab="专业推荐" key="majors" />
        </Tabs>
      </div>
 
      {/* 内容区域 */}
      <div className="container mx-auto px-4 py-6">
        {/* 筛选条件 - 院校推荐特有的筛选条件 */}
        <div className="bg-white p-3 shadow-sm">
          <div className="flex flex-wrap justify-between items-center">
            <Select
              placeholder="地区"
              style={{ width: 120 }}
              onChange={(value) => handleFilterChange(value, 'location')}
              suffixIcon={<EnvironmentOutlined />}
              className="mr-2 mb-2"
            >
              <Option value="beijing">北京</Option>
              <Option value="shanghai">上海</Option>
              <Option value="guangdong">广东</Option>
              <Option value="zhejiang">浙江</Option>
            </Select>
             
            <Select
              placeholder="学费"
              style={{ width: 120 }}
              onChange={(value) => handleFilterChange(value, 'tuition')}
              className="mr-2 mb-2"
            >
              <Option value="low">5000以下</Option>
              <Option value="medium">5000-10000</Option>
              <Option value="high">10000以上</Option>
            </Select>
             
            <Select
              placeholder="公立/私立"
              style={{ width: 120 }}
              onChange={(value) => handleFilterChange(value, 'type')}
              className="mr-2 mb-2"
            >
              <Option value="public">公办</Option>
              <Option value="private">民办</Option>
            </Select>
             
            <Select
              placeholder="推荐方式"
              style={{ width: 120 }}
              onChange={(value) => handleFilterChange(value, 'sortBy')}
              className="mb-2"
            >
              <Option value="match">匹配度</Option>
              <Option value="employment">就业率</Option>
              <Option value="score">最低分</Option>
            </Select>
          </div>
        </div>
 
        {/* 比较模式切换按钮 */}
        {activeTab === 'schools' && (
          <div className="flex justify-end mb-4">
            <Button 
              type={compareMode ? "primary" : "default"}
              onClick={toggleCompareMode}
              className={compareMode ? "btn-primary" : ""}
            >
              {compareMode ? "退出比较模式" : "进入比较模式"}
            </Button>
          </div>
        )}
 
        {/* 学校推荐 */}
        {activeTab === 'schools' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {recommendedSchools.map(school => renderSchoolCard(school))}
          </motion.div>
        )}
 
        {/* 专业推荐 */}
        {activeTab === 'majors' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {recommendedMajors.map(major => renderMajorCard(major))}
          </motion.div>
        )}
 
        {/* 多维对比 */}
        {activeTab === 'comparison' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-sm p-4"
          >
            {renderComparisonView()}
          </motion.div>
        )}
 
        {/* 底部按钮 - 固定显示的进入对比按钮 */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
          <Button 
            type="primary" 
            block 
            size="large"
            onClick={() => navigate('/school-compare', { state: { schoolIds: selectedSchools } })}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white"
          >
            进入对比 {selectedSchools.length > 0 && `(${selectedSchools.length})`}
          </Button>
        </div>
      </div>
    </div>
  );
};
 
export default SchoolRecommendation;