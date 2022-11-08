import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getNotesForUser as getNotesForUser } from '../../businessLogic/notes'
import { getUserId } from '../utils';

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("======> getNotes.ts handler() event: ", event);
    const notes = await getNotesForUser(getUserId(event));
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        items: notes
      })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
