if (process.env.ENVIRONMENT === 'yap-local') {
    // eslint-disable-next-line import/no-unresolved,no-unused-vars,global-require
    require('dotenv').config();
  }
  
  const config = {
    ENVIRONMENT: process.env.ENVIRONMENT || 'yap-local',
    MICROSERVICE_NAME: process.env.MICROSERVICE_NAME || 'post_crud',
    MICROSERVICE_TYPE: process.env.MICROSERVICE_TYPE || 'com.yapsody.crud-assignment',
    MICROSERVICE_IP: process.env.MICROSERVICE_IP || '0.0.0.0',
    APP_HOST: process.env.APP_HOST || '0.0.0.0',
    APP_PORT: process.env.APP_PORT || '8082',
    SENTRY_PROJECT_DSN: process.env.SENTRY_PROJECT_DSN || '',
    MYSQL_HOST: process.env.MYSQL_HOST || '0.0.0.0',
    MYSQL_USERNAME: process.env.MYSQL_USERNAME || 'root',
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'rootroot',
    MYSQL_DB_NAME: process.env.MYSQL_DB_NAME || 'users',
    MYSQL_PORT: process.env.MYSQL_PORT || 3306,
    AWS_REGION: process.env.REGION || 'ap-south-1',
    AWS_BUCKET_NAME: process.env.NAME || 'yap-post1-uploads',
    SECRET_ACCESS_KEY: process.env.ACCESS_SECRET,
    SECRET_ACCESS_ID: process.env.ACCESS_KEY,
  };
  
  module.exports = config;