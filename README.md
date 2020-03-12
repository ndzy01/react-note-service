<!--
 * @Author: ndzy
 * @Date: 2020-03-05 08:07:33
 * @LastEditTime: 2020-03-12 20:15:49
 * @LastEditors: ndzy
 -->

yarn add body-parser cors express mysql nodemailer svg-captcha multer

yarn add @types/body-parser @types/cors @types/express @types/node typescript -D

# 在 config.ts 中配置图片服务的地址

# mongodb

yarn add mongoose
yarn add @types/mongoose @types/mongodb -D

# 服务地址

在 note 笔记里面搜索，服务地址
配置，图片服务和数据库服务地址

# 项目部署

把根目录的 build 文件夹拷贝到 3836 文件夹下面，把该目录下的除了 node_modules 文件夹和 yarn.lock 文件拷贝到服务器，
在服务器运行 yarn install 装包
并用 node ./build/3868.js 启动
