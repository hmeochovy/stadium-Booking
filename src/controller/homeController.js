import multer from 'multer'
import db from '../models/index'
import CRUDservice from '../service/CRUDservice'
import e from 'express'
import { where } from 'sequelize';
var nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
let checkLogin = false

const PAGE_SIZE = 8

let getHomePage = async (req, res) => {
    try {
        if (checkLogin == false) {
            return res.redirect('/login-user')
        }
        return res.render('home.ejs')
    } catch (e) {
        console.error(e)
    }
}

let postLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email && password) {
            let isHasUser = await db.User.findOne({
                where: { email: req.body.email }
            })

            if (!isHasUser) {
                console.log(1)
                return res.redirect('/login-user')
            }

            console.log(2)
            bcrypt.compare(password, isHasUser.password, (err, result) => {
                if (result == true) {
                    console.log(3)
                    checkLogin = true
                    return res.redirect('/')
                }
                else {
                    console.log(4)
                    res.redirect('/login-user')
                }
            })

            // return res.render('home.ejs')
        }
        else {
            res.redirect('/login-user')
        }
    }
    catch (e) {
        console.error(e)
    }
}
let getInput = async (req, res) => {
    try {
        var page = req.query.page
        if (page) {
            page = parseInt(page) // lam tron
            const startIndex = (page - 1) * PAGE_SIZE
            const endIndex = page * PAGE_SIZE

            let dataStadium = await db.Stadium.findAll({
                raw: true,
            })
            let result = dataStadium.slice(startIndex, endIndex)
            res.render('stadium.ejs', { data: result })
        }
        else {
            let dataStadium = await db.Stadium.findAll({
                raw: true,
            })
            res.render('booking.ejs', { data: dataStadium })
        }
    } catch (e) {
        console.log(e)
    }
}

let logOutUser = async (req, res) => {
    checkLogin = false
    res.redirect('/login-user')
}
let getCRUD = async (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewuser(req.body)
    return res.redirect('/get-crud')
}

let getDisplayCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser()
    let data_1 = await CRUDservice.getAllUser1()
    return res.render('displayCRUD.ejs', {
        dataTable: data,
        dataTable_1: data_1
    })
}

let deleteUser = async (req, res) => {
    let id = req.query.id
    let deleteSuccess = await CRUDservice.deleteCRUD(id)
    res.redirect('/get-crud')
    if (deleteSuccess) {
        res.send('delete success')
    }
}

let logInUser = async (req, res) => {
    return res.render('login.ejs')
}
let getBooking = async (req, res) => {
    try {
        let stadiumId = req.query.id

        let stadiumInfo = await db.Stadium.findOne({
            where: { id: stadiumId }
        })
        return res.render('booking.ejs', { stadiumInfo: stadiumInfo })
    } catch {
        console.error(e)
    }
}

let editStadium = async (req, res) => {
    if (checkLogin == false) {

        return res.redirect('/login-user')
    }
    let data_1 = await CRUDservice.getAllUser1()
    return res.render('editStadium.ejs', {
        dataTable_1: data_1
    })
}

let deleteStadium = async (req, res) => {
    try {
        await db.sequelize.transaction(async (t) => {

            await db.Stadium.destroy({
                where: { id: req.query.id },
                transaction: t
            })
            return res.redirect('/edit')

        })
    } catch (e) {
        console.error(e)
    }
}

let createStadium = async (req, res) => {
    try {
        await db.sequelize.transaction(async (t) => {
            let isHasStadium = await db.Stadium.findOne({
                where: { name: req.body.name }
            })
            if (isHasStadium || req.body === null) {
                res.redirect('/edit')
            }
            else {
                await db.Stadium.create({
                    name: req.body.name,
                    address: req.body.address,
                    description: req.body.description,
                    image: req.body.image,
                })
                res.redirect('/edit')
            }

        })
    } catch (e) { console.error(e) }
}

let bookingStadium = async (req, res) => {
    try {
        await db.sequelize.transaction(async (t) => {
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'hoangnguyenquoc123@gmail.com',
                    pass: 'obayikhexeytocwk'
                }
            })
            var mailOptions = {
                from: 'hoangnguyenquoc123@gmail.com', 
                to: 'hoangnguyenquoc321@gmail.com',
                subject: 'Đặt sân thành công',
                text: 'today is the good day to win', 
                html: `<br><h1>Bạn đã đặt sân bóng thành công</h1><br><p>Hãy đến sân đúng giờ nhé</p>`
                
            }
            let isHasBooking = await db.Booking.findOne({
                where: { date: req.body.date, time: req.body.time }
            })

            if (isHasBooking) {
                res.redirect(`/booking?id=${req.query.id}`)
            }
            else {
                await db.Booking.create({
                    name: req.body.name,
                    phoneNumber: req.body.phoneNumber,
                    email: req.body.email,
                    date: req.body.date,
                    time: req.body.time,
                    nameStadium: req.body.nameStadium
                })
                transporter.sendMail(mailOptions, function(error, info){ 
                    if(error){
                        console.log(error)
                    }
                    else {
                        console.log('Email sent: ' + info.response)
                    }
                })
                res.redirect('/home?page=1')
            }

        })
    } catch (e) { console.error(e) }
}

let getRevenue = async (req, res) => {
    if (checkLogin == false) {

        return res.redirect('/login-user')
    }
    let data_2 = await CRUDservice.getAllUser2()
    const format = (num) => {
        const n = String(num),
            p = n.indexOf('.') //hàm tìm dấu chấm
        return n.replace(
            /\d(?=(?:\d{3})+(?:\.|$))/g,
            (m, i) => p < 0 || i < p ? `${m}.` : m
        )
    }
    let do_dai = format(data_2.length * 500000)
    return res.render('revenue.ejs', {
        dataTable_2: data_2, do_dai: do_dai
    })
}
module.exports = {
    getHomePage,
    getInput,
    getCRUD,
    postCRUD,
    getDisplayCRUD,
    deleteUser,
    logInUser,
    getBooking,
    postLogin,
    editStadium,
    deleteStadium,
    createStadium,
    logOutUser,
    bookingStadium,
    getRevenue
}