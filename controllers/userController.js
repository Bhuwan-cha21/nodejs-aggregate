const User = require('../models/userModel');
const factory = require('../factory')
const bcrypt = require('bcryptjs')


exports.createUser = factory.createOne(User)
exports.getAll = factory.getAll(User)
exports.getOne = factory.getOne(User)

exports.changepassowrd =  async (req,res ) =>{
    if(req.params.id === req.body.id){
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 12);
        }
        const user = await User.findByIdAndUpdate(req.body.id, {$set :{ password: req.body.password,  passwordChangedAt: Date.now()}})
        
        res.status(201).json({
            status: 'success',
            data: {
                user
            }
        })
    }else{
        res.send("you cannot change other passwrd")
    }
}

