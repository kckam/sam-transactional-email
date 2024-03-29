import { APIGatewayProxyEvent, Context } from "aws-lambda";
import awsServerlessExpress from "aws-serverless-express";
import app from "./app";
const server = awsServerlessExpress.createServer(app);

exports.lambdaHandler = (event: APIGatewayProxyEvent, context: Context) =>
  awsServerlessExpress.proxy(server, event, context);
