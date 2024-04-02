const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const swaggerDocs = require('./swagger.js');
const AuthRouter = require('./routes/auth.routes.js')
const EntriesRouter = require('./routes/entries.routes.js')

require('dotenv').config()

const app = express()
const PORT = 8080 || process.env.PORT

app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(cors({ origin: '*', credentials: true, }))


app.use('/auth', AuthRouter)
app.use('/entries', EntriesRouter);
app.use('/', swaggerDocs);



const CONNECTION_URL = process.env.MONGODB_DATABASE_URL

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`App is Listening on PORT:${PORT}`)))
    .catch((error) => console.log(error))

    