import AWS from 'aws-sdk';

AWS.config.getCredentials(function (err) {
    if (err) throw new Error('Error getting aws config');
});
AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3();

async function getSignedUrl(key: string) {
    return new Promise((resolve, reject) => {
        let params = {Bucket: 'im-homework', Key: key};
        s3.getSignedUrl('putObject', params, (err, url) => {
            if (err) reject(err);
            resolve(url);
        });
    });
}

async function getSignedUrls(keys: string[]) {
    const urls = [];
    for (let key of keys) {
        const signedUrl = await getSignedUrl(key);
        urls.push({
            fileName: key,
            url: signedUrl
        });
    }
    return urls;
}

export {getSignedUrls};
