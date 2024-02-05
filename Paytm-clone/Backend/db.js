require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  }
})

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    required: true

  }
})

const User = mongoose.model('User', UserSchema)
const Account = mongoose.model('Account', accountSchema)

module.exports = { connectDB, User, Account }
