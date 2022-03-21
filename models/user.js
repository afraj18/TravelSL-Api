const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
        fullName:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            index:{unique :true}
        },
        password: {
            type: String,
            required: true
        },
        avatar: Buffer
    }
);

userSchema.pre('save',function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password,8,(error,hash)=>{
            if(error) return next(error);

            this.password = hash;
            next();
        });
    }

});

userSchema.methods.comparePassword = async function(password){
    if(!password) throw new Error('Password is missing, can\' compare')
    try {
        const result = await bcrypt.compare(password,this.password)
        return result;
    } catch (error) {
        console.log("Error while comparing passwords."+error.message)
    }
}

userSchema.statics.isThisEmailInUse = async function(email) {
    if(!email) throw Error('Invalid Email')
    try {
        const user = await this.findOne({email:email})
        if (user) return false
    
        return true
    } catch (error) {
        console.log("Error inside the isThisEmailInUse "+ error.message)
    }
}

module.exports = mongoose.model('User',userSchema);