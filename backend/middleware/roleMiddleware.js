const roleMiddleware=(roles)=>{
    return(req,res,next)=>{
        const {role}=req.user;
        if(!roles.includes(role)){
            return(res.sendStatus(403));
        }
        next();
    }
}
module.exports=roleMiddleware