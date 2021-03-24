import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";
import { v4 as uuidv4 } from 'uuid';
const https = require('https')

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const generateInitialStatement = (response: Record<string, unknown>) => {
  let res = JSON.parse(JSON.stringify(response.data));
  let initialStatement = {
      "id" : uuidv4(), // Unique Statement Id
      "actor": { 
          "name": res.userName,
          "mbox": "mailto:"+res.userEmail,
          "objectType": "Agent"
      },
      "verb": {
          "id": "https://sample-lrs-vehensi.lrs.io/xapi/verbs/"+res.verb,
          "display": {
              'en-US':res.verb
          }
      },
      "context": {
          "registration": "e168d6a3-46b2-4233-82e7-66b73a179727", // It'll be fixed  id..
          "contextActivities": {
          }
      },
      "object": {
          "id": "https://sample-lrs-vehensi.lrs.io/xapi/activity/e-learning/"+res.applicationName, 
          "definition": {
              "name": {
                  "en-US": res.applicationName
              },
              "description": { 
                  "en-US": res.discription
              },
              "type": "https://sample-lrs-vehensi.lrs.io/xapi/course"
          },
          "objectType": "Activity"
      },
      "version"	: "1.0.0",
  };
  let result = postStatementOnLrs(JSON.parse(JSON.stringify(initialStatement)));
  if(result.statusCode){
    return {
      statusCode: 200,
      message: "Statement Sent Successfully",
      body: result.body
    }
  }else{
    //Write a fuction to Store raw statement for requesting it again ...
    return {
      statusCode: 400,
      message: "Error while sending statement !",
      body: result.body
    }
  }
  
}

export const postStatementOnLrs = (response: Record<string, unknown>) => {
  // return response;
  // let res = JSON.parse(JSON.stringify(response.data));
  
  // const data = JSON.stringify({
  //   todo: 'Buy the milk'
  // })
  
  // const options = {
  //   hostname: 'https://sample-lrs-vehensi.lrs.io/xapi',
  //   path: '/statements',
  //   method: 'POST',
  //   auth: {
  //     username: 'vamegc',
  //     password: 'pitkav'
  // },
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Content-Length': data.length
  //   }
  // }
  
  // // const options = {
  // //   hostname: 'whatever.com',
  // //   port: 443,
  // //   path: '/todos',
  // //   method: 'POST',
  // //   headers: {
  // //     'Content-Type': 'application/json',
  // //     'Content-Length': data.length
  // //   }
  // // }
  
  // const req = https.request(options, res => {
  //   console.log(`statusCode: ${res.statusCode}`)
  
  //   res.on('data', d => {
  //     process.stdout.write(d)
  //   })
  // })
  
  // req.on('error', error => {
  //   console.error(error)
  // })
  
  // req.write(data)
  // req.end()
  
  return {
    statusCode: 200,
    body: JSON.parse(JSON.stringify(response))
  }
}

