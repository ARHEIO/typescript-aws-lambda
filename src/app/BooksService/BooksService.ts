const axios = require('axios');

export class BooksService {
  constructor() {
    
  }
public async searchForBooks(searchItem: string){
    return axios.get(`http://openlibrary.org/search.json?q=${searchItem}`)
  }
}