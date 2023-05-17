const express = require('express')
const path = require('path')
const axios = require('axios')

const app = express()

// static middleware
app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}); 

// get request for all movies
app.get('/api/movies', async (req, res, next) => {
  try {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: '45f96c6',
        s: 'jurassic park'
      }
    });
    res.send(response.data)
  } catch (error) {
    next(error)
  }
})


module.exports = app;

