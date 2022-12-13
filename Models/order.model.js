import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    productList: {
      type: [
        {
          component: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
          vendorName: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    status: {
      type: String,
      default: "Pending",
      enum:["Confirm", "Pending", "Delivered"]
    },
    reviewGiven : {
      type: Boolean,
      required: false,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const orderModel = mongoose.model("orders", orderSchema);

export default orderModel;
