const express=require("express");
const jwt= require("jsonwebtoken");

const bcrypt=require("bcrypt");
const {Admin}=require("../models/SchoolAdmin");
const router=express.Router();

router.post("/register",async(req,res)=>{
    const {admin_name,admin_email,password,role,school_id}=req.body;

    try{
        const existingAdmin=await Admin.findOne({where:{admin_email}});
        if(existingAdmin){
            return(res.status(400).json({message:"Admin already exists"}));
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const newAdmin=await Admin.create(
            {admin_name,
            admin_email,
            password:hashedPassword,
            role,
            school_id
        })
  res.status(201).json({message:'Admin registered successfully',admin_id:newAdmin.admin_id});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

router.post("/login",async(req,res)=>{
    const {admin_email,password}=req.body;
    const admin= await Admin.findOne({where:{admin_email}});
    if(!admin || !(await bcrypt.compare(password,admin.password))){
        return (res.status(401).json({message:"Invalid Credentials"}))
    }

    const token =jwt.sign({id:admin.admin_id,role:admin.role},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.json({token});
})

router.get("/me",async(req,res)=>{
const token= req.headers.authorization.split(' ')[1];
const decoded=jwt.verify(token,process.env.JWT_SECRET);
const admin=await Admin.findByPk(decoded.id);
res.json(admin);
});

module.exports=router;