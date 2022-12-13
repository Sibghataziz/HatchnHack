import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL;

const connection = async () => {
  // console.log(username + ' ' + password)
  await mongoose.connect(url);
  console.log("Connected...");
};

export default connection;
