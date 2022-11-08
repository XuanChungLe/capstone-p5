import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { NoteItem } from '../models/noteItem'
import { NoteUpdate } from '../models/noteUpdate'
import { AttachmentUtils } from './attachmentUtils'

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('NotesAccess')

// Implement the dataLayer logic

export class NotesAccess {
  constructor(
    private docClient: DocumentClient = createDynamoDBClient(),
    private attachementCtrl : AttachmentUtils = new AttachmentUtils(),
    private notesTable = process.env.NOTES_TABLE
  ) {}

  async persistNote(noteItem: NoteItem) {
    logger.info('Creating a new note item : ', noteItem)

    await this.docClient
      .put({
        TableName: this.notesTable,
        Item: noteItem
      })
      .promise()
    return noteItem;
  }

  async getAllNotes(userId: string) {
    logger.info('Getting all notes for user : ', userId)
    const res = await this.docClient
      .query({
        TableName: this.notesTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        },
        ScanIndexForward: false
      })
      .promise()
    return res.Items as NoteItem[]
  }

  async updateNote(noteId: string, userId: string, noteUpdate: NoteUpdate) {
    logger.info('Updating note item : ', { noteId: noteId, userId })
    return await this.docClient
      .update(
        {
          TableName: this.notesTable,
          Key: { userId, noteId: noteId },
          ExpressionAttributeNames: { '#N': 'note' },
          UpdateExpression: 'set #N=:noteNote, dueDate=:dueDate, done=:done',
          ExpressionAttributeValues: {
            ':noteNote': noteUpdate.note,
            ':dueDate': noteUpdate.dueDate,
            ':done': noteUpdate.done
          },
          ReturnValues: 'UPDATED_NEW'
        },
        function (err, data) {
          if (err) {
            const error = JSON.stringify(err, null, 2)
            logger.error('=> Unable to update item. Error JSON:', error)
          } else {
            const updatedItem = JSON.stringify(data, null, 2)
            logger.info('=> Successfully updated note:', updatedItem)
          }
        }
      )
      .promise()
  }

  async deleteNote(noteId: string, userId: string) {
    logger.info('Deleting note item : ', { noteId: noteId, userId })
    return await this.docClient
      .delete({
        TableName: this.notesTable,
        Key: { userId, noteId: noteId }
      })
      .promise()
  }

  async updateAttachmentUrl(
    noteId: string,
    userId: string
  ) {
    const UploadUrl = await this.attachementCtrl.getUploadUrl(noteId);
    const attachementUrl = await this.attachementCtrl.getAttachmentUrl(noteId);
    await this.docClient
      .update(
        {
          TableName: this.notesTable,
          Key: { userId, noteId },
          UpdateExpression: 'set attachmentUrl=:attachmentUrl',
          ExpressionAttributeValues: {
            ':attachmentUrl': attachementUrl
          },
          ReturnValues: 'UPDATED_NEW'
        },
        function (err, data) {
          if (err) {
            const error = JSON.stringify(err, null, 2)
            logger.error('=> Unable to update item. Error JSON:', error)
          } else {
            const updatedItem = JSON.stringify(data, null, 2)
            logger.info('=> Successfully updated note:', updatedItem)
          }
        }
      )
      .promise()
      return UploadUrl;
  }
}


function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}