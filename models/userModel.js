const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'User name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true
    },
    answer:{
           type:String,
           required:[true,'Answer is required']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    address:{
        type:Array  
    },
    phone:{
        type:String,
        required:[true,'Phone number is required']
    },
    Role:{
        type:String,
        required:true,
        enum:['buyer','seller']
    },
    profile:{
        type:String,
        default:'data:image/png;base64,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' 
    }
},


{
    timestamps:true,
})
module.exports=mongoose.model('User',userSchema)