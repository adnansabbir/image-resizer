import {Worker} from 'worker_threads';

if (process?.argv.length > 2) {
    const numberOfWorkers = +process.argv[2];
    for (let i = 0; i < numberOfWorkers; i++) {
        new Worker('./src/workers/image-resizer.js', {workerData: {serial: i}});
    }
} else {
    new Worker('./src/workers/image-resizer.js', {workerData: {serial: 0}});
}
