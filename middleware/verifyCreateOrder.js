const verifyCreateOrder = (req, res, next) => {
    const { customerName,address,deliveryDate,productList  } = req.body;
    const listOfProducts = [
      "Mobile",
      "TVs",
      "Monitors",
      "Laptops",
      "Tablets",
      "Printers",
      "Scanners",
    ];
    const [year, month, day] = deliveryDate.split("-");
    if(!customerName || customerName.length<3){
      return res.status(400).send({
          status : "Bad Request",
          message : "Must have a name or name must be at least 3 characters"
      });
    }
    else if(!address || address.length<10){
        return res.status(400).send({
            status : "Bad Request",
            message : "Must have a address or Address must be at least 10 characters."
        });
    }
    else if(!deliveryDate || !year || year.length!==4 || !month || month.length!==2 || !day || day.length!==2){
        return res.status(400).send({
            status : "Bad Request",
            message : "Must have an Delivery Date and must be in a format of YYYY-MM-DD"
        });
    }
    else if(!productList || !Array.isArray(productList) || productList.length===0){
        return res.status(400).send({
            status : "Bad Request",
            message : "Must have a Product List or a Product List must be an array or the product list should have some items."
        });
    }
    for(let product of productList){
        const {component, quantity } = product
        if(!component || !listOfProducts.includes(component)){
            return res.status(400).send({
                status : "Bad Request",
                message : "Component must be from the component list",
                "component list" : listOfProducts,
                product
            });
          }
          else if(!quantity || quantity<=0){
            console.log(quantity);
            return res.status(400).send({
                status : "Bad Request",
                message : 'Must have an quantity o quantity must be greater than 0(zero)',
                product
            });
          }
    }
    next();
  };
  
  export default verifyCreateOrder;
  