// AI对话页面 - 按照统一UI风格设计

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Button, Avatar, message, Tag, Progress } from 'antd';
import { SendOutlined, PictureOutlined, SmileOutlined, LeftOutlined, AudioOutlined, MoreOutlined } from '@ant-design/icons';

const AIChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef(null);

  // 模拟初始AI消息
  useEffect(() => {
    const initialMessages = [
      { id: 1, sender: 'ai', text: '你好！我是您的智能生涯规划助手，为了能够更好地为您提供服务，我需要了解一些您的基本情况。', time: new Date() },
      { id: 2, sender: 'ai', text: '隐私协议：为了保护您的隐私权益，您提供的所有信息仅用于生成个性化的职业规划建议，不会用于其他商业用途。', time: new Date(), hasPrivacyTag: true },
      { id: 3, sender: 'user', text: '隐私协议已阅读', time: new Date() },
      { id: 4, sender: 'ai', text: '首先，能告诉我您最喜欢的学科和兴趣爱好是什么吗？这有助于我了解您的职业倾向。', time: new Date() },
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
      const lowerInput = inputValue.toLowerCase();
      
      if (lowerInput.includes('数学') || lowerInput.includes('理科')) {
        aiResponse = '你喜欢数学和理科科目，这很好！这些学科培养了你的逻辑思维和分析能力。你对编程或工程类专业有兴趣吗？';
      } else if (lowerInput.includes('语文') || lowerInput.includes('文学')) {
        aiResponse = '你喜欢语文和文学，说明你有较强的语言表达能力。你对传媒、教育或文化类专业有兴趣吗？';
      } else if (lowerInput.includes('英语') || lowerInput.includes('语言')) {
        aiResponse = '你喜欢英语和语言学习，这表明你有较强的沟通能力和国际视野。你对外贸、翻译或国际关系类专业有兴趣吗？';
      } else if (lowerInput.includes('物理') || lowerInput.includes('化学')) {
        aiResponse = '你喜欢物理和化学，这些学科培养了你的实验能力和科学思维。你对工程、医学或材料科学类专业有兴趣吗？';
      } else if (lowerInput.includes('生物') || lowerInput.includes('医学')) {
        aiResponse = '你喜欢生物和医学相关学科，这表明你对生命科学有浓厚兴趣。你对医学、生物技术或环境科学类专业有兴趣吗？';
      } else if (lowerInput.includes('历史') || lowerInput.includes('地理')) {
        aiResponse = '你喜欢历史和地理，这些学科培养了你的人文素养和空间思维。你对考古、旅游或城市规划类专业有兴趣吗？';
      } else if (lowerInput.includes('艺术') || lowerInput.includes('音乐') || lowerInput.includes('美术')) {
        aiResponse = '你喜欢艺术、音乐或美术，这表明你有较强的创造力和审美能力。你对设计、表演或数字媒体类专业有兴趣吗？';
      } else if (lowerInput.includes('体育') || lowerInput.includes('运动')) {
        aiResponse = '你喜欢体育和运动，这表明你有较强的身体素质和团队合作精神。你对体育教育、运动康复或体育管理类专业有兴趣吗？';
      } else if (lowerInput.includes('计算机') || lowerInput.includes('编程')) {
        aiResponse = '你喜欢计算机和编程，这表明你有较强的逻辑思维和技术能力。你对软件开发、人工智能或网络安全类专业有兴趣吗？';
      } else {
        aiResponse = '谢谢分享！你的兴趣爱好很有特色。接下来，你能告诉我你在学校参加过哪些活动或比赛吗？这有助于我了解你的特长和潜力。';
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
          setIsAnalyzing(true);
          const analysisMessage = {
            id: messages.length + 3,
            sender: 'ai',
            text: '正在分析您的学科偏好和兴趣特点，请稍后...',
            time: new Date(),
            isAnalysis: true
          };
          setMessages(prev => [...prev, analysisMessage]);
          
          // 模拟分析完成后显示结果图表
          setTimeout(() => {
            setIsAnalyzing(false);
            const resultMessage = {
              id: messages.length + 4,
              sender: 'ai',
              text: '分析完成！根据您的回答，我们已生成您的能力画像和职业倾向分析。',
              time: new Date(),
              hasCharts: true
            };
            setMessages(prev => [...prev, resultMessage]);
            
            // 延迟跳转，给用户时间阅读最后的消息
            setTimeout(() => {
              navigate('/ability-profile');
            }, 3000);
          }, 3000);
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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 头部 */}
      <div className="gradient-header p-3 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            type="text" 
            icon={<LeftOutlined />} 
            onClick={goBack} 
            className="text-white mr-2"
          />
          <Avatar size={36} className="bg-white text-green-500">AI</Avatar>
          <div className="ml-3">
            <div className="font-medium">你的智能生涯规划顾问</div>
            <div className="text-xs opacity-80">在线</div>
          </div>
        </div>
        <div className="flex">
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
                <Avatar size={36} className="mr-2 mt-1 bg-green-500">AI</Avatar>
              )}
              <div 
                className={`chat-bubble ${message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'} ${message.isAnalysis ? 'relative overflow-hidden' : ''}`}
              >
                {message.text}
                {message.hasPrivacyTag && (
                  <div className="mt-2">
                    <Tag color="green" className="text-xs">隐私保障</Tag>
                    <Tag color="blue" className="text-xs ml-1">数据加密</Tag>
                  </div>
                )}
                {message.isAnalysis && (
                  <div className="mt-4">
                    <Progress percent={75} status="active" strokeColor="#4CAF50" />
                    <div className="flex justify-center space-x-2 mt-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                    </div>
                  </div>
                )}
                {message.hasCharts && (
                  <div className="mt-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-center mb-3 font-medium text-green-600">能力画像分析</div>
                      <div className="relative h-40 mb-3 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-32 h-32">
                            <Progress type="circle" percent={82} strokeColor="#4CAF50" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <div className="w-1/2 pr-1">
                          <div className="h-4 bg-green-200 rounded-full"></div>
                          <div className="text-xs text-center mt-1 text-gray-500">逻辑思维</div>
                        </div>
                        <div className="w-1/2 pl-1">
                          <div className="h-4 bg-blue-200 rounded-full"></div>
                          <div className="text-xs text-center mt-1 text-gray-500">创造能力</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex justify-start mb-4"
            >
              <Avatar size={36} className="mr-2 bg-green-500">AI</Avatar>
              <div className="chat-bubble chat-bubble-ai py-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      {/* 输入区域 */}
      <div className="bg-white border-t border-gray-200 p-3">
        <div className="flex flex-col items-center">
          <div className="flex w-full max-w-md items-center">
            <Input
              placeholder="请输入消息..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              suffix={
                <div className="flex items-center">
                  <SmileOutlined className="text-gray-400 mr-2 cursor-pointer" />
                  <PictureOutlined className="text-gray-400 cursor-pointer" />
                </div>
              }
              className="rounded-full border-gray-300"
            />
            <Button
              type="primary"
              shape="circle"
              icon={<SendOutlined />}
              onClick={sendMessage}
              className="ml-2 bg-green-500 hover:bg-green-600 border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;