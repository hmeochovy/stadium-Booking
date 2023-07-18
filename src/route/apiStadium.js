const express = require('express')
import ApicontrollerStadium from '../controller/ApicontrollerStadium'
import multer from 'multer'

let router = express.Router()
let initApiStadium = (app) => {
    router.get('/', ApicontrollerStadium.getHomePage1)
    router.post('/create-stadium', ApicontrollerStadium.createStadium)
    router.delete('/delete', ApicontrollerStadium.deleteStadium)
    router.put('/update-stadium', ApicontrollerStadium.updateStadium)
    router.get('/total', ApicontrollerStadium.totalStadium)
    return app.use('/api/stadium', router)
}


export default initApiStadium