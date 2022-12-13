import express from "express";
import { createVendor } from "../Controllers/vendor.controller.js";
import verifyCreateVendor from "../middleware/verifyCreateVendor.js";

const vendorRouter = express.Router();

vendorRouter.post('/', verifyCreateVendor, createVendor)

export default vendorRouter;
