import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    hmr: {
      overlay: false // 关闭错误覆盖层（可选）
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // 添加以下别名确保图标路径解析正确
      '@ant-design/icons/lib/dist$': path.resolve(__dirname, 'node_modules/@ant-design/icons/lib/dist/index.js')
    }
  },
  optimizeDeps: {
    include: [
      '@ant-design/icons',
      '@ant-design/icons/es/icons/UserOutlined',
      '@ant-design/icons/es/icons/LockOutlined',
      '@ant-design/icons/es/icons/SafetyOutlined' // 替换ShieldOutlined为SafetyOutlined
    ],
    // 强制预构建（针对动态导入问题）
    force: true
  }
})