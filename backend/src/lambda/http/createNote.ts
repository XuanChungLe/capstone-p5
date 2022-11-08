import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateNoteRequest } from '../../requests/createNoteRequest'
import { getUserId } from '../utils';
import { createNote } from '../../businessLogic/notes'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newNote: CreateNoteRequest = JSON.parse(event.body)
    const userId = getUserId(event);
    const newItem = await createNote( userId, newNote.dueDate, newNote.note);
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        item: newItem
      })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
