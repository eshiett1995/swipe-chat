const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign-in', { title: 'Swipe', data: JSON.stringify({name : 'Chicken'}) });
});

router.get('/posts.html', auth(), async function(req, res, next) {
  const ArticleModel = require('./../models/article.model')
  let response = await ArticleModel.getArticles();
  let CryptoJS = require("crypto-js");
  let key = 'Secret Passphrase';
  let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(response), key).toString();
  res.render('posts', { title: '', data: ciphertext, key: key});
});

router.get('/post.html', auth(), function(req, res, next) {
  res.render('post', { title: '' });
});

router.get('/admin/create-post.html', function(req, res, next) {
  res.render('admin-create', { title: '' });
});

router.get('/admin/sign-in', function(req, res, next) {
  res.render('sign-in-admin', { title: '' });
});

module.exports = router;
