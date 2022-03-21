const {check, validationResult} = require('express-validator')

exports.validateUserSignUp = [
    check('fullName').trim()
    .not().isEmpty().withMessage('Name is empty!')
    .isString().withMessage('Must be a valid name!')
    .isLength({min:5,max:20})
    .withMessage('Name must be within 5 - 20 characters'),
    
    check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid Email.'),
    
    check('password')
    .trim().not()
    .isEmpty().withMessage('Password is empty')
    .isLength({min:8,max:20})
    .withMessage('Password must be within 8-20 characters !'),
    
    check('confirmPassword')
    .trim()
    .not()
    .isEmpty()
    .custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error("Both passwords are not same");
        }
        return true;
    })
]


exports.userValidator = (req,res,next)=>{
    const result  = validationResult(req).array();
    if(!result.length) return next();

    const error = result[0];
    res.json({success: false,message:error})
}

exports.validateUserSignIn = [
    check('email').trim().isEmail().withMessage('Email or Password is incorrect'),
    
    check('password').trim().not().isEmpty().withMessage('Email or Password is incorrect')
]