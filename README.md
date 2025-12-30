# 账单管理系统

一个功能完整的Web端账单管理系统，基于LeanCloud云存储，提供账单查询、生成、统计、导入导出等功能。

## 🌟 主要功能

### 🔐 用户认证
- 安全的登录系统，基于LeanCloud用户管理
- 记住登录状态功能
- 自动token验证和过期处理

### 📊 账单管理
- **账单查询**：支持按日期范围、状态、公司名称等多条件筛选
- **账单生成**：基于报关数据自动生成账单
- **账单统计**：实时显示总金额、未确认金额、已确认金额等统计信息
- **分页显示**：支持自定义每页显示条数（10/50/100条）

### 📋 报关数据管理
- 按年份、月份、公司名称查询报关数据
- 支持按品名、国家等条件筛选
- 数据已使用状态管理，避免重复使用

### 💰 费用管理
- 预设费用项目：报关费、代理费、其他费用1、其他费用2
- 自定义费用项目：支持动态添加和删除自定义费用
- 费用应用到选中项目
- 实时费用预览和计算

### 📈 数据导入导出
- **Excel导出**：支持账单列表、账单详情导出为Excel文件
- **PDF导出**：支持生成PDF格式的账单详情
- **发票管理**：支持上传和管理发票附件
- **批量导入**：支持Excel文件批量导入账单数据

## 🛠️ 技术栈

### 前端技术
- **HTML5 + CSS3**：现代化的界面设计
- **JavaScript ES6+**：核心业务逻辑实现
- **Bootstrap 5**：响应式UI框架
- **Font Awesome 6**：图标库

### 第三方库
- **LeanCloud Storage**：云数据库和用户认证
- **Flatpickr**：日期选择器
- **XLSX.js**：Excel文件处理

### 数据库
- **LeanCloud**：云端NoSQL数据库
- _User 表：用户管理
- CustomsData 表：报关数据存储
- Bills 表：账单数据存储
- _Files 表：文件存储（发票等）

## 🚀 快速开始

### 环境要求
- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 稳定的网络连接

### 安装部署

#### 方法一：直接使用
1. 下载项目文件到本地
2. 用浏览器打开 `index.html` 文件
3. 使用LeanCloud账户登录系统

#### 方法二：Web服务器部署
1. 将项目文件上传到Web服务器
2. 确保服务器支持HTTPS（LeanCloud要求）
3. 访问部署的URL

#### 方法三：GitHub Pages部署
1. Fork本项目到您的GitHub账户
2. 在仓库设置中启用GitHub Pages
3. 选择源分支和文件夹
4. 通过GitHub Pages URL访问

### 配置说明

#### LeanCloud配置
系统默认使用测试环境的LeanCloud配置：
```javascript
AV.init({
    appId: '***',
    appKey: '***',
    serverURL: '***'
});
```

**⚠️ 安全提醒**：
- 生产环境请使用您自己的LeanCloud应用配置
- 不要将敏感信息暴露在客户端代码中
- 建议通过环境变量或配置文件管理敏感信息

## 📖 使用指南

### 登录系统
1. 访问系统URL
2. 输入有效的LeanCloud用户名和密码
3. 可选择"记住我"选项
4. 点击登录按钮

### 账单查询
1. 在主页面设置查询条件
2. 可选择日期范围、账单状态、公司名称
3. 点击"查询"按钮获取结果
4. 使用分页控件浏览数据

### 生成账单
1. 点击"生成账单"按钮
2. 选择年份、月份等条件查询报关数据
3. 勾选需要生成账单的数据项
4. 设置各项费用
5. 预览账单并保存

### 导入导出
- **导出Excel**：在账单列表页面点击"导出"按钮
- **导出PDF**：在账单详情页面点击PDF导出按钮
- **上传发票**：在账单详情页面添加发票附件

## 📁 项目结构

```
-bill/
├── index.html          # 主应用文件（包含HTML、CSS、JavaScript）
├── README.md           # 项目说明文档
└── .gitignore          # Git忽略文件配置
```

## 🔧 开发说明

### 代码结构
本项目采用单文件架构，所有功能集中在`index.html`中：

```javascript
// 主要功能模块
- 用户认证模块
- 账单管理模块  
- 报关数据模块
- 费用计算模块
- 导入导出模块
- UI交互模块
```

### 数据模型

#### 账单数据结构
```javascript
{
    billNumber: String,      // 账单号
    companyName: String,     // 公司名称
    billDate: Date,         // 账单日期
    totalAmount: Number,    // 总金额
    status: String,         // 状态（未确认/已确认）
    customsFee: Number,     // 报关费
    agentFee: Number,       // 代理费
    otherFee1: Number,      // 其他费用1
    otherFee2: Number,      // 其他费用2
    customFees: Array,      // 自定义费用
    items: Array,          // 账单明细
    attachments: Array     // 附件
}
```

#### 报关数据结构
```javascript
{
    containerNo: String,    // 柜号
    country: String,        // 国家
    productName: String,   // 品名
    quantity: Number,      // 数量
    company: String,        // 公司
    date: Date,            // 日期
    isUsed: Boolean       // 是否已使用
}
```

## 🐛 常见问题

### Q: 登录失败怎么办？
A: 请检查用户名和密码是否正确，确认LeanCloud服务是否正常。

### Q: 数据导出失败？
A: 检查浏览器是否允许下载，确保网络连接稳定。

### Q: 页面加载慢？
A: 可能是网络问题，建议检查CDN资源加载情况。

### Q: 如何备份数据？
A: 可以通过导出功能定期备份重要数据到本地。

## 🔒 安全说明

- 所有数据传输通过HTTPS加密
- 用户密码不会在前端存储
- 建议定期更改登录密码
- 生产环境请使用独立的LeanCloud应用

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目：

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 GitHub Issue
- 发送邮件至项目维护者

## 🙏 致谢

感谢以下开源项目和服务：

- [LeanCloud](https://www.leancloud.cn/) - 云存储服务
- [Bootstrap](https://getbootstrap.com/) - UI框架
- [Flatpickr](https://flatpickr.js.org/) - 日期选择器
- [XLSX.js](https://github.com/SheetJS/sheetjs) - Excel处理库
- [Font Awesome](https://fontawesome.com/) - 图标库
