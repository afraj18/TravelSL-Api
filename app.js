const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

// ModelImports
const User = require('./models/user');

const app = express();

//DbConnect
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

})
.then(()=>{
    console.log("Db Connected")
})
.catch(e=>{
    console.log(e.message)
});


//Http Req
app.get('/',(req,res)=>{
    res.send("Hello server Good Night");
})

app.post('/create-user',async (req,res)=>{
    const isNewUser = await User.isThisEmailInUse("Abcd12345@gmail.com");
    if(!isNewUser){
        return res.json({
            success: false,
            message:'This email is already in use, Try sign in'});
    }
   const user =  await User({fullName: "Afraj",email:"Abcd12345@gmail.com",password:"12345"})
   user.save();
   res.json(user);
})



//PortConnection
app.listen(8000,()=>{
     console.log("Port is listen at 8000")
})

