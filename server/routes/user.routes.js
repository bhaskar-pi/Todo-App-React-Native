const express = require('express')
const {registerUser, loginUser, getUserDetails} = require('../controllers/user.controller')
const authenticate = require('../middlewares/auth.middleware')

const router = express.Router()

// user register
router.post('/register', registerUser)

// user login
router.post('/login', loginUser)

// get user
router.get('/', authenticate, getUserDetails)


module.exports = router

