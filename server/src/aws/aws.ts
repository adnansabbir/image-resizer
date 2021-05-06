import AWS from 'aws-sdk';
import {v4 as uuidv4} from 'uuid'
import {SQSMessageBody} from "./models";

AWS.config.getCredentials(function (err) {
    if (err) throw new Error('Error getting aws config');
});
AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3();
const sqs = new AWS.SQS();

async function getPreSignedUrlForUpload(key: string, type: string) {
    return new Promise((resolve, reject) => {
        let params = {Bucket: 'im-homework', Key: key, Tagging: "public=yes", ContentType: type};
        s3.getSignedUrl('putObject', params, (err, url) => {
            if (err) reject(err);
            resolve(url);
        });
    });
}

async function getPreSignedUrlsForUpload(data: { fileName: string, type: string, fileId: string }[]) {
    const urls = [];
    for (let file of data) {
        const signedUrl = await getPreSignedUrlForUpload(file.fileName, file.type);
        urls.push({
            fileName: file.fileName,
            url: signedUrl,
            fileId: file.fileId
        });
    }
    return urls;
}

async function getSignedUrl(fileName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let params = {Bucket: 'im-homework', Key: fileName};
        s3.getSignedUrl('getObject', params, (err, url) => {
            if (err) reject(err);
            resolve(url);
        });
    });
}

async function getSignedUrls(fileNames: string[]) {
    const urls = [];
    for (let fileName of fileNames) {
        const signedUrl = await getSignedUrl(fileName);
        urls.push({
            fileName: fileName,
            url: signedUrl
        });
    }
    return urls;
}

function createResizeTaskAttributes(data: SQSMessageBody): any {
    return {
        Id: uuidv4(),
        MessageBody: JSON.stringify(data)
    }
}

async function sendResizeTaskToQueue(data: SQSMessageBody[]): Promise<any> {
    const param = {
        Entries: data.map(d => createResizeTaskAttributes(d)),
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/799513362811/im-homework'
    }
    return new Promise((resolve, reject) => {
        sqs.sendMessageBatch(param, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
    });
}

export {getPreSignedUrlsForUpload, sendResizeTaskToQueue, getSignedUrl, getSignedUrls};
