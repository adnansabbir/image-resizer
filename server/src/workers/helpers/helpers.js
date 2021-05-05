const fs = require('fs');
const https = require('https');

const getFileFromUrl = async (url, fileName, saveDir) => {
    return new Promise((resolve, reject) => {
        try {
            const file = fs.createWriteStream(`${saveDir}/${fileName}`);
            https.get(url, (response) => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve(`${saveDir}/${fileName}`);
                });
            })
        } catch (err) {
            reject('Error fetching file')
        }
    });
}

module.exports = {
    getFileFromUrl
}
