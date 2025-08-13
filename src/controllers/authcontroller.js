// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const multer = require("multer");
// // const upload = require("../middleware/upload");
// const User = require("../model/User");

// // const path = require('path');
// const { registerSchema, loginSchema } = require("../validators/userValidator");


// const registeruser=( async (req, res) => {
//   try {
//     const { error } = registerSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     const existingUser = await User.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     console.log("User registered:", req.file);

//     const { firstName, lastName, email, password, dateOfBirth, gender, role } =
//       req.body;
//     const user = new User({
//       firstName,
//       lastName,
//       email,
//       profileImage: req.file ? `/uploads/${req.file.filename}` : undefined,
//       password: hashedPassword,
//       dateOfBirth,
//       gender,
//       role,
//     });
//     await user.save();
//     res.status(201).json({
//       message: "User registered successfully",
//       imageUrl: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //Login 

// const loginuser=( async (req, res) => {
//   try {
//     const { error } = loginSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "email or password is incorrect" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({ message: "email or password is incorrect" });
//     }
//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET
//     );
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// exports.registeruser = registeruser;
// exports.loginuser = loginuser;


const authService=require('../services/authservice');
const {registerSchema,loginSchema}=require('../validators/userValidator'); 
const logger=require('../loggers/logger');

const registeruser = async (req, res) => {
  logger.info('Register user request recived');
  try{
    const{error}=registerSchema.validate(req.body);
    if(error){
      logger.info('User validation failed');
      return res.status(400).json({error:error.details[0].message});
    }
    const result=await authService.register(req.body, req.file, req);
    logger.info('User registration successful');
    res.status(201).json(result);
  }catch(error){
    logger.error('User registration failed');
    res.status(500).json({message:error.message});
  }
}

const loginuser = async (req, res) => {
  logger.info('Login user request received');
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      logger.info('User validation failed');
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await authService.login(req.body);
    logger.info('User login successful');
    res.status(200).json(result);
  } catch (error) {
    logger.error('User login failed');
    res.status(500).json({ message: error.message });
  }
}
module.exports = {registeruser,loginuser};