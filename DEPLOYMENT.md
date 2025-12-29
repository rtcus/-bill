# 部署指南

## 🚀 GitHub部署步骤

### 方法一：GitHub Pages部署（推荐）

#### 1. 创建GitHub仓库
1. 登录 [GitHub](https://github.com)
2. 点击右上角的 "+" 号，选择 "New repository"
3. 仓库名称建议：`bill-management-system`
4. 选择 "Public"（公开仓库才能使用免费的GitHub Pages）
5. 不要勾选 "Add a README file"（我们已经有了）
6. 点击 "Create repository"

#### 2. 推送代码到GitHub
在项目目录中执行以下命令：

```bash
# 添加远程仓库（请替换YOUR_USERNAME为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/bill-management-system.git

# 推送到GitHub
git push -u origin master
```

#### 3. 启用GitHub Pages
1. 在GitHub仓库页面，点击 "Settings" 标签
2. 在左侧菜单中找到 "Pages"
3. 在 "Source" 部分选择：
   - Branch: `master`
   - Folder: `/ (root)`
4. 点击 "Save"
5. 等待几分钟，GitHub会生成网站
6. 访问地址：`https://YOUR_USERNAME.github.io/bill-management-system/`

### 方法二：GitHub Desktop部署

#### 1. 使用GitHub Desktop
1. 安装 [GitHub Desktop](https://desktop.github.com/)
2. 选择 "Add an Existing Repository from your hard drive"
3. 选择项目文件夹
4. 点击 "Publish repository"
5. 填写仓库名称和描述
6. 选择 "Public"
7. 点击 "Publish repository"

#### 2. 启用GitHub Pages
同方法一的步骤3

### 方法三：命令行部署（完整流程）

```bash
# 1. 配置Git用户信息（首次使用）
git config --global user.name "您的姓名"
git config --global user.email "您的邮箱"

# 2. 初始化仓库（如果还没有）
git init
git add .
git commit -m "Initial commit: 账单管理系统"

# 3. 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/bill-management-system.git

# 4. 推送代码
git push -u origin master

# 5. 后续更新代码
git add .
git commit -m "更新内容描述"
git push
```

## 🔧 部署后配置

### 1. 自定义域名（可选）
如果需要使用自定义域名：

1. 在仓库根目录创建 `CNAME` 文件
2. 写入您的域名，例如：`www.yourdomain.com`
3. 提交并推送CNAME文件
4. 在域名服务商处配置DNS解析

### 2. HTTPS配置
GitHub Pages自动提供HTTPS，无需额外配置。

### 3. 自定义404页面（可选）
可以创建自定义的404页面来提升用户体验。

## 🌐 其他部署平台

### Netlify部署
1. 访问 [Netlify](https://www.netlify.com/)
2. 拖拽项目文件夹到部署区域
3. 获取部署URL

### Vercel部署
1. 访问 [Vercel](https://vercel.com/)
2. 连接GitHub账户
3. 导入项目仓库
4. 自动部署

### Surge.sh部署
```bash
# 安装surge
npm install -g surge

# 部署
cd 项目目录
surge
```

## ⚠️ 注意事项

### 安全配置
**重要**：当前的LeanCloud配置是测试环境，生产环境需要：

1. 创建自己的LeanCloud应用
2. 修改 `index.html` 中的配置：
```javascript
AV.init({
    appId: '您的AppId',
    appKey: '您的AppKey', 
    serverURL: 'https://您的ServerURL'
});
```

### 域名和HTTPS
- LeanCloud要求HTTPS环境
- GitHub Pages自动提供HTTPS
- 自定义域名需要配置SSL证书

### 性能优化
- 图片和文件可以放在CDN
- 考虑使用Service Worker缓存
- 压缩和优化资源文件

## 📞 部署问题排查

### 常见问题
1. **页面无法加载**：检查GitHub Pages是否已启用
2. **资源404**：确认文件路径和大小写
3. **LeanCloud连接失败**：检查网络和配置
4. **登录失败**：确认用户数据和权限

### 调试方法
1. 使用浏览器开发者工具查看控制台错误
2. 检查Network面板的请求状态
3. 验证LeanCloud服务状态

## 🔄 持续更新

部署后，每次代码更新：

```bash
git add .
git commit -m "更新描述"
git push
```

GitHub Pages会在几分钟内自动更新网站。

---

## 🎉 完成！

按照以上步骤，您的账单管理系统就可以成功部署到GitHub并在线访问了！

如有问题，请查看：
- GitHub Pages文档
- LeanCloud文档  
- 本项目的README.md