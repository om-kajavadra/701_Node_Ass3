require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const path = require('path')
const cors = require('cors')

const adminRoutes = require('./routes/admin')
const employeeRoutes = require('./routes/employee')

const app = express()

mongoose.connect(process.env.MONGO_URI).then(()=> console.log('Mongo connected'))
  .catch(err=> console.error('Mongo connect error', err))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 4 }
}))

app.use('/admin', adminRoutes)
app.use('/api/employee', employeeRoutes)

app.get('/', (req,res)=> res.send('ERP backend running'))

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> console.log('Server started on', PORT))
