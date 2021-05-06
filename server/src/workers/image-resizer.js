const {listenToQueue, publishToQueue} = require("./helpers/message-broker");
const {
    AWS,
    sqsQueueURL,
    uploadFileToS3,
    deleteFileFromS3,
    deleteTaskFromSQS,
    sendFailedResizeTaskToQueue
} = require("./helpers/aws");
const {workerData} = require("worker_threads");
const {getFileFromUrl, resizeImage} = require("./helpers/helpers");
const {Consumer} = require('sqs-consumer');

const handleSqsResizeTask = async (message) => {
    let {fileUrl, fileName, fileSize: {height, width}} = JSON.parse(message.Body);
    try {
        const filePath = await getFileFromUrl(fileUrl, fileName, `${__dirname}/temp/images`);
        const resizedImagePath = `${__dirname}/temp/images/resized_${fileName}`;
        const resizedFileName = `resized_${fileName}`;

        await resizeImage(filePath, resizedImagePath, height, width)

        await uploadFileToS3(resizedImagePath, resizedFileName);

        await deleteFileFromS3(fileName);

        await deleteTaskFromSQS(message.ReceiptHandle);
    } catch (err) {
        const payload = {
            fileName,
            status: 'Failed'
        }
        await sendFailedResizeTaskToQueue(payload)
    }
}

const app = Consumer.create({
    queueUrl: sqsQueueURL,
    handleMessage: async (message) => {
        // await publishToQueue('worker', 'Received new message');
        // await handleSqsResizeTask(message);
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
