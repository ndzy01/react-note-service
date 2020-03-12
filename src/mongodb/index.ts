/*
 * @Author: ndzy
 * @Date: 2020-03-08 09:39:50
 * @LastEditTime: 2020-03-08 19:33:48
 * @LastEditors: ndzy
 */

// 导入 mongoose 模块
import * as mongoose from 'mongoose'
import config from '../../config'

// 设置默认 mongoose 连接
const DB_URL = config.mongodbUrl
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// 取得默认连接
const db = mongoose.connection

// 连接成功
db.on('connected', function() {
  console.log('MongoDB,连接成功')
})

//
db.on('disconnected', function() {
  console.log('MongoDB,连接断开')
})

// 将连接与错误事件绑定（以获得连接错误的提示）
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'))

export default db
