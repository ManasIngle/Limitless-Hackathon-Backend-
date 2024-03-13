const app = require("./app");
const mongoose = require("mongoose");
const connectWithDB = require("./config/dbConfig");
const server = require("http").createServer(app);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // DB configuration
    await connectWithDB(
      "mongodb+srv://manas:i2UDOGTBJOT0X0zS@cluster0.opxat1j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    server.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error - " + error.message);

    await mongoose.connection.close();
    console.log("Database connection closed");
    console.log("Server is shutting down");
    process.exit();
  }
}

startServer();