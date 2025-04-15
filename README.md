# 职校生生涯规划平台

## 项目介绍

职校生生涯规划平台是一个面向准备上职校的初中学生的生涯规划工具，通过智能对话收集学生的家庭背景、学科偏好和职业倾向，生成个人能力结构画像，并为学生推荐合适的职业学校和专业。

## 功能特点

- **身份选择与家长绑定**：首次使用时选择身份并绑定家长信息
- **用户认证系统**：包含注册、登录和密码找回功能
- **智能对话咨询**：通过对话形式收集学生信息，生成个性化分析
- **个人能力画像分析**：展示学生的能力结构和职业倾向
- **院校/专业推荐引擎**：根据学生画像推荐匹配度高的院校和专业
- **多维度对比系统**：支持多所学校的多维度对比
- **学生档案管理**：选择志愿后初始化学生档案

## 技术栈

- 前端框架：React
- 路由管理：React Router
- UI组件：Ant Design
- 样式解决方案：Styled Components
- 构建工具：Vite

## 安装步骤

1. 克隆项目到本地

```bash
git clone <repository-url>
cd TraeAiProject
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 构建生产版本

```bash
npm run build
```

## 项目结构

```
src/
├── assets/        # 静态资源文件
├── components/    # 可复用组件
├── pages/         # 页面组件
│   ├── IdentitySelection.jsx    # 身份选择页面
│   ├── Login.jsx               # 登录页面
│   ├── Register.jsx            # 注册页面
│   ├── ForgotPassword.jsx      # 忘记密码页面
│   ├── AIConsultation.jsx      # 智能对话咨询页面
│   ├── AbilityProfile.jsx      # 个人能力画像分析页面
│   ├── SchoolRecommendation.jsx # 院校推荐页面
│   ├── ComparisonSystem.jsx    # 多维度对比系统页面
│   └── StudentProfile.jsx      # 学生档案页面
├── App.jsx        # 应用入口组件
├── main.jsx       # 应用入口文件
└── index.css      # 全局样式
```

## 使用流程

1. 首次使用选择身份并绑定家长信息
2. 注册账号或登录已有账号
3. 完成AI智能对话咨询
4. 查看个人能力画像分析
5. 浏览推荐院校和专业
6. 对比感兴趣的院校
7. 选择志愿并初始化学生档案

## 设计风格

- 主色调：教育绿 (#4CAF50)
- 辅助色：蓝色 (#2196F3)
- 警示色：红色 (#FF5722)
- 布局：F型阅读布局，信息密度适中
- 卡片间距：24px