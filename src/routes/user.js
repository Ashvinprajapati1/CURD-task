const express=require('express');
const {listUser,viewUser,deleteUser,updateUser}=require('../controllers/usercontroller')

const router=express.Router();

const upload = require('../middleware/upload');

router.put('/user/:id', upload.single('profileImage'), updateUser);
router.get('/user',listUser);
router.get('/user/:id',viewUser);
router.delete('/user/:id',deleteUser);

module.exports=router;