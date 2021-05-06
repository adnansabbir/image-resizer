import amqp from 'amqplib/callback_api';

const CONN_URL = 'amqp://localhost';

let ch: amqp.Channel;
amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel;
    });
});

export const publishToQueue = async (queueName: string, data: any) => {
    ch.sendToQueue(queueName, new Buffer(JSON.stringify(data)));
}

export const listenToQueue = (queueName: string, callBack: any) => {
    amqp.connect(CONN_URL, function (err, conn) {
        conn.createChannel(function (err, channel) {
            channel.consume(queueName, function (msg) {
                    callBack(msg?.content.toString());
                }, {noAck: true}
            );
        });
    });
}

process.on('exit', (code) => {
    ch.close((err) => {
        console.log('Error closing channel');
    });
    console.log(`Closing rabbitmq channel`);
});


