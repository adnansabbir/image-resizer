const {workerData} = require("worker_threads");

console.log(`I am worker number ${workerData.serial}`);
