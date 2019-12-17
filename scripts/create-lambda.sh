#!/bin/bash

lambdaName=${PWD##*/}

policyArn="arn:aws:iam::aws:policy/AWSLambdaFullAccess"
echo "Creating a lambda with the name and role $lambdaName"

# Create role for lambda
echo "Creating role $lambdaName"
createRole=$(aws iam create-role \
    --role-name $lambdaName \
    --assume-role-policy-document "{\"Version\": \"2012-10-17\",\"Statement\": [{\"Action\": \"sts:AssumeRole\",\"Effect\": \"Allow\",\"Principal\": {\"Service\": \"lambda.amazonaws.com\"}}]}")

if [ $? -eq 0 ]; then
    echo "Finished creating a role"
else
    echo "Error while creating role"
    exit 1
fi

roleArn=$( echo $createRole | jq -r '.Role.Arn' )
echo "Arn for $lambdaName is $roleArn"

# Create policy and attach to existing role
echo "Attaching default AWSLambdaFullAccess"
attachPolicy=$( aws iam attach-role-policy  \
    --role-name $lambdaName \
    --policy-arn $policyArn )

if [ $? -eq 0 ]; then
    echo "Finished attaching full access lambda policy to role $lambdaName"
else
    echo "Error while attaching policy to role, deleting role"
    echo $( aws iam delete-role --role-name $lambdaName )
    exit 1
fi

echo "Building artefact"
# Build artefact
npm run build
rm index.zip
cd dist
zip -X -r ../index.zip *
cd ..
echo "Finished building artefact"

sleep 5

echo "Creating lambda"
# Uploading artefact to lambda and adding role
lambda=$( aws lambda create-function \
    --function-name $lambdaName \
    --runtime nodejs12.x \
    --handler index.handler \
    --zip-file fileb://index.zip \
    --role $roleArn )

if [ $? -eq 0 ]; then
    echo "Finished creating and uploading artefact to lambda $lambda"
else
    echo "Error while creating lambda, reverting all changes"
    echo $( aws iam detach-role-policy --role-name $lambdaName --policy-arn $policyArn )
    echo $( aws iam delete-role --role-name $lambdaName )
fi

rm index.zip
