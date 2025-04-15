/**
 * 职校生生涯规划平台工具函数
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并Tailwind CSS类名，避免冲突
 * @param {string[]} inputs - 类名数组
 * @returns {string} - 合并后的类名
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化手机号码，如：188****8888
 * @param {string} phone - 手机号码
 * @returns {string} - 格式化后的手机号码
 */
export function formatPhone(phone) {
  if (!phone || phone.length !== 11) return phone;
  return `${phone.substring(0, 3)}****${phone.substring(7)}`;
}

/**
 * 生成随机验证码
 * @param {number} length - 验证码长度
 * @returns {string} - 随机验证码
 */
export function generateVerificationCode(length = 6) {
  return Math.random().toString().slice(2, 2 + length);
}

/**
 * 密码强度检测
 * @param {string} password - 密码
 * @returns {object} - 包含强度值和描述
 */
export function checkPasswordStrength(password) {
  if (!password) {
    return { strength: 0, level: '无', color: '#ccc' };
  }
  
  let strength = 0;
  
  // 长度检查
  if (password.length >= 8) strength += 25;
  
  // 包含数字
  if (/\d/.test(password)) strength += 25;
  
  // 包含小写字母
  if (/[a-z]/.test(password)) strength += 25;
  
  // 包含大写字母或特殊字符
  if (/[A-Z]/.test(password) || /[^a-zA-Z0-9]/.test(password)) strength += 25;
  
  // 确定强度级别
  let level = '弱';
  let color = '#FF5722';
  
  if (strength >= 75) {
    level = '强';
    color = '#4CAF50';
  } else if (strength >= 50) {
    level = '中';
    color = '#FFC107';
  }
  
  return { strength, level, color };
}

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间(ms)
 * @returns {Function} - 防抖处理后的函数
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 时间限制(ms)
 * @returns {Function} - 节流处理后的函数
 */
export function throttle(func, limit = 300) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * 本地存储封装
 */
export const storage = {
  set(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },
  get(key) {
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  }
};