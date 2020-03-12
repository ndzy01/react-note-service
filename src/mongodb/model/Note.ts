/*
 * @Author: ndzy
 * @Date: 2020-03-08 10:07:04
 * @LastEditTime: 2020-03-08 14:27:18
 * @LastEditors: ndzy
 */
import { Document, Schema, Model, model } from 'mongoose'

interface MNote extends Document {
  noteId: string
  title: string
  content: string
  cTime: string
  mTime: string
}

const NoteSchema: Schema = new Schema({
  noteId: String,
  title: String,
  content: String,
  cTime: String,
  mTime: String,
})

export const Note: Model<MNote> = model<MNote>('note', NoteSchema)
