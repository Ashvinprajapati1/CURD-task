// const express=require('express');
// // const router=express.Router();
// const User=require('../model/User')

// //list
// const listuser=async(req,res)=>{
//     try{
//     const user=await User.find().select('-password');
//     res.status(200).json({message:'user created successfully',user})
//     }catch(err){
//         res.status(500).json({message:'error creating user',error:err.message});
//     }

// }

// //view

// const viewuser=async(req,res)=>{
//     try{
//         const users=await User.findById(req.params.id).select('-password');
//         res.status(200).json({message:'users retrieved successfully',users})
//     }catch(err){
//         res.status(500).json({message:'error retrieving users',error:err.message});
//     }

// }


// //update

// const updateuser=async(req,res)=>{
//     try{
//         const user=await User.findByIdAndUpdate(req.params.id,
//             {
//                 $set: {
//                     firstName: req.body.firstName,
//                     lastName: req.body.lastName,
//                     email: req.body.email,
//                     gender: req.body.gender,
//                     dateOfBirth: req.body.dateOfBirth,
//                     role: req.body.role,
//                     password: req.body.password,
//                     profileImage: req.file ? `/uploads/${req.file.filename}` : undefined
//                 }
//             },{new:true, runValidators:true}).select('-password');
//         res.status(200).json({message:'user updated successfully',user})
//     }catch(err){
//         res.status(500).json({message:'error updating user',error:err.message});
//     }
// }

// //delete

// const deleteuser=async(req,res)=>{
//     try{
//         const user=await User.findByIdAndDelete(req.params.id);
//         res.status(200).json({message:'user deleted successfully',user})

//     }catch(err){
//         res.status(500).json({message:'error in deleting user',error:err.message});
//     }
// }

// module.exports={listuser,viewuser,updateuser,deleteuser};





// controllers/userController.js
const userService = require('../services/userservice');
const logger = require('../loggers/logger');

const listUser = async (req, res) => {
    logger.info(`Get /users request received`);
    try {
        const users = await userService.getAllUsers();
        logger.info('Users retrieved successfully');
        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (err) {
        logger.error(`Error retrieving users: ${err.message}`);
        res.status(500).json({ message: 'Error retrieving users', error: err.message });
    }
};

const viewUser = async (req, res) => {
    logger.info(`Get /users/${req.params.id} request received`);
    try {
        const user = await userService.getUserById(req.params.id);
        logger.info(`User retrieved successfully: ${user.id}`);
        res.status(200).json({ message: 'User retrieved successfully', user });
    } catch (err) {
        logger.error(`Error retrieving user: ${err.message}`);  
        res.status(500).json({ message: 'Error retrieving user', error: err.message });
    }
};

const updateUser = async (req, res) => {
    logger.info(`Put /users/${req.params.id} request received`);
    try {
        const updatedUser = await userService.updateUserById(req.params.id, req.body, req.file);
        logger.info(`User updated successfully: ${updatedUser.id}`);
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        logger.error(`Error updating user: ${err.message}`);
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
};

const deleteUser = async (req, res) => {
    logger.info(`Delete /users/${req.params.id} request received`);
    try {
        const deletedUser = await userService.deleteUserById(req.params.id);
        logger.info(`User deleted successfully: ${deletedUser.id}`);
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
        logger.error(`Error deleting user: ${err.message}`);
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
};

module.exports = { listUser, viewUser, updateUser, deleteUser };
