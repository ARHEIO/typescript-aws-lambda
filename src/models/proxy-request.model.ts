export interface LambdaEvent {
  key1: string;
}

// https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
export interface ProxyRequest {
  resource: string;
  path: string;
  httpMethod: string;
  queryStringParameters: any;
  multiValueQueryStringParameters: any;
  pathParameters: any;
  body: string;
  isBase64Encoded: false
}