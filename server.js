import express from "express";
import cors from "cors";
import logger from "./middleware/logger.js";
import connection from "./Config/db.js";
import vendorRouter from "./Routes/vendor.router.js";
import orderRouter from "./Routes/order.router.js";

const Port = 8080
const app = express();

app.use(express.json() );
app.use(cors());
app.use(logger)

app.get('/', (req,res)=>{
  return res.status(200).json({
    "message": "Thank you for visiting this website"
  });
})


app.use('/vendor', vendorRouter)
app.use('/order',orderRouter)

app.listen(Port, () => {
  connection();
  console.log(`server is running at http://localhost:${Port}`);
});
 
