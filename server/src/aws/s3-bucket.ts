import AWS from 'aws-sdk';

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

async function getSignedUrl(fileName: string) {
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

async function sendResizeTaskToQueue(fileUrl: string, fileSize: { height: number, width: number }): Promise<any> {
    const param = {
        MessageAttributes: {
            fileUrl: {
                DataType: 'String',
                StringValue: fileUrl
            },
            height: {
                DataType: 'String',
                StringValue: fileSize.height.toString()
            },
            width: {
                DataType: 'String',
                StringValue: fileSize.width.toString()
            }
        },
        MessageBody: 'Test task',
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/799513362811/im-homework'
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

export {getPreSignedUrlsForUpload, sendResizeTaskToQueue, getSignedUrl, getSignedUrls};
