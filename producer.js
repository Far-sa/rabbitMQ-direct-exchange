const amqp = require('amqplib')

const sendData = async () => {
  const exchangeName = 'directMessage'

  const connection = await amqp.connect('amqp://localhost:5672')
  const channel = await connection.createChannel()
  await channel.assertExchange(exchangeName, 'direct', {})
  channel.publish(
    exchangeName,
    'error',
    Buffer.from('reading data failed from Database')
  )
  setTimeout(() => {
    connection.close()
    process.exit(0)
  })
}

sendData()
