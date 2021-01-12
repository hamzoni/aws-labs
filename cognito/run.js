
const AWS = require('aws-sdk');

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:35ae10c4-099e-4133-9360-cf90be7ff1e9',
});

const s3 = new AWS.S3();

 var params = {};
 s3.listBuckets(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
 });