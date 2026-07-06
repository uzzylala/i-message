import mongoose from "mongoose";

export async function connectDb() {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("Mongo uri is not avaliable");
    }
    const conn = await mongoose.connect(mongoUri);

    console.log("MongoDB connected", conn.connection.host);
  } catch (error) {
    console.error("mongodb connection error", error.message);
    process.exit(1); //1 means failed, 0 means success
  }
}
