'use strict';
const bcrypt = require('bcrypt');
const Schema = require("mongoose/lib/schema");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const articleSchema = new Schema(
    {
        title: {
            type: String,
            text: true,
            maxlength: 200
        },
        detail: {
            type: String,
            text: true,
            maxlength: 200
        },
        image :{
            type: String,
            text: true,
        },
        content: {
            type: String,
            text: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author'
        },

    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'last_updated' }
    }
);

articleSchema.statics = {
    async createDefault() {
        let article = await this();
        article.title = "Visiting the world means learning cultures";
        article.detail = "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.";
        article.organizer = mongoose.Types.ObjectId('61ab4957e80ed67b74c46fa8');
        await article.save();
        return {
            success: true,
            message: 'Article successfully saved',
            data: {}
        };
    },
    async getArticles() {
        const tags = await this.find({}).populate('author').exec();
        return {
            success: true,
            message: 'Article successfully retrieved',
            data: tags
        };
    },
}

module.exports = mongoose.model('Article', articleSchema);
