import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("connected succesfull to mongodb");
  } catch (error) {
    console.log(`error encountered: ${error}`);
  }
};

export default connectToDatabase;
