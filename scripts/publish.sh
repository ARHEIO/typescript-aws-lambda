#!/bin/bash

# lambdaName=${PWD##*/}

# rm index.zip
# cd dist
# zip -X -r ../index.zip *
# cd ..
serverless deploy
# aws lambda update-function-code --region ap-southeast-2 --function-name $lambdaName --zip-file fileb://index.zip
# rm index.zip