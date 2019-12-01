const express = require('express')

const port = 2019

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`<h1>Running at ${port}</h1>`)
})

app.listen(port, () => {
    console.log(`Running at ${port}`)
})

