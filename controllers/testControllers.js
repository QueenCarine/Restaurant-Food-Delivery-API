const testUserController=(req,res)=>{
try{
    res.status(200).send({
        success:true,
        message:"Test User Data API"
    })
}
catch(error){
    console.log('Error in the test API',error)
}
};
module.exports={testUserController}