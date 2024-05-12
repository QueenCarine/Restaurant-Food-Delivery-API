const userModel=require("../models/userModel");
const bcrypt=require('bcryptjs');
//GET USER INFO
const getUserController=async(req,res)=>{
   try{
    //find user
    const user=await userModel.findById({ _id:req.body.id},{_id: 0});
    //validation
    if(!user){
        return res.status(404).send({
            success:false,
            message:"User Not Found"
        })
    }
//hide password
user.password=undefined;
//resp
res.status(200).send({
    success:true,
    message:"User retrieved successfully",
    user
})
   }
   catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in the get User API",
        error
    })
   }
    
};
//UPDATE USER
const updateUserController=async(req,res)=>{
    try{
        //Find User 
        const user=await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
              success:false,
              message:"User not found"  
            })
        }
        //update user
        const {userName,address,phone,}=req.body
        if(userName) user.userName=userName
        if(address) user.address=address
        if(phone) user.phone=phone
        //save user
        await user.save()
        res.status(200).send({
            success:true,
            message:"User Updated successfully"
            
        })



    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"Error in the Update user API",
            error
        })
    }
};
//UPDATE USER PASSWORD
const updatePasswordController=async(req,res)=>{
    try{
        //find user
        const user=await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User does not exist"
            })
        }
        //Get data from user
        const {oldPassword,newPassword}=req.body;
        //validation
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:"Please provide either the old or new password"
            })
        }
        //check user password |Compare passwords
const isMatch=await bcrypt.compare(oldPassword,user.password)
if(!isMatch){
    return res.status(500).send({
        success:false,
        message:"Old password is incorrect"
    });
}
var salt=bcrypt.genSaltSync(10);
const hashedPassword=await bcrypt.hash(newPassword,salt)
    user.password=hashedPassword;
    await user.save();
    res.status(200).send({
        success:true,
        message:"Password updated successfully"
    })
}
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Password Update API ",
            error
        });

    };
}
//RESET PASSWORD
const resetPasswordController=async(req,res)=>{
    try{
        const{email,newPassword,answer}=req.body
        if(!email ||!newPassword ||!answer){
            return res.status(500).send({
                success:false,
                message:"Please fill in all the fields"
            })
        }
        const user=await userModel.findOne({email,answer})
        if(!user){
            return res.status(500).send({
                success:false,
                message:"User not found or Invalid answer"
            })
        }
         //hashing password
    var salt=bcrypt.genSaltSync(10);
    const hashedPassword=await bcrypt.hash(newPassword,salt);
    user.password=hashedPassword
    await user.save()
    res.status(200).send({
        success:true,
        message:"Password Reset successfully"
    })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Reset Password API",
            error
        })
    }
}
//DELETE PROFILE ACCOUNT
const deleteProfileController=async(req,res)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:"Your account has been deleted."
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Delete Profile API",
            error
        })
    }
}
    
     
module.exports={getUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordController,
    deleteProfileController};