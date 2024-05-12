//CREATE RESTAURANT
const restaurantModel = require('../models/restaurantModel.js')
const createRestaurantController=async(req,res)=>{
    try{
       const{title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords}=req.body
        //validation
        if(!title||!coords){
            return res.status(400).send({
                success:false,
                message:"Please provide title and address"
            })
        }
        
        const newRestaurant=new restaurantModel({title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        })
        await newRestaurant.save()
        res.status(201).send({
            success:true,
            message:"Restaurant created successfully"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in the Create Restaurant API",
            error
        })
    }

};


// GET ALL RESTURNAT
const getAllResturantController = async (req, res) => {
    try {
      const restaurants = await restaurantModel.find({});
      if (!restaurants) {
        return res.status(404).send({
          success: false,
          message: "No Restaurant Available",
        });
      }
      res.status(200).send({
        success: true,
        totalCount: restaurants.length,
        restaurants,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Get ALL Restaurant API",
        error,
      });
    }
  };
  
  // GET RESTURNAT BY ID
  const getResturantByIdController = async (req, res) => {
    try {
      const resturantId = req.params.id;
      if (!resturantId) {
        return res.status(404).send({
          success: false,
          message: "Please Provide Resturnat ID",
        });
      }
      //find resturant
      const resturant = await restaurantModel.findById(resturantId);
      if (!resturant) {
        return res.status(404).send({
          success: false,
          message: "no resturant found",
        });
      }
      res.status(200).send({
        success: true,
        resturant,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Get Resturarnt by id api",
        error,
      });
    }
  };
  
  //DELETE RESTRURNAT
  const deleteResturantController = async (req, res) => {
    try {
      const resturantId = req.params.id;
      if (!resturantId) {
        return res.status(404).send({
          success: false,
          message: "No Resturant Found OR Provide Resturant ID",
        });
      }
      await restaurantModel.findByIdAndDelete(resturantId);
      res.status(200).send({
        success: true,
        message: "Resturant Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror in delete resturant api",
        error,
      });
    }
  };
  
module.exports={createRestaurantController,
    getAllResturantController,
    getResturantByIdController,
    deleteResturantController
}