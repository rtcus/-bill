/**
 * 配置文件模板
 * 构建时会将环境变量替换为实际值
 */

window.APP_CONFIG = {
    // LeanCloud 配置
    LEANCLOUD_APP_ID: '{{LEANCLOUD_APP_ID}}',
    LEANCLOUD_APP_KEY: '{{LEANCLOUD_APP_KEY}}',
    LEANCLOUD_SERVER_URL: '{{LEANCLOUD_SERVER_URL}}',
    
    // API 配置
    API_BASE_URL: '{{API_BASE_URL}}',
    
    // 环境标识
    ENVIRONMENT: '{{ENVIRONMENT}}',
    IS_DEVELOPMENT: '{{IS_DEVELOPMENT}}',
    
    // 其他配置
    APP_VERSION: '{{APP_VERSION}}',
    BUILD_TIME: '{{BUILD_TIME}}'
};