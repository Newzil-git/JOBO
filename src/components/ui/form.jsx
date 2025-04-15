import React from 'react';
import { Form as AntdForm, Input, Button } from 'antd';
import { SafetyOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

// Form input with label
export const FormInput = ({ 
  label, 
  name, 
  placeholder, 
  rules = [], 
  prefix, 
  className = "", 
  ...props 
}) => {
  return (
    <AntdForm.Item
      label={label}
      name={name}
      rules={rules}
      className={`mb-4 ${className}`}
    >
      <div className="input-wrapper">
        <Input 
          placeholder={placeholder}
          prefix={prefix}
          className="input" 
          size="large"
          {...props}
        />
      </div>
    </AntdForm.Item>
  );
};

// Password input
export const FormPassword = ({ 
  label, 
  name, 
  placeholder, 
  rules = [], 
  prefix, 
  className = "", 
  ...props 
}) => {
  return (
    <AntdForm.Item
      label={label}
      name={name}
      rules={rules}
      className={`mb-4 ${className}`}
    >
      <div className="input-wrapper">
        <Input.Password 
          placeholder={placeholder}
          prefix={prefix}
          className="input" 
          size="large"
          {...props}
        />
      </div>
    </AntdForm.Item>
  );
};

// Verification code input with button
export const FormVerificationCode = ({ 
  label, 
  name, 
  placeholder, 
  rules = [], 
  prefix = <SafetyOutlined className="text-gray-400" />, 
  onSendCode, 
  isSending, 
  countdown,
  className = "", 
  ...props 
}) => {
  return (
    <AntdForm.Item
      label={label}
      name={name}
      rules={rules}
      className={`mb-4 ${className}`}
    >
      <div className="flex space-x-2">
        <div className="input-wrapper flex-1">
          <Input 
            placeholder={placeholder || "请输入验证码"}
            prefix={prefix}
            className="input" 
            size="large"
            {...props}
          />
        </div>
        <Button 
          onClick={onSendCode} 
          className={`verification-btn ${isSending ? 'verification-btn-disabled' : ''}`}
          disabled={isSending}
        >
          {isSending ? `${countdown}s` : '获取验证码'}
        </Button>
      </div>
    </AntdForm.Item>
  );
};

// Submit button
export const FormSubmitButton = ({ 
  text, 
  loading, 
  className = "", 
  ...props 
}) => {
  return (
    <Button 
      type="primary" 
      htmlType="submit" 
      block 
      size="large"
      loading={loading}
      className={`btn-primary h-12 ${className}`}
      {...props}
    >
      {text || "提交"}
    </Button>
  );
};

// Secondary button
export const FormSecondaryButton = ({ 
  text, 
  onClick, 
  className = "", 
  ...props 
}) => {
  return (
    <Button 
      block 
      size="large"
      onClick={onClick}
      className={`btn-outline h-12 ${className}`}
      {...props}
    >
      {text}
    </Button>
  );
};

// Form footer
export const FormFooter = ({ 
  children, 
  className = "", 
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className={`form-footer mt-8 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Divider with text
export const FormDivider = ({ 
  text, 
  className = "", 
  ...props 
}) => {
  return (
    <div 
      className={`flex items-center justify-center my-4 ${className}`}
      {...props}
    >
      <div className="flex-grow h-px bg-gray-200"></div>
      <span className="px-4 text-gray-400 text-sm">{text}</span>
      <div className="flex-grow h-px bg-gray-200"></div>
    </div>
  );
};

// Form container
export const FormContainer = ({ 
  children, 
  onFinish, 
  form, 
  layout = "vertical", 
  className = "", 
  ...props 
}) => {
  return (
    <AntdForm
      form={form}
      onFinish={onFinish}
      layout={layout}
      className={`space-y-6 ${className}`}
      {...props}
    >
      {children}
    </AntdForm>
  );
};

// Checkbox with label
export const FormCheckbox = ({ 
  children, 
  checked, 
  onChange, 
  className = "", 
  ...props 
}) => {
  return (
    <div 
      className={`custom-checkbox ${className}`}
      {...props}
    >
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange}
      />
      {children}
    </div>
  );
};

// Form error text
export const FormError = ({ 
  children, 
  className = "", 
  ...props 
}) => {
  return (
    <div 
      className={`text-destructive text-sm mt-1 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Form success text
export const FormSuccess = ({ 
  children, 
  className = "", 
  ...props 
}) => {
  return (
    <div 
      className={`text-primary-500 text-sm mt-1 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}; 