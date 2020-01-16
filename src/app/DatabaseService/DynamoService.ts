import { DynamoDB, AWSError } from "aws-sdk";
import { IList } from "./models/list.model";

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

  getList(key: string): Promise<any> {
    let buffer = new Buffer(key);
    let base64data = buffer.toString('base64');

    const queryParams = {
      TableName: "bookreviewer-dev",
      KeyConditionExpression: "id = :uid",
      ExpressionAttributeValues: { ":uid":{"S":base64data} }
    }
    return new Promise((resolve, reject) => {
      this.dynamo.query(queryParams, (err: AWSError, results: any) => {
        if (err) {
          console.log(`message='rejected with error' err='${err}'`)
          reject(err);
        } else {
          console.log(`message='retreived item' item='${results.Items}'`)
          const list: IList = Object.assign({}, results.Items[0]);
          resolve(this.mapListObjectToSomethingActuallyUsable(list));
        }
      })
    })
  }

  mapListObjectToSomethingActuallyUsable(list: IList) {
    const usableList = {
      id: list.id.S,
      books: list.books.L.map(listItem => {
        const bookRef = listItem.M.bookid.S;
        const rating = listItem.M.score.S;
        return {
          "bookId": bookRef,
          "rating": rating
        };
      })
    }
    return usableList;

  }
}