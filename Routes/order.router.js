import express from "express";
import {
  addReview,
  createOrder,
  finalizeOrder,
  markDelivered,
  viewOrder,
} from "../Controllers/order.controller.js";
import checkStatus from "../middleware/checkStatus.js";
import verifyCreateOrder from "../middleware/verifyCreateOrder.js";

const orderRouter = express.Router();

orderRouter.post("/", verifyCreateOrder, createOrder);
orderRouter.get("/:id", viewOrder);
orderRouter.patch("/:id", checkStatus("Pending"), finalizeOrder);
orderRouter.patch("/markDelivered/:id", checkStatus("Confirm"), markDelivered);
orderRouter.patch("/createReviews/:id", checkStatus("Delivered"), addReview);

export default orderRouter;
