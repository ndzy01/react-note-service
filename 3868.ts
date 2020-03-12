/*
 * @Author: ndzy
 * @Date: 2020-03-05 08:43:36
 * @LastEditTime: 2020-03-12 16:00:24
 * @LastEditors: ndzy
 */

import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import config from './config'
import router from './src/router'
import db from './src/mongodb/index'

const app = express()

app.use('/', express.static('./public/'))

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(bodyParser.json())
app.use(
  cors({
    origin: config.originUrl, //允许访问
    optionsSuccessStatus: 200,
  })
)
app.use('/', router.routerUtils)

//
app.use('/', router.mongoNote)

app.set('port', process.env.PORT || config.port)

app.listen(app.get('port'), () => {
  db.on('open', () => {
    // console.log('open')
  })
  console.log(`Example app listening on port ${app.get('port')}!`)
})
