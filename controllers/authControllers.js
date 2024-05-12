const userModel=require('../models/userModel')
const bcrypt=require('bcryptjs');
const JWT=require('jsonwebtoken');
const { token } = require('morgan');
const nodemailer=require('nodemailer')
const registerController=async(req,res)=>{
try{
    const{userName,email,password,phone,address,answer,Role}=req.body
    //validation
    if(!userName||!email||!password||!address||!phone||!answer||!Role){
        return res.status(500).send({
            success:false,
            message:"Please fill in  all the fields"
        })
    }
    //check user
    const existinguser=await userModel.findOne({email})
    if(existinguser){
        return res.status(500).send({
            success:false,
            message:"Email already in use,please login"
        })
    }
    //hashing password
    var salt=bcrypt.genSaltSync(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    //create user
    const user=await userModel.create({userName,
        email,
        password:hashedPassword,
        address,
        phone,
        answer,
        Role,
    });
res.status(201).send({
    success:true,
    message:"User registered successfully",
    user,
})
}
catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in API",
        error
    })
}
};
const loginController=async(req,res)=>{
    try{
        const{email,password}=req.body;
        //validation
        if(!email||!password){
            return res.status(500).send({
                success:false,
                message:"Please provide Email or Password"
            })
        }
        //check user
        const user=await userModel.findOne({email});
if(!user){
    return res.status(404).send({
        success:false,
        message:"User Not Found"
    })
}
//check user password |Compare passwords
const isMatch=await bcrypt.compare(password,user.password)
if(!isMatch){
    return res.status(500).send({
        success:false,
        message:"Invalid credentials"
    });
}
user.password=undefined;
//token
const token=JWT.sign({id:user._id},process.env.JWT_SECRET,{
    expiresIn:"7d",
});

user.password=undefined;
res.status(200).send({
    success:true,
    message:"Login successful",
    token,
    user
})
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Login API',
            error
        
        })
    }

}
module.exports={registerController,loginController};