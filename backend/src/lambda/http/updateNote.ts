import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { updateNote } from '../../businessLogic/notes'
import { UpdateNoteRequest } from '../../requests/updateNoteRequest'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const noteId = event.pathParameters.noteId
    const updatedNote: UpdateNoteRequest = JSON.parse(event.body)
    const userId = getUserId(event);
    const updatedItem = await updateNote(
      {
        userId: userId,
        noteId: noteId,
        createdAt: new Date().toISOString(),
        done: updatedNote.done,
        attachmentUrl: "http://example.com/image.png",
        dueDate: updatedNote.dueDate,
        note: updatedNote.note
      },
      noteId,
      userId
    );

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        item: updatedItem
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
