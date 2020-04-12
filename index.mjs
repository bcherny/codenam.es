import express from 'express'

const app = express()
  // Serve the client
  .use(express.static('./client/build'))

  // Serve the API
  .get('/api/foo', (req, res) => {
    res.send({data: {x: 'y'}})
  })

  // Listen!
  .listen(8000)
