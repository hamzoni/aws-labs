#!/bin/bash

aws s3 sync . s3://aws-lab-cloudformation \
  --profile pharos-cross

TEMPLATE_URL=https://aws-lab-cloudformation.s3-us-west-2.amazonaws.com/entry.yml

aws cloudformation update-stack \
  --stack-name $1 \
  --template-url $TEMPLATE_URL \
  --region us-west-2 \
  --profile pharos-cross