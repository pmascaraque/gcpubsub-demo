const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log('listening on port ', port)
})

app.post('/', async (req, res) => {
  const data = (req.body.message)
  try {
    console.log(`Subscription svc: Report ${data} is currently being processed`)
    logSubscription()
    console.log(`Subscription svc: Report number ${data} has been processed`)
    res.status(204).send()
  } catch (error) {
    console.log(`Subscription svc: Report ${data} failed with error: ${error}`)
    res.status(500).send()
  }
})

function logSubscription(){
  console.log('Logging Subscription Function')
}