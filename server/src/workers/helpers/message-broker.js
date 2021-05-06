const amqp = require('amqplib/callback_api');
const CONN_URL = 'amqp://localhost';
const listenToQueue = (queueName, callBack) => {
    amqp.connect(CONN_URL, function (err, conn) {
        conn.createChannel(function (err, channel) {
            channel.consume(queueName, function (msg) {
                    callBack(msg.content.toString());
                }, {noAck: true}
            );
        });
    });
}

let ch;
amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel;
    });
});

const publishToQueue = async (queueName, data) => {
    ch.sendToQueue(queueName, new Buffer(JSON.stringify(data)));
}

module.exports = {listenToQueue, publishToQueue};
