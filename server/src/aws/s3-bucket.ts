import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid'

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

async function getPreSignedUrlsForUpload(data: { fileName: string, type: string }[]) {
    const urls = [];
    for (let file of data) {
        const signedUrl = await getPreSignedUrlForUpload(file.fileName, file.type);
        urls.push({
            fileName: file.fileName,
            url: signedUrl
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

function createResizeTaskAttributes(fileUrl: string, height: number, width: number): any {
    return {
        Id: uuidv4(),
        MessageAttributes: {
            fileUrl: {
                DataType: 'String',
                StringValue: fileUrl
            },
            height: {
                DataType: 'Number',
                StringValue: height.toString()
            },
            width: {
                DataType: 'Number',
                StringValue: width.toString()
            }
        },
        MessageBody: 'Resize task'
    }
}

async function sendResizeTaskToQueue(data: { fileUrl: string, fileSize: { height: number, width: number } }[]): Promise<any> {
    const param = {
        Entries: data.map(d => createResizeTaskAttributes(d.fileUrl, d.fileSize.height, d.fileSize.width)),
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/799513362811/im-homework'
    }
    return new Promise((resolve, reject) => {
        // resolve(param);
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
