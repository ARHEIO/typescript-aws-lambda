/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import cloneDeep = require('lodash/cloneDeep')
import { BooksService } from "../app/BooksService/BooksService";
import { ProxyRequest } from "../app/proxy-request.model";
import { HttpResponse } from 'aws-sdk';
import { DynamoService } from '../app/DatabaseService/DynamoService';

let dynamoService: DynamoService;

export const handler = async(event: ProxyRequest) => {
  return new Promise(async resolve => {
    const response = {
      statusCode: 200,
      body: '',
    };
    const params = event.queryStringParameters;
    if (params && params.q && params.q !== "") {
      try {
        const firstItem = await dynamoService.getList(params.q);
        response.body = JSON.stringify(cloneDeep(firstItem));
      } catch (error) {
        response.body = error;
      }
    } else {
      response.statusCode = 400;
      response.body = JSON.stringify({ message: "incorrect params" })
    } 

    resolve(response);
  })
}


const init = () => {
  console.log("I do things before you run the function")
  const settings = process.env.NODE_ENV != 'prodiction'
  ? { endpoints: { dynamo: "https://dynamodb.ap-southeast-2.amazonaws.com" } }
  : { endpoints: { dynamo: "http://localhost:8000" } };
  dynamoService = new DynamoService(settings);
}

init();