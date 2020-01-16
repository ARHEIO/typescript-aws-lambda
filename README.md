# TYPESCRIPT-AWS-LAMBDA

A base repo with a typescript enabled lambda.

It can be written using import statements and typescript, and compiles down to a single javascript file with `handle(event)` exported for the AWS lambda to hook into.

## Setup

### Requires
* An AWS account
* Requires AWS CLI to be installed 
* An IAM account with CLI access
* JQ (https://formulae.brew.sh/formula/jq) install with `brew install jq` 

## Goals
* Provide CRUD functions for a dynamo db
* Provide a script for prepopulating the database
* Provide authentication

## Todo
* Build with environmental files
* Create models for request and response
* Parse the event


# Endpoints

`GET /bookreviewer/books?q=${searchTerm}`

To find books, doesn't require a key or account
Return body includes book ID, required for put


`GET /bookreviewer/list?q=${useremail}` (for now)

Gets a user's booklist


`PATCH /bookreviewer/list`
```
{
  "op": "ADD", // one of "ADD", "CHANGE"
  "location": "{bookId}"
  "value": "{bookRating}" // an integer
}
```
Patches a book in a user list, either adding it, deleting it, or changing it


`DELETE /bookreviewer/list/${bookID}`



# Dynamo Structure


