import mongoose from "mongoose";
import "dotenv/config";
import app from "./app.js";
import colors from "colors";

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running. Use our API on port: ${PORT}`.green.italic.bold
      );
    });
    console.log("Database connect success".green.italic.bold);
  })
  .catch((error) => {
    console.log(error.message.red.bold);
    process.exit(1);
  });
