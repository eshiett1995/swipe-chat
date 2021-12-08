var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign-in', { title: 'Swipe', data: JSON.stringify({name : 'Chicken'}) });
});

router.get('/posts.html', async function(req, res, next) {

  console.log('-----------------------------------')
  console.log(req.cookies)
  const ArticleModel = require('./../models/article.model')
  let response = await ArticleModel.getArticles();
  res.render('posts', { title: '', data: JSON.stringify(response) });
});

router.get('/post.html', function(req, res, next) {
  res.render('post', { title: '' });
});

module.exports = router;
