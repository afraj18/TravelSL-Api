const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
//Routers
const userRouter = require('./routes/userRoute')
// ModelImports
const User = require('./models/user');

const app = express();

app.use(express.json());
app.use(userRouter)
//Http Req
app.get('/',(req,res)=>{
    res.send("Hello server Good Night");
})





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

//PortConnection
app.listen(8000,()=>{
     console.log("Port is listen at 8000")
})

