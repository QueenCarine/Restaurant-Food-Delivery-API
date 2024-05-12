const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Restaurant title is required"],
      unique: true,
    },
    // id: {
    //   type: String,
    //   unique: true,
    // },
    imageUrl: {
      type: String,
    },
    foods: {
      type: Array,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: { type: String },
    code: { type: String },
    coords: {
      id: { type: String },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true }
);
const restaurantModel = mongoose.model("Restaurant", restaurantSchema);
module.exports = restaurantModel;
