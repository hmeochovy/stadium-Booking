const express = require("express") 
import configViewEngine from './configs/ViewEngine'
import initWebRoute from './route/web'
import connectDB from './configs/connectDB'
import bodyParser from 'body-parser'
import initApiRoute from './route/apiUser'
import initApiStadium from './route/apiStadium'
require('dotenv').config()
const app = express()

const port = process.env.PORT || 8081
// lấy từ view engine

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
configViewEngine(app)

// lấy từ web.js
initWebRoute(app)

initApiRoute(app)

initApiStadium(app)
//kết nối đến database
connectDB()

app.listen(port, function(){
    console.log('listen in port 8080')
})