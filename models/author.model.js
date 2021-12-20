'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = require("mongoose/lib/schema");
const jwt = require('jsonwebtoken');
const userPaginate = require('mongoose-aggregate-paginate-v2');

const authorSchema = new Schema(
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
        image: {
            type: String,
            text: true,
            maxlength: 50
        },
        bio: {
            type: String,
            text: true,
            maxlength: 500
        },
        email: {
            type: String,
            text: true,
            required: true,
            unique: true,
            lowercase: true
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'last_updated' }
    }
);

authorSchema.statics = {
    async createDefault() {
        let author = await this();
        author.firstname = 'Victoria';
        author.lastname = "Atauba";
        author.email = 'victoria.atauba@gmail.com';
        author.bio = "";
        author.image = "";
        await author.save();
        return {
            success: true,
            message: 'Author successfully saved',
            data: {}
        };
    },

    async getOne() {
        let author = await this.findOne({});

        return author;
    },
}

authorSchema.plugin(userPaginate);
module.exports = mongoose.model('Author', authorSchema);
