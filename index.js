const express = require('express')
const cors = require('cors')

const publicRouter = require('./src/routers/publicRouter')
const userRouter = require('./src/routers/userRouter')
const adminRouter = require('./src/routers/adminRouter')
const port = 2019

const app = express()
app.use(cors())
app.use(express.json())

app.use(publicRouter)
app.use(userRouter)
app.get('/', (req, res) => {
    
    res.send(`<h1>Running at ${port}</h1>`)
})

app.listen(port, () => {
    console.log(`Running at ${port}`)
})

