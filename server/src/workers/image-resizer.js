const {workerData} = require("worker_threads");
const AWS = require('aws-sdk');
const {getFileFromUrl, resizeImage} = require("./helpers/helpers");
const {Consumer} = require('sqs-consumer');

AWS.config.update({region: 'us-east-1'});
const queueURL = 'https://sqs.us-east-1.amazonaws.com/799513362811/im-homework';



const app = Consumer.create({
    queueUrl: queueURL,
    handleMessage: async (message) => {
        let {fileUrl, fileName, fileSize: {height, width}} = JSON.parse(message.Body);
        const filePath = await getFileFromUrl(fileUrl, fileName, `${__dirname}/temp/images`);
        const resizedImagePath = await resizeImage(
            filePath,
            `${__dirname}/temp/images/resized_${fileName}`,
            height,
            width
        );
        console.log(resizedImagePath)
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
