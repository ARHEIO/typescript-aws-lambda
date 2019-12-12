#!/bin/bash
rm index.zip
cd dist
zip -X -r ../index.zip *
cd ..
aws lambda update-function-code --region ap-southeast-2 --function-name $1 --zip-file fileb://index.zip --profile $2
rm index.zip