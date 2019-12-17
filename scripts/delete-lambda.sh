#!/bin/bash

lambdaName=${PWD##*/}

echo "Deleting lambda $lambdaName"
aws lambda delete-function --function-name $lambdaName
echo "Finished deleting lambda $lambdaName"

attachedPolicies=$( aws iam list-attached-role-policies --role-name $lambdaName )
echo "The following policies are attached" $( echo $attachedPolicies | jq -c '.AttachedPolicies' )

for row in $( echo $attachedPolicies | jq -c '.AttachedPolicies[]' ) ; do
    policy=$( echo $row | jq -r '.PolicyArn' )
    echo "Deleting policy" $policy "from role" $lambdaName
    aws iam detach-role-policy --role-name $lambdaName --policy-arn $policy
done
echo "Finished detaching policies from role $lambdaName"

echo "Deleting role $lambdaName"
aws iam delete-role --role-name $lambdaName
echo "Finished role $lambdaName"