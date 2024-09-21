import express from 'express'
import dotenv from 'dotenv'
import connectDatabase from './database/connectDatabase.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'

import authRoute from './Router/authRoute.js'
import userRoute from './Router/userRoute.js'


const app = express()

const __dirname = path.resolve();
dotenv.config()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.use('/api/authUser', authRoute);
app.use('/api/user', userRoute)


app.use(express.static(path.join(__dirname, "/Frontend/dist")))
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
})

connectDatabase()
// connectCloudinary()
app.listen(PORT, () => {
    
    console.log(`server running on port : ${PORT}`)
})