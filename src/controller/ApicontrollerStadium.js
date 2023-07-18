import db, { sequelize } from '../models/index'


let getHomePage1 = async (req, res) => {
    let data = await db.Stadium.findAll()
    return res.status(200).json({
        data: data
    })
}
let createStadium = async (req, res) => {
    try{
        await db.sequelize.transaction(async (t) => {
            let isHasStadium = await db.Stadium.findOne({
                where: {name : req.body.name}
            })
            let data = req.body
            
        if(isHasStadium){
            return res.status(200).json({mess: 'da ton tai san dau'})
        }
        await db.Stadium.create({
            name: data.name,
            address: data.address, 
            description: data.description,
            image: data.image,
        })
        return res.status(200).json({
            mess: 'tao thanh cong'
        })
    })
        }catch(e){
        console.error(e)
    }
    
}
let deleteStadium  = async (req, res) => {
        try {
            await db.sequelize.transaction(async (t) => {
                let isHasStadium = await db.Stadium.findOne({
                  where: { name: req?.body?.name },
                  
                });
            
            if (!isHasStadium) {
                return res.status(200).json('miss')
            }
            await db.Stadium.destroy({
                where: {name: req?.body?.name},
                transaction: t
            })
            return res.status(200).json('xoa thanh cong')
        })
        }catch(e){
            console.error(e)
        }
    
}
let updateStadium = async (req, res) => {
    try{
        await db.sequelize.transaction(async (t) => {
            let data = req?.body
            let isHasStadium = await db.Stadium.findOne({
                where: {id: req?.body?.id}
            })
            if(!isHasStadium){
                return res.status(200).json('khong tim thay san dau')
            }
            await db.Stadium.update(req.body,{
                
                where: {id : req?.body?.id},
                transaction: t
            })
            return res.status(200).json('thanh cong')
        })
    }catch(e){
        console.error(e)
    }
}
let totalStadium = async (req, res) => {
    try {
        const records =await sequelize.query('select * from Stadia where address = $england', {type: sequelize.SELECT})
        console.log(JSON.stringify(records[0], null, 2))
    }catch(e){
        console.error(e)
    }
}
module.exports = {
    getHomePage1,
    createStadium,
    deleteStadium, 
    updateStadium,
    totalStadium

}