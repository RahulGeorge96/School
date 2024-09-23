const fs=require('fs');
const path=require('path');

const logFile=path.join(__dirname,'../logs/requests.log');

const logger=(req,res,next)=>{
    const logEntry=`${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${req.headers['content-length']} bytes\n`;
    fs.appendFileSync(logFile,logEntry);
    next();
};

module.exports=logger;