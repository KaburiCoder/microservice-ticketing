import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defiend");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connect MongoDb");
  } catch (err) { }
  app.listen(3000, () => {
    console.log("JWT_KEY", process.env.JWT_KEY);
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
