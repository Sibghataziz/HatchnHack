const logger = (req, res, next) => {
    // console.log(req)
    console.log(
      new Date(),
      req.method,
      req.url
    );
    next();
  };
  
  export default logger;
  