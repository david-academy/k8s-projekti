const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')

const mongoUrl = config.mongoUrl

mongoose.connect(mongoUrl, { useNewUrlParser: true})
.then(result =>{
        console.log('connected to MongoDB')
    })
    .catch((error)=>{
        console.log('error connecting to MongoDB: ', error.message)
    })

app.use(cors())
app.use(bodyParser.json())

app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/login', loginRouter)

module.exports = app


