const configuration = {
    MONGODB_CONNECTION_STRING: process.env.MONGO_URI||'mongodb://localhost:27017/FoodAPI'
}

module.exports = configuration;