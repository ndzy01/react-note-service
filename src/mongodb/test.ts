/*
 * @Author: ndzy
 * @Date: 2020-03-12 16:03:22
 * @LastEditTime: 2020-03-12 17:05:57
 * @LastEditors: ndzy
 */
import { Note } from './model/Note'
import db from './index'
const i = 1
db.on('open', async function() {
  // .find( { status: "A" }, { item: 1, status: 1 } )
  console.log(
    await Note.find({}, { title: 1, noteId: 1, cTime: 1, _id: 0 })
    .sort({ mTime: -1 })
    .skip((i - 1) * 9)
    .limit(9)
  )

  // console.log(Note.find({}).sort({ mTime: -1 }))
})
