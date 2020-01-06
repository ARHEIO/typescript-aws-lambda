import { DynamoDB, AWSError } from "aws-sdk";

/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

export class DynamoService {
  dynamo: DynamoDB;

  constructor(config: any) {
    this.dynamo = new DynamoDB({
      region: "ap-southeast-2",
      endpoint: config.endpoints.dynamo
    });
    console.log('endpoint is', this.dynamo.endpoint)
  }

  getItem(key: string): Promise<any> {
    const queryParams = {
      TableName: "typescript-aws-lambda-dev",
      KeyConditionExpression: "id = :uid",
      ExpressionAttributeValues: { ":uid":{"S":key} }
    }
    return new Promise((resolve, reject) => {
      this.dynamo.query(queryParams, (err: AWSError, results: DynamoDB.Types.QueryOutput) => {
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
}