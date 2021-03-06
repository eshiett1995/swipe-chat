'use strict';

const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const authorization = (role) => async (req, res, next) => {

    console.log('this is the role', role);
    const authorization = req.cookies['token'];

    if(!authorization){
        return res.render('sign-in', { title: 'Swipe', data: JSON.stringify({name : 'Chicken'}) });
    }
    try {
        let decryptedJwt = jwt.verify(authorization, process.env.JWT_PRIVATE_KEY);
        console.log("decryptedJwt ", decryptedJwt)
        try {
            let foundUser = await userModel.findOne({ _id: ObjectId(decryptedJwt._id)}).exec();
            console.log('this is the user role', foundUser.userType);
            if(role === 'admin' && foundUser.userType === 'user'){
                return res.redirect(401, '/admin/sign-in.html');
            }
            if(foundUser){
                req.user = foundUser
                next();
            }else{
                return res.render('sign-in', { title: 'Swipe', data: JSON.stringify({name : 'Chicken'}) });
            }
        } catch (error) {
            return res.render('sign-in', { title: 'Swipe', data: JSON.stringify({name : 'Chicken'}) });
        }
    } catch (error) {
        return res.render('sign-in', { title: 'Swipe', data: JSON.stringify({name : 'Chicken'}) });
    }
};

module.exports = authorization;
