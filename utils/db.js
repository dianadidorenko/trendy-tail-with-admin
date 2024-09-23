import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI;
const connection = {};

if (!mongoURI) {
  throw new Error("Missing MONGODB_URI environment variable");
}

async function connect() {
  if (connection.isConnected) {
    console.log("======");
    console.log("Already connected");
    console.log("======");
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("======");
      console.log("Using previous connection");
      console.log("======");
      return;
    }
    await mongoose.disconnect();
  }

  try {
    const db = await mongoose.connect(mongoURI, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("======");
    console.log("New connection");
    console.log("======");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      try {
        await mongoose.disconnect();
        connection.isConnected = false;
      } catch (error) {
        console.error("Error disconnecting from MongoDB:", error);
      }
    } else {
      console.log("======");
      console.log("Not disconnected");
      console.log("======");
    }
  }
}

const db = { connect, disconnect };
export default db;
