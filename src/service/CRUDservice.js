const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

import db from '../models/index'
// hàm biến password về dạng hash lưu trên db
let createNewuser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcript = await hashUserPassword(data.password)
            // tạo một user mới trong database
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                password: hashPasswordFromBcript,
                email: data.email,
                address: data.address, 
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleID: data.roleID,
            })
            resolve('ok create new user sucsess!')
        }catch(e){
            reject(e)
        }
    })
    
}

let hashUserPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try{
            var hashPassword = await bcrypt.hashSync(password, saltRounds)
            resolve(hashPassword)
        }catch(e){
            reject(e)
        }
    })
}

let getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
                // để lấy dữ liệu gốc khi được gọi đến
            })
            resolve(users)
        }catch(e){
            reject(e)
        }
    })
}

let getAllUser1 = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let stadiums = db.Stadium.findAll({
                raw: true,
                // để lấy dữ liệu gốc khi được gọi đến
            })
            resolve(stadiums)
        }catch(e){
            reject(e)
        }
    })
}
let getAllUser2 = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let book = db.Booking.findAll({
                raw: true,
                // để lấy dữ liệu gốc khi được gọi đến
            })
            resolve(book)
        }catch(e){
            reject(e)
        }
    })
}
let deleteCRUD = (userId) => {
    return new Promise (async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id : userId}
            })
            if (user) {
                user.destroy()
            }
            resolve()
        }catch(e){
            reject(e)
        }
    })
}
module.exports = {
    createNewuser,
    getAllUser,
    deleteCRUD,
    hashUserPassword,
    getAllUser1,
    getAllUser2

}
// tra cứu trên sequelize.org để biết cách thêm, sửa trên db thực hiện trên web