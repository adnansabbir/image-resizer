const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({region: 'us-east-1'});
const s3QueueURL = 'https://sqs.us-east-1.amazonaws.com/799513362811/im-homework';
const s3FailedTaskQueueURL = 'https://sqs.us-east-1.amazonaws.com/799513362811/im-homework-failed';
const sqsQueueURL = 'https://sqs.us-east-1.amazonaws.com/799513362811/im-homework';
const s3 = new AWS.S3();
const sqs = new AWS.SQS();

const uploadFileToS3 = async (filePath, fileName) => {
    const fileContent = fs.readFileSync(filePath);
    const params = {
        Bucket: 'im-homework',
        Key: fileName,
        Body: fileContent,
        Tagging: "public=yes"
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) reject(err);
            else {
                resolve(data);
            }
        });
    });
}

const deleteFileFromS3 = async (fileName) => {
    const params = {
        Bucket: 'im-homework',
        Key: fileName
    };

    return new Promise((resolve, reject) => {
        s3.deleteObject(params, (err, data) => {
            if (err) reject(err);
            else {
                resolve(data);
            }
        });
    });
}

const deleteTaskFromSQS = async (ReceiptHandle) => {
    const params = {
        QueueUrl: sqsQueueURL, /* required */
        ReceiptHandle: ReceiptHandle /* required */
    };
    return new Promise((resolve, reject) => {
        sqs.deleteMessage(params, (err, data) => {
            if (err) reject(err); // an error occurred
            else resolve(err);           // successful response
        });
    });
}

const sendFailedResizeTaskToQueue = (data) => {
    const param = {
        MessageBody: JSON.stringify(data),
        QueueUrl: s3FailedTaskQueueURL
    }
    return new Promise((resolve, reject) => {
        sqs.sendMessage(param, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = {AWS, sqsQueueURL, uploadFileToS3, deleteFileFromS3, deleteTaskFromSQS, sendFailedResizeTaskToQueue}
