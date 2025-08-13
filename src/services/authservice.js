const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../loggers/logger");

const register = async (userData, file, req) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    logger.info('User already exists');
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: hashedPassword,
    dateOfBirth: userData.dateOfBirth,
    gender: userData.gender,
    role: userData.role,
    profileImage: file ? `/uploads/${file.filename}` : undefined,
  });
  await user.save();
  logger.info('User registration successful');
  return {
    message: "User registered successfully",
    imageUrl: file ? `/uploads/${file.filename}` : undefined,
  };
};

const login=async({email,password})=>{
    const user=await User.findOne({email});

    if(!user) {
      logger.info('User not found');
      throw new Error("email or password is incorrect");
    }

    const isMatch=await bcrypt.compare(password, user.password);

    if(!isMatch) {
      logger.info('Invalid password');
      throw new Error("email or password is incorrect");
    }

    const token=jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET);
    return {  token };
}

module.exports = { register, login };