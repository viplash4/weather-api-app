import { Connection, Channel } from 'amqplib';
export interface RabbitMqConnection {
    connection: Connection;
    channel: Channel;
}
