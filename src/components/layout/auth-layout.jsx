import React from 'react';
import { motion } from 'framer-motion';
import { MotionLogo, MotionTitle, MotionSubtitle } from '../ui/motion';

export const AuthLayout = ({ 
  children, 
  title, 
  subtitle, 
  showLogo = true,
  className = '',
  hideHeader = false,
  ...props 
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col" {...props}>
      {/* Gradient header */}
      {!hideHeader && (
        <div className="auth-header">
          {showLogo && (
            <MotionLogo>
              logo
            </MotionLogo>
          )}
          
          {title && (
            <MotionTitle>
              {title}
            </MotionTitle>
          )}
          
          {subtitle && (
            <MotionSubtitle>
              {subtitle}
            </MotionSubtitle>
          )}
        </div>
      )}
      
      {/* Main content */}
      <div className={`auth-container ${hideHeader ? '' : '-mt-6'} ${className}`}>
        <div className="bg-white rounded-t-2xl shadow-card p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export const AuthTabLayout = ({ 
  children, 
  activeTab, 
  onChangeTab,
  tabs = [
    { key: 'login', label: '登录' },
    { key: 'register', label: '注册' }
  ],
  className = '',
  ...props 
}) => {
  return (
    <div className={className} {...props}>
      {/* Tab navigation */}
      <div className="tab-base mx-auto max-w-[220px] mb-8">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? 'tab-active' : 'tab-inactive'} w-1/2`}
            onClick={() => onChangeTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const AuthCard = ({ 
  children, 
  title,
  className = '',
  ...props 
}) => {
  return (
    <div className={`p-6 bg-white rounded-lg shadow-card ${className}`} {...props}>
      {title && (
        <h2 className="text-lg font-bold mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
}; 