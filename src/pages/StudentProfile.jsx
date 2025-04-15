// 学生档案页面

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Avatar, Divider, Steps, Tag, Card, Collapse, message } from 'antd';
import { UserOutlined, BookOutlined, BankOutlined, CalendarOutlined, CheckCircleOutlined, LeftOutlined, DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import RadarChart from '../components/RadarChart';
 
const { Panel } = Collapse;
 
const StudentProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
   
  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      message.success('学生档案创建成功！');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
 
  // 学生信息
  const studentInfo = {
    name: '张同学',
    grade: '初三',
    school: '北京市第一中学',
    phone: '188****8888',
    parentPhone: '139****7777',
    createdAt: '2023-09-15',
  };
 
  // 能力数据
  const abilityData = [
    { label: '语言能力', value: 85 },
    { label: '逻辑思维', value: 70 },
    { label: '空间感知', value: 60 },
    { label: '创造力', value: 75 },
    { label: '人际交往', value: 90 },
    { label: '自我管理', value: 65 },
  ];
 
  // 选择的院校和专业
  const selectedSchool = {
    name: '北京信息职业技术学院',
    major: '数字媒体技术',
    duration: '3年',
    tuition: '5800元/年',
    location: '北京市大兴区',
    enrollmentDate: '2024年9月',
  };
 
  // 学习计划
  const learningPlan = [
    {
      title: '入学准备阶段',
      time: '现在 - 2024年8月',
      tasks: [
        '完成初中学业，确保顺利毕业',
        '参加职业学校招生考试',
        '提前学习专业基础知识',
        '了解学校环境和专业课程设置'
      ]
    },
    {
      title: '第一学年',
      time: '2024年9月 - 2025年7月',
      tasks: [
        '适应职校生活，建立良好的学习习惯',
        '掌握专业基础知识和技能',
        '参加校内实训项目',
        '探索个人兴趣方向'
      ]
    },
    {
      title: '第二学年',
      time: '2025年9月 - 2026年7月',
      tasks: [
        '深入学习专业核心课程',
        '参与校企合作项目',
        '获取相关职业资格证书',
        '建立职业发展规划'
      ]
    },
    {
      title: '第三学年',
      time: '2026年9月 - 2027年7月',
      tasks: [
        '完成专业综合实训',
        '参加企业实习',
        '准备就业或升学',
        '完成毕业设计'
      ]
    },
  ];
 
  // 返回上一页
  const goBack = () => {
    navigate(-1);
  };
 
  // 分享档案
  const shareProfile = () => {
    message.success('分享链接已复制到剪贴板');
  };
 
  // 下载档案
  const downloadProfile = () => {
    message.success('档案已开始下载');
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
          <div className="mb-4 text-primary text-lg">正在创建学生档案...</div>
          <Steps 
            current={2} 
            progressDot 
            direction="vertical"
            items={[
              {
                title: '收集基本信息',
                description: '已完成',
              },
              {
                title: '生成能力画像',
                description: '已完成',
              },
              {
                title: '确认院校选择',
                description: '已完成',
              },
              {
                title: '创建学习计划',
                description: '处理中...',
              },
            ]}
          />
        </div>
      </div>
    );
  }
 
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
        <div className="absolute right-2 top-2 flex">
          <Button 
            type="text" 
            icon={<ShareAltOutlined />} 
            onClick={shareProfile} 
            className="text-white mr-2"
          />
          <Button 
            type="text" 
            icon={<DownloadOutlined />} 
            onClick={downloadProfile} 
            className="text-white"
          />
        </div>
        <div className="flex flex-col items-center justify-center py-6">
          <Avatar size={64} icon={<UserOutlined />} className="mb-2 bg-white text-primary" />
          <h1 className="text-xl font-bold">{studentInfo.name}的学生档案</h1>
          <p className="text-sm opacity-80">创建于 {studentInfo.createdAt}</p>
        </div>
      </div>
 
      {/* 内容区域 */}
      <div className="container mx-auto px-4 py-6 -mt-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* 基本信息 */}
          <motion.div variants={itemVariants} className="card">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <UserOutlined className="mr-2" />
              基本信息
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">姓名</span>
                <span>{studentInfo.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">年级</span>
                <span>{studentInfo.grade}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">就读学校</span>
                <span>{studentInfo.school}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">联系电话</span>
                <span>{studentInfo.phone}</span>
              </div>
              <div className="flex flex-col col-span-2">
                <span className="text-gray-500 text-sm">家长电话</span>
                <span>{studentInfo.parentPhone}</span>
              </div>
            </div>
          </motion.div>
 
          {/* 能力画像 */}
          <motion.div variants={itemVariants} className="card">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <BookOutlined className="mr-2" />
              能力画像
            </h2>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <RadarChart data={abilityData} size={250} />
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <p className="text-gray-700 mb-3">
                  你的<span className="text-primary font-medium">人际交往</span>能力最为突出，语言能力和创造力也较强。
                </p>
                <p className="text-gray-700">
                  根据你的能力分布，最适合在<span className="text-primary font-medium">产品设计</span>和<span className="text-primary font-medium">用户体验</span>相关领域发展。
                </p>
              </div>
            </div>
          </motion.div>
 
          {/* 院校专业选择 */}
          <motion.div variants={itemVariants} className="card">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <BankOutlined className="mr-2" />
              院校专业选择
            </h2>
            <Card className="bg-gray-50 border-none">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-primary">{selectedSchool.name}</h3>
                  <div className="flex items-center mt-1">
                    <Tag color="blue">{selectedSchool.major}</Tag>
                    <span className="text-gray-500 text-sm ml-2">学制: {selectedSchool.duration}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="text-sm text-gray-500">学费: {selectedSchool.tuition}</div>
                  <div className="text-sm text-gray-500">地址: {selectedSchool.location}</div>
                  <div className="text-sm text-gray-500">入学时间: {selectedSchool.enrollmentDate}</div>
                </div>
              </div>
            </Card>
            <div className="mt-4">
              <h3 className="font-medium mb-2">选择理由</h3>
              <ul className="text-gray-700">
                <li className="flex items-start mb-2">
                  <CheckCircleOutlined className="text-primary mt-1 mr-2" />
                  <span>该院校的数字媒体技术专业与你的能力画像高度匹配，能够充分发挥你的创造力和人际交往能力</span>
                </li>
                <li className="flex items-start mb-2">
                  <CheckCircleOutlined className="text-primary mt-1 mr-2" />
                  <span>学校拥有先进的实训设备和丰富的校企合作资源，有利于你未来的就业发展</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-primary mt-1 mr-2" />
                  <span>该专业就业前景良好，毕业生平均薪资水平较高，符合你的职业发展规划</span>
                </li>
              </ul>
            </div>
          </motion.div>
 
          {/* 学习计划 */}
          <motion.div variants={itemVariants} className="card">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <CalendarOutlined className="mr-2" />
              学习计划
            </h2>
            <Steps 
              direction="vertical" 
              current={0}
              items={learningPlan.map((phase, index) => ({
                title: phase.title,
                description: (
                  <div>
                    <div className="text-gray-500 text-sm mb-2">{phase.time}</div>
                    <ul className="list-disc pl-4">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-gray-700 mb-1">{task}</li>
                      ))}
                    </ul>
                  </div>
                ),
              }))}
            />
          </motion.div>
 
          {/* 备注信息 */}
          <motion.div variants={itemVariants} className="card">
            <h2 className="text-lg font-bold mb-4">备注信息</h2>
            <Collapse ghost>
              <Panel header="入学须知" key="1">
                <p className="text-gray-700">
                  1. 请在2024年8月15日前完成入学报到手续<br />
                  2. 报到时需携带身份证、户口本、毕业证等证件原件及复印件<br />
                  3. 学校提供住宿，请提前准备好生活用品<br />
                  4. 开学第一周将进行专业基础测试，请提前做好准备
                </p>
              </Panel>
              <Panel header="联系方式" key="2">
                <p className="text-gray-700">
                  招生办电话: 010-12345678<br />
                  学校地址: 北京市大兴区兴华大街15号<br />
                  官方网站: www.example.edu.cn<br />
                  微信公众号: BJInfoTech
                </p>
              </Panel>
            </Collapse>
          </motion.div>
 
          {/* 底部按钮 */}
          <motion.div variants={itemVariants} className="flex justify-between mb-10">
            <Button 
              type="default" 
              size="large" 
              onClick={goBack}
              className="flex-1 mr-2"
            >
              返回修改
            </Button>
            <Button 
              type="primary" 
              size="large" 
              onClick={downloadProfile}
              className="flex-1 ml-2 btn-primary"
            >
              下载档案 <DownloadOutlined />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
 
export default StudentProfile;