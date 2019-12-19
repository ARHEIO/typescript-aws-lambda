/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { fakeServiceGet } from "./fakeService";
import cloneDeep = require('lodash/cloneDeep')

import DynamoDB from "aws-sdk/clients/dynamodb";
import { ProxyRequest, LambdaEvent } from "./models/proxy-request.model";

let dynamo: DynamoDB;

export const handler = async(event: ProxyRequest) => {
  const promise = new Promise(async resolve => {
    const body: LambdaEvent = JSON.parse(event.body);
    const response = {
      statusCode: 200,
      body: '',
    };
    try {
      const firstItem = await fakeServiceGet(dynamo, body.key1);
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
  dynamo = new DynamoDB({
    region: "ap-southeast-2",
    endpoint: "https://dynamodb.ap-southeast-2.amazonaws.com"
    // endpoint: "http://localhost:8000"
  });
}

init();