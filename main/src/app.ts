import { 
  APIGatewayProxyEvent, 
  APIGatewayProxyResult 
} from "aws-lambda";


exports.lambdaHandler = async (event: APIGatewayProxyEvent) => {
  const queries = JSON.stringify(event.queryStringParameters);
  console.log(event)
  return {
    statusCode: 200,
    body: `Queries22opol: ${queries}`
  }
};