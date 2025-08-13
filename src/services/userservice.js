// services/userService.js
const User = require("../model/User");
const logger=require('../loggers/logger');

const getAllUsers = async () => {
  logger.info("Fetching all users from database");
  const users = await User.find().select("-password");
  logger.info("Users fetched successfully");
    return users;
};

const getUserById = async (id) => {
  logger.info(`Fetching user with id ${id}`);
  return await User.findById(id).select("-password");
};

const updateUserById = async (id, data, file) => {
  const updateData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    gender: data.gender,
    dateOfBirth: data.dateOfBirth,
    role: data.role,
    password: data.password,
  };

  if (file) {
    updateData.profileImage = `/uploads/${file.filename}`;
  }

  return await User.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select("-password");
};

const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = { getAllUsers, getUserById, updateUserById, deleteUserById };
