import db from '../models/index'
import CRUDservice from'../service/CRUDservice'

let getHomePage = async (req, res) => {
    let data = await db.User.findAll()
    return res.status(200).json({
        data: data
    })
}
let createUser = async (req, res) => {
    try{
        await db.sequelize.transaction(async (t) => {
            let isHasUser = await db.User.findOne({
                where: {email : req.body.email}
            })
            let data = req.body
            let hashPasswordFromBcript = await CRUDservice.hashUserPassword(data.password)
        if(isHasUser){
            return res.status(200).json({mess: 'da ton tai nguoi dung'})
        }
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
        return res.status(200).json({
            mess: 'tao thanh cong'
        })
        
        // console.log(message)
        
    })
        }catch(e){
        console.error(e)
    }
    
}
let deleteUser  = async (req, res) => {
        try {
            await db.sequelize.transaction(async (t) => {
                let isHasUser = await db.User.findOne({
                  where: { email: req?.body?.email },
                  
                });
            
            if (!isHasUser) {
                return res.status(200).json('miss')
            }
            await db.User.destroy({
                where: {email: req?.body?.email},
                transaction: t
            })
            return res.status(200).json('xoa thanh cong')
        })
        }catch(e){
            console.error(e)
        }
    
}
let updateUser = async (req, res) => {
    try{
        await db.sequelize.transaction(async (t) => {
            let data = req?.body
            let isHasUser = await db.User.findOne({
                where: {id: req?.body?.id}
            })
            if(!isHasUser){
                return res.status(200).json('khong tim thay nguoi dung')
            }
            await db.User.update(req.body,{
                
                where: {id : req?.body?.id},
                transaction: t
            })
            return res.status(200).json('thanh cong')
        })
    }catch(e){
        console.error(e)
    }
}
module.exports = {
    getHomePage,
    createUser,
    deleteUser, 
    updateUser

}