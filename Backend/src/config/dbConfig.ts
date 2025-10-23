import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log("🔌 Attempting to connect to MongoDB...");
    const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`);
    console.log("✅ Database connected successfully!");
    console.log(`🏠 Host: ${connect.connection.host}`);
    console.log(`📊 Database: ${connect.connection.name}`);
    console.log(`🔗 Connection State: ${connect.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
    // Log connection events
    mongoose.connection.on('connected', () => {
      console.log("🟢 Mongoose connected to MongoDB");
    });
    
    mongoose.connection.on('error', (err) => {
      console.error("🔴 Mongoose connection error:", err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log("🟡 Mongoose disconnected from MongoDB");
    });
    
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error("🔍 Error details:", error);
    console.log("💀 Exiting application...");
    process.exit(1);
  }
};

export default connectDb;
