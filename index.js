const Kafka = require('node-rdkafka');
const decoder = new TextDecoder();

const consumer = new Kafka.KafkaConsumer(
    {
        'bootstrap.servers': process.env.BOOTSTRAP_SERVERS,
        'sasl.username': process.env.API_KEY,
        'sasl.password': process.env.API_SECRET,
        'security.protocol': "SASL_SSL",
        'sasl.mechanisms': "PLAIN",
        'group.id': 'nodejs-consumers'
    }, 
    {
        'auto.offset.reset': 'latest'
    }
);

consumer.connect();
consumer.on('ready', () => {
    consumer.subscribe(['stocks']);
    consumer.consume();
})

consumer.on('data', (data) => {
    console.log(decoder.decode(data.value));
})