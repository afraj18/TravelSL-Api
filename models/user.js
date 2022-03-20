const mongoose = require('mongoose');

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