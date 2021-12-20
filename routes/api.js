const express = require('express');
const router = express.Router();
const UserModel = require('./../models/user.model')
const ArticleModel = require('./../models/article.model')

/* GET users listing. */
router.post('/sign-up', async function(req, res, next) {
    console.log(req.body);
    let response = await UserModel.signUp(req.body);
    res.send(response);
});

router.post('/login', async function(req, res, next) {
    console.log(req.body);
    let response = await UserModel.login(req.body);
    res.send(response);
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
