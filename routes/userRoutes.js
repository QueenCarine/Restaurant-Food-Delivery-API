const {getUserController, updateUserController,deleteProfileController,updatePasswordController,resetPasswordController}=require('../controllers/userController')
const authMiddleware=require("../middlewares/authMiddleware")
const express=require('express');
const router=express.Router();
//routes
//GET USER||GET
router.get('/getUser',authMiddleware,getUserController);
//UPDATE PROFILE
router.put('/updateUser',authMiddleware,updateUserController);
//PASSWORD UPDATE
router.post('/updatePassword',authMiddleware,updatePasswordController)
//RESET PASSWORD
router.post('/resetPassword',authMiddleware,resetPasswordController)
//DELETE USER
router.delete('/deleteUser/:id',authMiddleware,deleteProfileController)
module.exports=router;