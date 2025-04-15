// AI访谈页面

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Button, Avatar } from 'antd';
import { SendOutlined, AudioOutlined, PictureOutlined, SmileOutlined, LeftOutlined, PhoneOutlined, AudioMutedOutlined, MoreOutlined } from '@ant-design/icons';
 
// 定义AI咨询组件
const AIConsultation = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
 
  // 模拟初始AI消息
  useEffect(() => {
    const initialMessages = [
      { id: 1, sender: 'ai', text: '你好！我是四叶草智能生涯规划助手，为了能够更好地为你提供服务，我需要了解一些你的基本情况。', time: new Date() },
      { id: 2, sender: 'ai', text: '隐私说明：我们将保护你的隐私，你提供的信息仅用于为你推荐最合适的职业规划方案，不会用于其他商业用途。', time: new Date() },
      { id: 3, sender: 'user', text: '我已阅读并同意隐私协议', time: new Date() },
      { id: 4, sender: 'ai', text: '首先，能告诉我你的学科偏好和从小到大的兴趣爱好吗？这有助于我了解你的职业倾向。', time: new Date() },
    ];
     
    // 模拟消息逐条显示
    let index = 0;
    const interval = setInterval(() => {
      if (index < initialMessages.length) {
        setMessages(prev => [...prev, initialMessages[index]]);
        index++;
        if (index < initialMessages.length && initialMessages[index].sender === 'ai') {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 1000);
        }
      } else {
        clearInterval(interval);
      }
    }, 1500);
 
    return () => clearInterval(interval);
  }, []);
 
  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
 
  // 发送消息
  const sendMessage = () => {
    if (!inputValue.trim()) return;
 
    // 添加用户消息
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
      time: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
 
    // 模拟AI正在输入
    setIsTyping(true);
 
    // 模拟AI回复
    setTimeout(() => {
      setIsTyping(false);
       
      // 根据用户输入生成不同的AI回复
      let aiResponse = '';
      if (inputValue.includes('兴趣')) {
        aiResponse = '我喜欢阅读和心理学相关的书籍，同时我也喜欢编程，我在学校参加了1-2次编程比赛，安排1-2次旅行。';
      } else if (inputValue.includes('职业')) {
        aiResponse = '我希望未来能从事产品经理相关工作，我喜欢产品设计和用户体验，同时我也对市场营销感兴趣，但我对编程能力有所欠缺。';
      } else {
        aiResponse = '谢谢分享！我已记录下你的偏好。接下来，你对未来的职业有什么规划或想法吗？你期望从事什么样的工作？';
      }
 
      const aiMessage = {
        id: messages.length + 2,
        sender: 'ai',
        text: aiResponse,
        time: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
 
      // 如果对话进行到一定程度，添加分析结果
      if (messages.length > 8) {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            const analysisMessage = {
              id: messages.length + 3,
              sender: 'ai',
              text: '正在分析，请稍后...',
              time: new Date(),
              isAnalysis: true
            };
            setMessages(prev => [...prev, analysisMessage]);
             
            // 模拟分析完成后跳转到能力分析结果选择页面
            setTimeout(() => {
              const finalMessage = {
                id: messages.length + 4,
                sender: 'ai',
                text: '分析完成！我们已经生成了您的能力分析结果，正在为您跳转...',
                time: new Date()
              };
              setMessages(prev => [...prev, finalMessage]);
              
              // 延迟跳转，给用户时间阅读最后的消息
              setTimeout(() => {
                navigate('/home');
              }, 2000);
            }, 3000);
          }, 1500);
        }, 1000);
      }
    }, 1500);
  };
 
  // 处理输入变化
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
 
  // 处理按键事件
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
 
  // 返回上一页
  const goBack = () => {
    navigate(-1);
  };
 
  // 消息动画变体
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };
 
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* 头部 */}
      <div className="bg-teal-500 text-white p-3 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            type="text" 
            icon={<LeftOutlined />} 
            onClick={goBack} 
            className="text-white mr-2"
          />
          <Avatar size={36} className="bg-white text-teal-500">AI</Avatar>
          <div className="ml-3">
            <div className="font-medium">你的智能生涯规划顾问</div>
            <div className="text-xs opacity-80">在线</div>
          </div>
        </div>
        <div className="flex">
          <Button type="text" icon={<PhoneOutlined />} className="text-white" />
          <Button type="text" icon={<AudioOutlined />} className="text-white" />
          <Button type="text" icon={<MoreOutlined />} className="text-white" />
        </div>
      </div>
 
      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              {message.sender === 'ai' && (
                <Avatar size={36} className="mr-2 mt-1 bg-teal-500">AI</Avatar>
              )}
              <div 
                className={`chat-bubble ${
                  message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                } ${
                  message.isAnalysis ? 'relative overflow-hidden' : ''
                }`}
              >
                {message.text}
                {message.isAnalysis && (
                  <div className="mt-4">
                    <div className="flex justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '600ms' }}></div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <img src="/src/assets/chart1.png" alt="分析图表" className="w-full max-w-xs rounded" />
                      <img src="/src/assets/chart2.png" alt="分析图表" className="w-full max-w-xs rounded ml-2" />
                    </div>
                  </div>
                )}
              </div>
              {message.sender === 'user' && (
                <Avatar size={36} className="ml-2 mt-1 bg-blue-500">我</Avatar>
              )}
            </motion.div>
          ))}
 
          {/* AI正在输入提示 */}
          {isTyping && (
            <motion.div
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex justify-start mb-4"
            >
              <Avatar size={36} className="mr-2 mt-1 bg-teal-500">AI</Avatar>
              <div className="chat-bubble chat-bubble-ai py-2 px-3">
                <div className="typing-indicator">
                  <div className="typing-dot" style={{ animationDelay: '0ms' }}></div>
                  <div className="typing-dot" style={{ animationDelay: '300ms' }}></div>
                  <div className="typing-dot" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>
 
      {/* 输入区域 */}
      <div className="bg-white p-3 border-t flex items-center">
        <Button 
          type="text" 
          icon={<PictureOutlined />} 
          className="text-gray-500 mr-1" 
        />
        <Input
          placeholder="请输入消息"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          suffix={
            <SmileOutlined className="text-gray-400 cursor-pointer" />
          }
          className="rounded-full bg-gray-100 border-0"
        />
        <Button 
          type="primary" 
          shape="circle" 
          icon={<SendOutlined />} 
          onClick={sendMessage} 
          className="ml-2 flex items-center justify-center"
          style={{ backgroundColor: '#4CAF50' }}
        />
      </div>
    </div>
  );
};
 
export default AIConsultation;