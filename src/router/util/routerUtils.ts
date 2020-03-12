/*
 * @Author: ndzy
 * @Date: 2020-02-08 11:51:09
 * @LastEditTime: 2020-03-08 17:27:14
 * @LastEditors: ndzy
 */
import * as express from 'express'
import formatData from '../../util/formatData'
import timeFn from '../../util/timeFn'

const routerUtils = express.Router()
routerUtils.use(function(req, res, next) {
  console.log(`${formatData(new Date())}-----${req.path}-------${req.method}`)
  next()
})

export default routerUtils
