const multer = require("multer");
const logger=require('../loggers/logger');
const path=require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    logger.info('File uploads in /uploads folder');
    cb(null, path.join(__dirname,'../../public/uploads'));
  },
  filename:function (req, file, cb) {
    logger.info(`File name: ${file.originalname}`);
    cb(null, file.originalname);
  },
});


module.exports = multer({storage});
