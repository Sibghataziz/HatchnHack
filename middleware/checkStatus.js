const checkStatus = (text) => {
  return (req, res, next) => {
    const form = req.body;
    if (text === "Pending" || text === "Confirm") {
      if (form.status!==true) {
        return res.status(400).send({
          status: "Error",
          message: "Status not provided or invalid value",
        });
      }
    } else if (text === "Delivered") {
      if (!form.ratingList || !Array.isArray(form.ratingList)) {
        return res.status(400).send({
          status: "Error",
          message: "Rating List is not provided or rating list is not an array",
        });
      } else {
        for (let product of form.ratingList) {
          const { overallRating, deliveryRating } = product;
          if (
            !overallRating ||
            !deliveryRating ||
            isNaN(deliveryRating) ||
            isNaN(overallRating)
          ) {
            return res.status(400).send({
              status: "Error",
              message:
                "Either ratings are not provided or ratings are not a number",
              product,
            });
          }
        }
      }
    }
    next();
  };
};

export default checkStatus;
