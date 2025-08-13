const mongoose=require('mongoose');
const logger=require('../loggers/logger');
const uri=process.env.MONGO_URI;

const connectDB=async()=>{
    try{
        await mongoose.connect(uri);
        logger.info('Connected to mongo');
    }catch(err){
        logger.error('Error connecting to mongo:', err);
    }
}

module.exports = connectDB;