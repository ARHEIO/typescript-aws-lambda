/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import DynamoDB from "aws-sdk/clients/dynamodb";
import cloneDeep = require('lodash/cloneDeep')

import { fakeServiceGet } from "../common/fakeService";
import { ProxyRequest } from "../common/models/proxy-request.model";

let dynamo: DynamoDB;

export const handler = async(event: ProxyRequest) => {
  return new Promise(async resolve => {
    const response = {
      statusCode: 200,
      body: '',
    };
    const params = event.queryStringParameters;
    if (params && params.q && params.q !== "") {
      try {
        const firstItem = await fakeServiceGet(dynamo, params.q);
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
  dynamo = new DynamoDB({
    region: "ap-southeast-2",
    endpoint: "https://dynamodb.ap-southeast-2.amazonaws.com"
    // endpoint: "http://localhost:8000"
  });
}

init();