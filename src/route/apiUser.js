const express = require('express')
import Apicontroller from '../controller/Apicontroller'
import multer from 'multer'

let router = express.Router()
let initApiRoute = (app) => {
    router.get('/', Apicontroller.getHomePage)
    router.post('/create-user', Apicontroller.createUser)
    router.delete('/delete', Apicontroller.deleteUser)
    router.put('/update-user', Apicontroller.updateUser)
    return app.use('/api/user', router)
}


export default initApiRoute