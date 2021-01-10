#!/bin/bash

aws s3 sync . s3://aws-lab-cloudformation \
  --profile pharos-cross

TEMPLATE_URL=https://aws-lab-cloudformation.s3-us-west-2.amazonaws.com/entry.yml

aws cloudformation create-stack \
	--capabilities CAPABILITY_IAM \
	--stack-name $1 \
	--template-body file://./entry.yml \
	--region us-west-2 \
	--profile pharos-cross

  # --template-url $TEMPLATE_URL \


# aws cloudformation create-stack \
# 	--stack-name message-store \
# 	--template-body file://bucket_with_keys.yaml \
# 	--parameters file://cfg_bucket_with_keys.json \
# 	--capabilities CAPABILITY_NAMED_IAM