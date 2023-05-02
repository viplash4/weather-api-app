import { RabbitMqConnection } from './types/RabbitMQConnection';
import * as amqp from 'amqplib';
export const connectToRabbitMQ = async (): Promise<RabbitMqConnection> => {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    return { connection, channel };
};
