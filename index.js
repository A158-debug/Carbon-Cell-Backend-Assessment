const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const AuthRouter = require('./routes/auth.js')

require('dotenv').config()  

const app = express()
const PORT = 8080 || process.env.PORT

app.use(bodyParser.json({limit: '50mb', extended: true}))

app.get('/',(req,res)=>{
    res.send('Hello World!')
})
app.use('/auth', AuthRouter)


const CONNECTION_URL = process.env.MONGODB_DATABASE_URL

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`App is Listening on PORT:${PORT}`)))
    .catch((error) => console.log(error))