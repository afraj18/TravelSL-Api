const express = require('express');


const router = express.Router();

const { createUser, 
        userSignIn} = require('../controllers/user');

const { validateUserSignUp,
        userValidator, 
        validateUserSignIn} = require('../middleware/validations/user');

//Post Route
router.post('/create-user',validateUserSignUp,userValidator,createUser);
router.post('/sign-in',validateUserSignIn,userValidator,userSignIn);


module.exports = router;

