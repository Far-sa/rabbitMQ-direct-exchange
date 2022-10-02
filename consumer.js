const amqp = require('amqplib')

const getData = async () => {
  const exchangeName = 'directMessage'

  const connection = await amqp.connect('amqp://localhost:5672')
  const channel = await connection.createChannel()
  await channel.assertExchange(exchangeName, 'direct', {})
  const assertedQueue = await channel.assertQueue('', { exclusive: true })
  channel.bindQueue(assertedQueue.queue, exchangeName, 'error')
  channel.consume(assertedQueue.queue, msg => {
    console.log(msg.content.toString())
  })
}
getData()
