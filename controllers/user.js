const User = require('../models/user');

exports.createUser = async (req,res)=>{
    const {fullName,email,password} = req.body;
    const isNewUser = await User.isThisEmailInUse(email);
    if(!isNewUser){
        return res.json({
            success: false,
            message:'This email is already in use, Try sign in'});
    }
   const user =  await User(
       {fullName,
       email,
       password
    }); 
   await user.save();
   res.json({success:true,user});
}

exports.userSignIn = async (req,res)=>{ 
    // res.send('SignIn')
    const {email,password} = req.body
    const user = await User.findOne({email:email}) 

    if(!user) return res.json({success: false,message: 'User not found, with the given email'})

    const isMatch = await user.comparePassword(password)
    if(!isMatch)  return res.json({success: false,message: 'Email/Password does not match'})

    res.json({success:true, user})
}

