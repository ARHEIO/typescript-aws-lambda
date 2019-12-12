/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

export const fakeServiceGet = (key: String): Promise<String> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(`The value of ${key} is "cool boi"`);
      } else {
        reject(`We found nothing associated with ${key}`);
      }
    }, 2000);
  })
}