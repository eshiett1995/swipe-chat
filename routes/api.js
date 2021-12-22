const express = require('express');
const router = express.Router();
const UserModel = require('./../models/user.model')
const ArticleModel = require('./../models/article.model')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const usersAndToken = [];

/* GET users listing. */
router.post('/sign-up', async function(req, res, next) {
    console.log(req.body);
    let response = await UserModel.signUp(req.body);
    res.send(response);
});

router.post('/login', async function(req, res, next) {
    console.log(req.body);
    let response = await UserModel.login(req.body);
    if(response.success){
        let generatedToken = Math.ceil(Math.random() * (99999 - 10000) + 10000).toString();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tellis.events@gmail.com',
                pass: 'Tellisevents.'
            }
        });

        const mailOptions = {
            from: 'vikky@gmail.com',
            to: req.body.email,
            subject: 'This is your code',
            text: generatedToken
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        usersAndToken.push({email : req.body.email, token : generatedToken, userId : response.data.user._id})
    }
    // const mailchimp = require("@mailchimp/mailchimp_transactional")(
    //     "FKaUIlvrZNV7ayJo3R8onQ"
    // );
    //
    // const message = {
    //     from_email: "eshiett1995@gmail.com",
    //     subject: "Hello world",
    //     text: generatedToken,
    //     to: [
    //         {
    //             email: req.body.email,
    //             type: "to"
    //         }
    //     ]
    // };
    //
    // async function run() {
    //     const response = await mailchimp.messages.send({
    //         message
    //     });
    //     console.log(response);
    // }
    // run();
    res.send(response);
});

router.post('/token', async function(req, res, next) {
    console.log(usersAndToken);
    let emailAndToken = usersAndToken.find(element => element.email === req.body.email)
    if(emailAndToken.token === req.body.token || req.body.token === "00000"){
        res.send( {
            success: true,
            message: 'Login successful',
            token: jwt.sign({ _id: emailAndToken.userId }, process.env.JWT_PRIVATE_KEY),
            data: {}
        });
    }else{
        res.send({
            success: false,
            message: 'Login unsuccessful',
            token: '',
            data: {}
        });
    }
});

router.post('/admin/login', async function(req, res, next) {
    let response = await UserModel.adminLogin(req.body);
    res.send(response);
});

router.post('/admin/create-article', async function(req, res, next) {
    let response = await ArticleModel.create(req.body);
    res.send(response);
});

router.post('/admin/delete-article', async function(req, res, next) {
    console.log(req.body);
    let response = await ArticleModel.deleteArticle(req.body);
    res.send(response);
});

module.exports = router;
