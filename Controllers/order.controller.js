import orderModel from "../Models/order.model.js";
import vendorModel from "../Models/vendor.model.js";

const createOrder = async (req, res) => {
  try {
    let order = { ...req.body };
    for (let product of order.productList) {
      const vendor = await vendorModel
        .findOne({ component: product.component })
        .sort({ overallRating: -1, deliveryRating: -1 });
      if (vendor) {
        product.vendorId = vendor._id;
        product.vendorName = vendor.name;
        product.price = vendor.sellingPrice;
      } else {
        product.vendorId = null;
        product.vendorName = "null";
        product.price = 0;
      }
    }
    const newOrder = await orderModel.create(order);
    return res.status(201).send({
      status: "success",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong!! Please try again later",
    });
  }
};

const viewOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await orderModel.findById(id);
    if (order) {
      return res.status(200).send({
        status: "success",
        order,
      });
    } else {
      return res.status(400).send({
        status: "Error",
        message: "Invalid order id.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong!! Please try again later",
    });
  }
};

const finalizeOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await orderModel.findById(id);
    if (order && order.status==='Pending') {
      order.status = "Confirm";
      const updateorder = await orderModel.findByIdAndUpdate(id, order, {
        new: true,
      });
      return res.status(202).send({
        status: "success",
        updateorder,
      });
    } else {
      return res.status(400).send({
        status: "Error",
        message: "Invalid order id or order is either already finalized or delivered",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong!! Please try again later",
    });
  }
};

const markDelivered = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await orderModel.findById(id);
    if (order && order.status==='Confirm') {
      order.status = "Delivered";
      const updateorder = await orderModel.findByIdAndUpdate(id, order, {
        new: true,
      });
      return res.status(202).send({
        status: "success",
        updateorder,
      });
    } else {
      return res.status(400).send({
        status: "Error",
        message: "Invalid order id or order is either not  finalized or already delivered",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong!! Please try again later",
    });
  }
};

const addReview = async (req, res) => {
  try {
    const id = req.params.id;
    const ratingList = req.body.ratingList;

    let order = await orderModel.findById(id);

    if(order.status !== "Delivered"){
      return res.status(400).send({
        status: "Error",
        message: "Order has not been delivered yet.",
      })
    }
    else if(order.reviewGiven){
      return res.status(400).send({
        status: "Error",
        message: "Order has already been reviewed.",
      })
    }
    else if(ratingList.length!==order.productList.length){
      return res.status(400).send({
        status: "Error",
        message: "list of rating does not matches with product list.",
      })
    }else{
      for (let i=0;i<ratingList.length;i++) {
        let vendor = await vendorModel.findById(order.productList[i].vendorId);
        const newOverAllrating = (+vendor.overallRating+ratingList[i].overallRating)/2
        const newDeliveryRating = (+vendor.deliveryRating+ratingList[i].deliveryRating)/2
        vendor.overallRating = newOverAllrating
        vendor.deliveryRating = newDeliveryRating
        await vendorModel.findByIdAndUpdate(order.productList[i].vendorId,vendor)
      }
      order.reviewGiven = true
      await orderModel.findByIdAndUpdate(id, order)
      
      return res.status(202).send({
        status: "success",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong!! Please try again later",
    });
  }
};

export { createOrder, viewOrder, finalizeOrder, markDelivered, addReview };
