const fs = require('fs');
const https = require('https');
const sharp = require('sharp');

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

const resizeImage = async (inputFilePath, outputFilePath, height, width) => {
    return new Promise((resolve, reject) => {
        sharp(inputFilePath).resize({height: height, width: width}).toFile(outputFilePath)
            .then(function (newFileInfo) {
                resolve(outputFilePath);
            })
            .catch(function (err) {
                reject(err);
            });
    });
}


module.exports = {
    getFileFromUrl,
    resizeImage
}
