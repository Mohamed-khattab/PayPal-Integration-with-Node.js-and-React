const express = require('express');
const userController = require('../Controller/userController');
const router = express.Router();

router.post('/login' ,  userController.login); 
router.post('/signup', userController.signUp);
// auth.verifyUser ,
module.exports = router;
