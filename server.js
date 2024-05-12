const dotenv=require('dotenv')
const cors = require('cors');
const express = require('express');
const swaggerUi=require('swagger-ui-express')
const colors=require('colors');
const mongoose=require('mongoose');
const morgan=require('morgan') ;
const connection=require('./config/db.js')
const router=require('./routes/testRoutes')
const authRoutes=require('./routes/authRoutes.js')
const userRoutes=require('./routes/userRoutes.js')
const restaurantRoutes=require('./routes/restaurantRoutes.js')
const categoryRoutes=require('./routes/categoryRoutes.js')
const foodRoutes=require('./routes/foodRoutes.js')
//dotenv configuration
dotenv.config()
const swagger = require('./docs/swagger.json');
//rest object
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/test',router)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/restaurant',restaurantRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/food',foodRoutes)
app.use('/queen', swaggerUi.serve, swaggerUi.setup(swagger));

const port = process.env.PORT || 5000
connection(); 

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});