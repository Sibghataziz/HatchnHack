import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    overallRating: {
      type: mongoose.Decimal128,
      required: true,
      default: 5,
    },
    deliveryRating: {
      type: mongoose.Decimal128,
      required: true,
      default: 5,
    },
    numberofOrders: {
      type: Number,
      required: true,
      default: 0,
    },
    component: {
      type: String,
      required: true,
      enum : ["Mobile","TVs","Monitors","Laptops","Tablets","Printers","Scanners"],
    },
    sellingPrice:{
      type : Number,
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const vendorModel = mongoose.model("vendors", vendorSchema);

export default vendorModel;
