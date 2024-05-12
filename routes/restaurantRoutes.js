const express=require('express');
const authMiddleware=require('../middlewares/authMiddleware');
const sellerMiddleware = require("../middlewares/sellerMiddleware");
const roleMiddleware=require('../middlewares/roleMiddleware')
const { createRestaurantController,
    getAllResturantController,
    getResturantByIdController,
    deleteResturantController } = require('../controllers/restaurantController');
const router=express.Router();
//routes
//CREATE RESTAURANT
router.post('/create',authMiddleware,sellerMiddleware,createRestaurantController)
// GET ALL RESTURANTS 
router.get("/getAll", roleMiddleware,getAllResturantController);
// GET RESTURANT BY ID 
router.get("/get/:id",roleMiddleware, getResturantByIdController);
// DELETE RESTURANT || DELETE
router.delete("/delete/:id", authMiddleware,sellerMiddleware, deleteResturantController);

module.exports=router;