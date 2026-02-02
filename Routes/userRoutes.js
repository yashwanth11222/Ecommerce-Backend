const express = require('express');
const router = express.Router();
const {registerUser, loginUser, userProfile} = require('../Controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', userProfile);

module.exports = router;
