#!/usr/bin/env node

/**
 * 构建脚本 - 生成配置文件
 * 使用环境变量替换模板中的占位符
 */

const fs = require('fs');
const path = require('path');

// 默认配置值
const DEFAULT_CONFIG = {
    LEANCLOUD_APP_ID: 'qWTZ0xzNWk9B3bhk3vXGbfPl-gzGzoHsz',
    LEANCLOUD_APP_KEY: 'n1MnTEgdQGWk2jouFA55NF1n',
    LEANCLOUD_SERVER_URL: 'https://api.rtcus.cn',
    API_BASE_URL: '',
    ENVIRONMENT: 'development',
    IS_DEVELOPMENT: 'true',
    APP_VERSION: '1.0.0',
    BUILD_TIME: new Date().toISOString()
};

function buildConfig() {
    try {
        console.log('🔨 开始构建配置文件...');
        
        // 读取模板文件
        const templatePath = path.join(__dirname, 'config.template.js');
        if (!fs.existsSync(templatePath)) {
            throw new Error('配置模板文件不存在: config.template.js');
        }
        
        let configContent = fs.readFileSync(templatePath, 'utf8');
        
        // 替换所有环境变量占位符
        Object.keys(DEFAULT_CONFIG).forEach(key => {
            const envValue = process.env[key] || DEFAULT_CONFIG[key];
            const placeholder = new RegExp(`{{${key}}}`, 'g');
            configContent = configContent.replace(placeholder, envValue);
            console.log(`✓ ${key}: ${envValue}`);
        });
        
        // 写入最终的配置文件
        const outputPath = path.join(__dirname, 'config.js');
        fs.writeFileSync(outputPath, configContent);
        
        console.log('✅ 配置文件生成成功:', outputPath);
        console.log('📅 构建时间:', DEFAULT_CONFIG.BUILD_TIME);
        
        return true;
    } catch (error) {
        console.error('❌ 构建配置文件失败:', error.message);
        return false;
    }
}

function showHelp() {
    console.log(`
📖 使用说明:

设置环境变量:
  export LEANCLOUD_APP_ID="your-app-id"
  export LEANCLOUD_APP_KEY="your-app-key"
  export LEANCLOUD_SERVER_URL="https://your-server-url"
  export ENVIRONMENT="production"

运行构建:
  node build.js

或使用 .env 文件:
  npm install dotenv
  echo "LEANCloud_APP_ID=your-app-id" > .env
  node -r dotenv/config build.js
    `);
}

// 命令行参数处理
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
}

// 执行构建
if (buildConfig()) {
    process.exit(0);
} else {
    process.exit(1);
}