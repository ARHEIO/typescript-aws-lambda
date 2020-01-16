import { DynamoDB } from "aws-sdk";


export interface IList extends DynamoDB.Types.AttributeMap {
  books: {
    L: IBookList[]
  },
  id: {
    S: string;
  }
}

interface IBookList {
  M: {
    score: {
      S: string
    },
    bookid: {
      S: string
    }
  }
}