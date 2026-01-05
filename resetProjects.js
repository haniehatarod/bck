// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config({ path: "./config.env" });

// const DB = process.env.DATA_BASE.replace(
//   "<PASSWORD>",
//   process.env.DATA_BASE_PASSWORD
// );

// async function reset() {
//   await mongoose.connect(DB);
//   console.log("DB connected");

//   await mongoose.connection.db.dropCollection("projects");
//   console.log("projects collection dropped");

//   process.exit();
// }

// reset();
