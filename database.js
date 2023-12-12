import mongoose from "mongoose";

const database = "mongodb://127.0.0.1:27017/STERLING";

export const ConnectDatabase = () => {
  mongoose
    .connect(database, {
      connectTimeoutMS: 6000,
      serverSelectionTimeoutMS: 6000,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((e) => console.log(`Error opening DB ${new Error(e).message}`));
};
