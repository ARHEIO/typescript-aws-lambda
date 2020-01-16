/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import cloneDeep = require('lodash/cloneDeep')

import { ProxyRequest, LambdaEvent } from '../app/proxy-request.model';
import { DynamoService } from '../app/DatabaseService/DynamoService';

let dynamo: DynamoService;

export const handler = async(event: ProxyRequest) => {
  const promise = new Promise(async resolve => {
    const body: LambdaEvent = JSON.parse(event.body);
    const response = {
      statusCode: 200,
      body: '',
    };
    try {
      const firstItem = await dynamo.getList(body.key1);
      response.body = cloneDeep(firstItem);
    } catch (error) {
      response.body = error;
    }
    response.body = JSON.stringify(response.body);
    resolve(response);
  })
  return promise;
}


const init = () => {
  console.log("I do things before you run the function")
  const settings = process.env.NODE_ENV != 'prodiction'
    ? { endpoints: { dynamo: "https://dynamodb.ap-southeast-2.amazonaws.com" } }
    : { endpoints: { dynamo: "http://localhost:8000" } };
  dynamo = new DynamoService(settings);
}

init();