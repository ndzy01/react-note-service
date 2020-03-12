/*
 * @Author: ndzy
 * @Date: 2020-03-08 11:27:22
 * @LastEditTime: 2020-03-12 19:57:55
 * @LastEditors: ndzy
 */

import * as express from 'express'
import { Note } from '../mongodb/model/Note'
import randomCode from '../util/randomCode'
import formatData from '../util/formatData'

// var str = '2019-03-18T10:58:37+08:00'

// var date = new Date(str).toJSON()

// var newDate = new Date(+new Date(date) + 8 * 3600 * 1000)
//   .toISOString()
//   .replace(/T/g, ' ')
//   .replace(/\.[\d]{3}Z/, '')

// console.log(newDate) //  2019-03-18 10:58:37

const mongoNote = express.Router()

// 搜索
mongoNote.post('/mongo/note/search', async function(req, res, next) {
  try {
    const content = { $regex: req.body.content }
    const result: any = await Note.find(
      { content },
      { title: 1, noteId: 1, cTime: 1, _id: 0 }
    ).sort({ mTime: -1 })
    res.send({ code: 0, msg: 'ok', data: result })
  } catch (err) {
    res.send({ code: 500, msg: '服务器异常！', data: null })
    console.log(err)
  }
})

// 首页,分页
mongoNote.post('/mongo/note/page', async function(req, res, next) {
  const page = req.body.page
  try {
    const all: any = await Note.find({}, { _id: 1 })
    res.send({
      code: 0,
      msg: 'ok',
      data: await Note.find({}, { title: 1, noteId: 1, cTime: 1, _id: 0 })
        .sort({ mTime: -1 })
        .skip((page - 1) * 9)
        .limit(9),
      maxPage: Math.ceil(all.length / 9),
    })
  } catch (err) {
    res.send({ code: 500, msg: '服务器异常！', data: null })
    console.log(err)
  }
})

// 保存
mongoNote.post('/mongo/note/save', async function(req, res, next) {
  const note = new Note({
    noteId: randomCode(100),
    title: req.body.title,
    content: req.body.content,
    cTime: formatData(new Date()),
    mTime: formatData(new Date()),
  })
  try {
    await note.save()
    res.send({ code: 0, msg: '已成功保存！', data: null })
  } catch (err) {
    res.send({ code: 500, msg: '服务器异常！', data: null })
    console.log(err)
  }
})

// 编辑
mongoNote.post('/mongo/note/edit', async function(req, res, next) {
  try {
    if (req.body.content !== '' && req.body.content) {
      await Note.updateOne(
        { noteId: req.body.noteId },
        {
          title: req.body.title,
          content: req.body.content,
          mTime: formatData(new Date()),
        }
      )
      res.send({ code: 0, msg: '编辑成功', data: null })
    } else {
      res.send({ code: 400, msg: '编辑失败！', data: null })
    }
  } catch (err) {
    res.send({ code: 500, msg: '服务器异常！', data: null })
    console.log(err)
  }
})

// 获取
mongoNote.post('/mongo/note/getNote', async function(req, res, next) {
  try {
    const noteId = req.body.id
    const result: any = await Note.find(
      { noteId },
      { title: 1, _id: 0, content: 1, mTime: 1, noteId: 1 }
    )
    res.send({ code: 0, msg: 'ok', data: result[0] })
  } catch (err) {
    res.send({ code: 500, msg: '服务器异常！', data: null })
    console.log(err)
  }
})

mongoNote.post('/mongo/note/delNote', async function(req, res, next) {
  try {
    const noteId = req.body.id
    await Note.deleteOne({ noteId })
    res.send({ code: 0, msg: '已成功删除！', data: null })
  } catch (err) {
    res.send({ code: 500, msg: '服务器异常！', data: null })
    console.log(err)
  }
})

export default mongoNote
