import * as amqp from 'amqplib';

let channel;

export const connectToRabbit = async () => {
    while (!channel) {
        try {
            const connection = await amqp.connect('amqp://localhost:5672');
            channel = await connection.createChannel();
        } catch {
            await wait(500);
        }
    }
    return channel;
};
function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
