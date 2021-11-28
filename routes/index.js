var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign-in', { title: 'Swipe', data: JSON.stringify({name : 'Chicken'}) });
});

router.get('/posts.html', function(req, res, next) {
  res.render('posts', { title: '' });
});

router.get('/post.html', function(req, res, next) {
  res.render('post', { title: '' });
});

module.exports = router;
