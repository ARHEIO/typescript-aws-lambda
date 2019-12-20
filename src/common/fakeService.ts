import { DynamoDB, AWSError } from "aws-sdk";

/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

export const fakeServiceGet = (dynamo: DynamoDB, key: string): Promise<any> => {
  const queryParams = {
    TableName: "typescript-aws-lambda-dev",
    KeyConditionExpression: "id = :uid",
    ExpressionAttributeValues: { ":uid":{"S":key} }
  }
  return new Promise((resolve, reject) => {
    dynamo.query(queryParams, (err: AWSError, results: DynamoDB.Types.QueryOutput) => {
      if (err) {
        console.log(`message='rejected with error' err='${err}'`)
        reject(err);
      } else {
        console.log(`message='retreived item' item='${results.Items}'`)
        resolve(results.Items[0]);
      }
    })
  })
}