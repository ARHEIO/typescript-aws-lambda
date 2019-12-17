import { DynamoDB, AWSError } from "aws-sdk";

/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

export const fakeServiceGet = (dynamo: DynamoDB, key: string): Promise<any[]> => {
  const queryParams = {
    TableName: "Watchlist",
    KeyConditionExpression: "user_id = :uid",
    ExpressionAttributeValues: { ":uid":{"S":key} }
  }
  return new Promise((resolve, reject) => {
    dynamo.query(queryParams, (err: AWSError, results: DynamoDB.Types.QueryOutput) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.Items);
      }
    })
  })
}