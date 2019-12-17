/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { fakeServiceGet } from "./fakeService";

import DynamoDB from "aws-sdk/clients/dynamodb";

interface LambdaEvent {
  key1: string;
}

let dynamo: DynamoDB;

exports.handler = async(event: LambdaEvent) => {
  console.log("I'm the db endpoint", dynamo.config.endpoint);
  const response = {
    statusCode: 200,
    body: '',
  };
  response.body = await fakeServiceGet(dynamo, event.key1).catch(e => {
    response.statusCode = 404;
    return e;
  });
  response.body = JSON.stringify(response.body);
  return response;
}


const init = () => {
  console.log("I do things before you run the function")
  dynamo = new DynamoDB({
    region: "ap-southeast-2",
    endpoint: "http://localhost:8000"
  });
}

init();