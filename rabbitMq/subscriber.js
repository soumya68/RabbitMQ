const amqp = require('amqplib');
require('dotenv').config()
const url = process.env.RABBITMQ_URL;
const exchangeJob = process.env.RABBITMQ_EXCHANGE_JOB;
const newsletterEmailService = require('../service/newsLetterService')
const sendEmailConsumer = async () => {
    try {
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();
        const queueName = "emailSending";
        await channel.assertExchange(exchangeJob, 'direct');
        const q = await channel.assertQueue(queueName, {
            durable: false
        });
        await channel.bindQueue(q.queue, exchangeJob, process.env.RABBITMQ_EMAIL_SEND_JOB);
        await channel.bindQueue(q.queue, exchangeJob, process.env.RABBITMQ_EMAIL_RESEND_JOB);
        channel.consume(q.queue, (msg) => {
            if (msg !== null) {
                const { email, content, name } = JSON.parse(msg.content.toString()).message;
                newsletterEmailService.sendEmail(email, content, name)
            }
        }, { noAck: true });
    }
    catch (err) {
        console.log(err)
    }
}
sendEmailConsumer();
