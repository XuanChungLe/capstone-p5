# capstone-p5 notes-app-serverless
https://kd85jjuekh.execute-api.us-east-1.amazonaws.com/dev

Service Information

service: notes-app-serverless

stage: dev

region: us-east-1

stack: notes-app-serverless-dev

resources: 62

api keys:
  None
  
endpoints:

  GET - https://kd85jjuekh.execute-api.us-east-1.amazonaws.com/dev/notes
  
  POST - https://kd85jjuekh.execute-api.us-east-1.amazonaws.com/dev/notes
  
  PATCH - https://kd85jjuekh.execute-api.us-east-1.amazonaws.com/dev/notes/{noteId}
  
  DELETE - https://kd85jjuekh.execute-api.us-east-1.amazonaws.com/dev/notes/{noteId}
  
  POST - https://kd85jjuekh.execute-api.us-east-1.amazonaws.com/dev/notes/{noteId}/attachment
  
functions:

  Auth: notes-app-serverless-dev-Auth
  
  GetNotes: notes-app-serverless-dev-GetNotes
  
  CreateNote: notes-app-serverless-dev-CreateNote
  
  UpdateNote: notes-app-serverless-dev-UpdateNote
  
  DeleteNote: notes-app-serverless-dev-DeleteNote
  
  GenerateUploadUrl: notes-app-serverless-dev-GenerateUploadUrl
  
layers:
  None

Stack Outputs

GenerateUploadUrlLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:691015619553:function:notes-app-serverless-dev-GenerateUploadUrl:3

GenerateUploadUrlLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:691015619553:function:notes-app-serverless-dev-GenerateUploadUrl:3

EnterpriseLogAccessIamRole: arn:aws:iam::691015619553:role/notes-app-serverless-dev-EnterpriseLogAccessIamRol-1CMZ9B1X5DG6D

CreateNoteLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:691015619553:function:notes-app-serverless-dev-CreateNote:4

GetNotesLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:691015619553:function:notes-app-serverless-dev-GetNotes:4

DeleteNoteLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:691015619553:function:notes-app-serverless-dev-DeleteNote:3

UpdateNoteLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:691015619553:function:notes-app-serverless-dev-UpdateNote:3

ServiceEndpoint: https://kd85jjuekh.execute-api.us-east-1.amazonaws.com/dev

ServerlessDeploymentBucketName: notes-app-serverless-dev-serverlessdeploymentbuck-88cy4fsets3t
