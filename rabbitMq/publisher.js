const amqp = require('amqplib');
require('dotenv').config()
const url = process.env.RABBITMQ_URL
const exchangeJob = process.env.RABBITMQ_EXCHANGE_JOB;
class Producer {
    channel;
    async createChannel() {
        try {
            const connection = await amqp.connect(url);
            this.channel = await connection.createChannel();
        }
        catch (err) {
            console.log(err)
        }
    }
    async publishMessage(queueKey, message) {
        try {
            if (!this.channel) {
                await this.createChannel();
            }
            await this.channel.assertExchange(exchangeJob, 'direct');
            await this.channel.publish(exchangeJob, queueKey, Buffer.from(JSON.stringify({
                logType: queueKey,
                message
            })));
        }
        catch (err) {
            console.log(err)
        }
    }
}
module.exports = Producer;