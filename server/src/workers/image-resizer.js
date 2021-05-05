const {workerData} = require("worker_threads");
const AWS = require('aws-sdk');
const {getFileFromUrl} = require("./helpers/helpers");
const {Consumer} = require('sqs-consumer');

AWS.config.update({region: 'us-east-1'});
const queueURL = 'https://sqs.us-east-1.amazonaws.com/799513362811/im-homework';



const app = Consumer.create({
    queueUrl: queueURL,
    handleMessage: async (message) => {
        let sqsMessage = JSON.parse(message.Body);
        const filePath = await getFileFromUrl(sqsMessage.fileUrl, sqsMessage.fileName, `${__dirname}/temp/images`);
    },
    sqs: new AWS.SQS()
});

app.on('error', (err) => {
    console.error(err.message);
});

app.on('processing_error', (err) => {
    console.error(err.message);
});

console.log(`Image Resize Worker ${workerData.serial} running`);
app.start();
