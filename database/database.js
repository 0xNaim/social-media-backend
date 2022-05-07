const mongoose = require('mongoose');

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoDB = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Database Connected!`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
