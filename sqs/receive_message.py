
import boto3
from botocore.config import Config
from threading import Timer,Thread,Event
import json

boto3.setup_default_session(profile_name='pharos-cross')

my_config = Config(
    region_name = 'us-west-2',
    signature_version = 'v4',
    retries = {
        'max_attempts': 10,
        'mode': 'standard'
    }
)

client = boto3.client('sqs', config=my_config)

def get_messages():
	QueueUrl = 'https://sqs.us-west-2.amazonaws.com/900171207117/taquy'

	response = client.receive_message(
	    QueueUrl=QueueUrl,
	    AttributeNames=[
	        'All'
	    ],
	    MessageAttributeNames=[
	        'All',
	    ],
	    MaxNumberOfMessages=10,
	    VisibilityTimeout=1,
	    WaitTimeSeconds=1,
	)

	if 'Messages' not in response:
		return

	for message in response['Messages']:
		receiptHandle = message['ReceiptHandle'];
		body = message['Body'];

		response = client.delete_message(
		    QueueUrl=QueueUrl,
		    ReceiptHandle=receiptHandle
		)
		print(body)

class MyThread(Thread):
    def __init__(self, event):
        Thread.__init__(self)
        self.stopped = event

    def run(self):
        while not self.stopped.wait(0.5):
            get_messages()

stopFlag = Event()
thread = MyThread(stopFlag)
thread.start()
