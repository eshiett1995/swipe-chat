'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = require("mongoose/lib/schema");
const jwt = require('jsonwebtoken');
const userPaginate = require('mongoose-aggregate-paginate-v2');

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            text: true,
            maxlength: 50
        },
        lastname: {
            type: String,
            text: true,
            maxlength: 50
        },
        username: {
            type: String,
            text: true,
            maxlength: 50
        },
        email: {
            type: String,
            text: true,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            text: true,
            required: true,
            maxlength: 128
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'last_updated' }
    }
);

userSchema.statics = {
    async signUp(payload) {
        let {email, password} = payload;
        if(!email || !password){
            return {
                success: false,
                message: `Enter a ${!email ? 'email' : 'password'}`,
                data: {}
            };
        }
        //TODO create wallet
        let user = await this();
        user.firstname = payload.firstname;
        user.lastname = payload.lastname;
        user.email = payload.email;
        user.password = bcrypt.hashSync(payload.password, 10);
        user.email = email;
        await user.save();
        return {
            success: true,
            message: 'User successfully saved',
            data: {}
        };
    },
    async login(payload) {
        let {email, password} = payload;
        let foundUser = await this.findOne({'email': email}).exec();
        const match = await bcrypt.compare(password, foundUser.password);
        if(match){
            return {
                success: true,
                message: 'Login successful',
                token: jwt.sign({ _id: foundUser._id }, process.env.JWT_PRIVATE_KEY),
                data: {
                    user : foundUser,
                    tags: await tagModel.find({}),
                    categories: await categoryModel.find({})
                }

            };
        }else{
            return {
                success: false,
                message: 'username/password not found',
                data: {}
            };
        }
    },
}

userSchema.plugin(userPaginate);
module.exports = mongoose.model('User', userSchema);
