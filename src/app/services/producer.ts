const amqp = require("amqplib");

async function createConnection(uri = 'mqadmin:Mqadmin@localhost:5672') {
  const connection = await amqp.connect('amqp://' + uri);
  return connection;
}

createConnection()
  .then(conn => conn.createChannel())
  .then(ch => {

    const queue = 'messages';
    ch.assertQueue(queue);
    
    setInterval(() => {
      ch.sendToQueue(queue, Buffer.from('Message of exemple'));
    }, 1000)
  })
