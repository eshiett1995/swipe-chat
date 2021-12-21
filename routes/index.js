const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign-in', { title: 'Swipe', data: JSON.stringify({name : 'Chicken'}) });
});

router.get('/posts.html', auth('user'), async function(req, res, next) {
  const ArticleModel = require('./../models/article.model')
  let response = await ArticleModel.getArticles();
  let CryptoJS = require("crypto-js");
  let key = 'Secret Passphrase';
  let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(response), key).toString();
  res.render('posts', { title: '', data: ciphertext, key: key});
});

router.get('/post.html', auth('user'), function(req, res, next) {
  res.render('post', { title: '' });
});

router.get('/admin/create-post.html', auth('admin'), function(req, res, next) {
  res.render('admin-create', { title: '' });
});

router.get('/admin/sign-in.html', function(req, res, next) {
  res.render('sign-in-admin', { title: '' });
});

router.get('/admin/posts.html', auth('admin'), async function(req, res, next) {
  const ArticleModel = require('./../models/article.model')
  let response = await ArticleModel.getArticles();
  let CryptoJS = require("crypto-js");
  let key = 'Secret Passphrase';
  let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(response), key).toString();
  res.render('admin-posts', { title: '', data: ciphertext, key: key});
});

module.exports = router;
