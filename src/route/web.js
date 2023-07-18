const express = require('express')
import homeController from '../controller/homeController'
import multer from 'multer'

let router = express.Router()
let initWebRoute = (app) => {
    
    router.get('/home', homeController.getInput)
    router.get('/booking',homeController.getBooking)

    router.get('/CRUD',homeController.getCRUD)
    router.post('/post-crud',homeController.postCRUD)
    router.get('/get-crud',homeController.getDisplayCRUD)

    router.get('/delete-user', homeController.deleteUser)

    router.get('/login-user', homeController.logInUser)
    router.get('/logout-user', homeController.logOutUser)
    router.post('/login', homeController.postLogin)
    router.get('/', homeController.getHomePage)
    
    router.get('/edit',homeController.editStadium)
    router.get('/delete-stadium',homeController.deleteStadium)

    router.post('/create-stadium',homeController.createStadium)

    router.post('/book-stadium', homeController.bookingStadium)

    router.get('/revenue', homeController.getRevenue)

    
    return app.use('/', router)
}

export default initWebRoute