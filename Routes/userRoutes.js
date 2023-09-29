const express = require('express');
const {
    userLogin, 
    userSignup
} = require('../Controllers/userController')

const router = express.Router();

// User Login
router.post('/login', userLogin)

// User Signup
router.post('/signup', userSignup)

module.exports = router