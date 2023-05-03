import * as amqp from 'amqplib';
const queueName = 'trivia-questions';

export const connect = async () => {
    let connection;
    while (!connection) {
        try {
            connection = await amqp.connect('amqp://localhost:5672');
        } catch {
            await wait(2000);
        }
    }

    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    channel.consume(queueName, async (message) => {
        const input = JSON.parse(message.content.toString());
        channel.ack(message);
    });
    console.log(`Waiting for messages...`);
};

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
