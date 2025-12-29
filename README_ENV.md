# 🔐 静态网页敏感信息管理指南

## 问题背景

静态网页无法像服务器端应用那样直接使用环境变量，但我们可以通过构建时配置替换的方式实现类似效果。

## 🛠️ 解决方案

### 方案一：配置模板 + 构建替换（推荐）

我已经为您的项目实现了这个方案：

#### 文件结构
```
-bill/
├── config.template.js    # 配置模板文件
├── build.js             # 构建脚本
├── .env.example         # 环境变量示例
├── package.json         # 项目配置
└── index.html           # 主应用（修改为使用配置）
```

#### 使用步骤

1. **创建环境变量文件**
   ```bash
   # 复制示例文件
   cp .env.example .env
   
   # 编辑 .env 文件，填入实际值
   nano .env
   ```

2. **安装依赖（可选）**
   ```bash
   npm install
   ```

3. **生成配置文件**
   ```bash
   # 开发环境
   node build.js
   
   # 或使用 npm
   npm run build
   
   # 生产环境
   npm run build:prod
   ```

4. **部署**
   ```bash
   # 推送到GitHub
   git add .
   git commit -m "Update configuration"
   git push
   ```

### 方案二：GitHub Actions 自动构建

在GitHub仓库中创建 `.github/workflows/build.yml`：

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Build config
      env:
        LEANCLOUD_APP_ID: ${{ secrets.LEANCLOUD_APP_ID }}
        LEANCLOUD_APP_KEY: ${{ secrets.LEANCLOUD_APP_KEY }}
        LEANCLOUD_SERVER_URL: ${{ secrets.LEANCLOUD_SERVER_URL }}
      run: |
        node build.js
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

然后在GitHub仓库的Settings > Secrets中添加敏感信息。

### 方案三：运行时配置加载

创建一个配置API端点，应用启动时动态加载：

```javascript
// 在应用启动时加载配置
async function loadConfig() {
    try {
        const response = await fetch('/api/config');
        const config = await response.json();
        window.APP_CONFIG = config;
        initializeApp();
    } catch (error) {
        console.error('加载配置失败:', error);
        // 使用备用配置
    }
}

loadConfig();
```

## 🔧 详细实现

### 配置模板 (config.template.js)
```javascript
window.APP_CONFIG = {
    LEANCLOUD_APP_ID: '{{LEANCLOUD_APP_ID}}',
    LEANCLOUD_APP_KEY: '{{LEANCLOUD_APP_KEY}}',
    LEANCLOUD_SERVER_URL: '{{LEANCLOUD_SERVER_URL}}',
    ENVIRONMENT: '{{ENVIRONMENT}}'
};
```

### 构建脚本 (build.js)
```javascript
// 读取模板
let configContent = fs.readFileSync('config.template.js', 'utf8');

// 替换环境变量
Object.keys(DEFAULT_CONFIG).forEach(key => {
    const envValue = process.env[key] || DEFAULT_CONFIG[key];
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    configContent = configContent.replace(placeholder, envValue);
});

// 生成最终配置
fs.writeFileSync('config.js', configContent);
```

### 应用使用配置
```javascript
// 在 index.html 中
<script src="config.js"></script>
<script>
if (window.APP_CONFIG) {
    AV.init({
        appId: window.APP_CONFIG.LEANCLOUD_APP_ID,
        appKey: window.APP_CONFIG.LEANCLOUD_APP_KEY,
        serverURL: window.APP_CONFIG.LEANCLOUD_SERVER_URL
    });
}
</script>
```

## 🌟 优势

### ✅ 安全性
- 敏感信息不提交到版本控制
- 生产环境使用真实配置
- 开发环境使用测试配置

### ✅ 灵活性
- 支持多环境配置
- 构建时动态注入
- 易于维护和更新

### ✅ 兼容性
- 纯前端项目适用
- 不依赖服务器
- 支持所有静态托管平台

## 🚀 部署建议

### 开发环境
```bash
# 使用本地环境变量
export LEANCLOUD_APP_ID="dev-app-id"
export LEANCLOUD_APP_KEY="dev-app-key"
npm run build:dev
```

### 生产环境
```bash
# 使用生产环境变量
export LEANCLOUD_APP_ID="prod-app-id"
export LEANCLOUD_APP_KEY="prod-app-key"
npm run build:prod
```

### GitHub Actions
- 在Repository Secrets中存储敏感信息
- 自动构建和部署
- 配置变更时自动更新

## 🔒 最佳实践

1. **永远不要**将 `.env` 文件提交到版本控制
2. **始终**使用 `.env.example` 作为配置模板
3. **定期**轮换敏感信息的值
4. **使用**不同的开发/生产环境配置
5. **监控**配置变更和构建日志

## 📋 检查清单

- [ ] 创建了 `.env` 文件
- [ ] 设置了正确的环境变量
- [ ] 运行了构建脚本
- [ ] 验证了 `config.js` 生成正确
- [ ] 测试了应用功能
- [ ] 部署到生产环境
- [ ] 验证了生产配置生效

这样，您的静态网页就能安全地管理敏感信息了！🎉