import mongoose from "mongoose";



const connectDB = async () => {
  mongoose.set("strictQuery", false);
  try {
    const conn = await mongoose.connect(
     'mongodb+srv://Art:Primierenergie25@cluster0.kkhvsfy.mongodb.net/ang?retryWrites=true&w=majority&appName=Cluster0'
   // 'mongodb://localhost:27017/ang'
    );
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`);
  }
};

export default connectDB;
