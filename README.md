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