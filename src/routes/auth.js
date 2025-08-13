
const express=require('express');
const {registeruser,loginuser}=require('../controllers/authcontroller')
const multer = require('../middleware/upload');
const router=express.Router();

const upload = require('../middleware/upload');

router.post('/register', upload.single('profileImage'), registeruser);
router.post('/login', loginuser);

module.exports=router;
module.exports = router;
