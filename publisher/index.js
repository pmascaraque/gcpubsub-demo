const express = require('express')
const { PubSub } = require('@google-cloud/pubsub')
const pubsub = new PubSub()
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log('listening on port ', port)
})

app.post('/', async (req, res) => {
  try {
    const data = req.body;
    await publishPubSubMessage(data)
    res.status(204).send()
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

async function publishPubSubMessage(data) {
  const buffer = Buffer.from(JSON.stringify(data))
  await pubsub.topic('topic-demo').publish(buffer)
}