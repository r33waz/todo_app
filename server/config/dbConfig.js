import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const database = await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoData Base connected ${database.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
