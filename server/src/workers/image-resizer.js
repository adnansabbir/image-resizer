const {workerData} = require("worker_threads");
const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});
const sqs = new AWS.SQS();
const queueURL = 'https://sqs.us-east-1.amazonaws.com/799513362811/im-homework';
console.log(`Worker ${workerData.serial} started`);

function listenToSqs() {
    console.log('listening to sqs');
    const params = {
        AttributeNames: [
            "SentTimestamp"
        ],
        MaxNumberOfMessages: 1,
        MessageAttributeNames: [
            "All"
        ],
        QueueUrl: queueURL,
        WaitTimeSeconds: 20
    };

    sqs.receiveMessage(params, (err, data) => {
        if (err) {
            console.log('An error has occurred', err);
        } else {
            console.log('Message received by ', workerData.serial);
            console.log(data);
        }
    });
}

listenToSqs();
