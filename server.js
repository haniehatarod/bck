import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: "./config.env" });
console.log(`enviroment: ${process.env.NODE_ENV}`);
const DB = process.env.DATA_BASE.replace(
  "<PASSWORD>",
  process.env.DATA_BASE_PASSWORD
);
mongoose.connect(DB).then((con) => {
  console.log("DB connection successful");
  // console.log(con.connections);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("Server is running on port 3000");
});
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
