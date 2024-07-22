// src/models/User.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  endUserName: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
    unique: true, // Ensure unique emails
  },
  endUserEmail: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
