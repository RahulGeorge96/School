const rateLimit=require('express-rate-limit');

const ratelimiter= rateLimit({windowMs: 15*60*1000,max:100,message:'too many requests, please try again later'});
module.exports=ratelimiter;