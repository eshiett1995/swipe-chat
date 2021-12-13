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
  let ciphertext = CryptoJS.AES.encrypt('this babe is babe',).toString();
  console.log(ciphertext);
  res.render('posts', { title: '', data: JSON.stringify(response), key: key});
});

router.get('/post.html', auth(), function(req, res, next) {
  res.render('post', { title: '' });
});

module.exports = router;
