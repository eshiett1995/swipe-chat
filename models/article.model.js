'use strict';
const bcrypt = require('bcrypt');
const Schema = require("mongoose/lib/schema");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Author = require('./../models/author.model')

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
    async create(body) {
        try{
            let article = await this();
            article.title = body.title;
            article.detail = body.detail;
            article.image = body.image;
            article.content = body.content;
            let author = await Author.getOne();
            article.author = author.toObject();
            await article.save();
            return {
                success: true,
                message: 'Article successfully saved',
                data: {}
            };
        }catch (e) {
            return {
                success: false,
                message: 'Failed to save article',
                data: {}
            };
        }
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
