import vendorModel from "../Models/vendor.model.js";

const createVendor = async (req, res) => {
  try {
    const vendor = req.body;
    let newVendor = await vendorModel.create(vendor);
    return res.status(201).send({
      status: "success",
      vendor: newVendor,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong!! Please try again later",
    });
  }
};

export { createVendor };
