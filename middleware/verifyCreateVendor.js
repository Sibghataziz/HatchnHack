const verifyCreateVendor = (req, res, next) => {
  const { name, component,sellingPrice } = req.body;
  const listOfProducts = [
    "Mobile",
    "TVs",
    "Monitors",
    "Laptops",
    "Tablets",
    "Printers",
    "Scanners",
  ];
  if(!name || name.length<3){
    return res.status(400).send({
        status : "Bad Request",
        message : "Must have a name or Name must be at least 3 characters"
    });
  }
  else if(!listOfProducts.includes(component)){
    return res.status(400).send({
        status : "Bad Request",
        message : "Component must be from the component list",
        "component list" : listOfProducts
    });
  }
  else if(!sellingPrice || sellingPrice<=0){
    return res.status(400).send({
        status : "Bad Request",
        message : "Component must have a price great",
    });
  }
  next();
};

export default verifyCreateVendor;
