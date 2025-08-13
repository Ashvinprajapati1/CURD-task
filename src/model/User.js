const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileImage: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  role: { type: String, enum: ["admin", "hr"], default: "user" },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
