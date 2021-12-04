const express = require('express');
const router = express.Router();
const UserModel = require('./../models/user.model')

/* GET users listing. */
router.post('/sign-up', async function(req, res, next) {
    console.log(req.body);
    let response = await UserModel.signUp(req.body);
    res.send(response);
    //res.render('sign-up', { title: 'Swipe' });
});

router.post('/login', async function(req, res, next) {
    console.log(req.body);
    let response = await UserModel.login(req.body);
    res.send(response);
    //res.render('sign-up', { title: 'Swipe' });
});

module.exports = router;
