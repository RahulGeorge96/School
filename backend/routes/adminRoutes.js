const express = require("express");
const router = express.Router();
const bcrypt=require('bcrypt');
const {Admin}=require("../models/SchoolAdmin");

router.post('/admins',async(req,res)=>{
    try{
          const { admin_name,admin_email,password,role,school_id} = req.body;
          const hashedPassword= await bcrypt.hash(password,10);
        const admin = await Admin.create({
          admin_name,
          admin_email,
          password:hashedPassword,
          role,
          school_id
        });
        res.status(201).json(admin);
    }
    catch(error){
 res.status(400).json({error:error.message})
    }
});

router.get('/admins',async(req,res)=>{
    try{
        const admins=await Admin.findAll();
        res.json(admins);
    }
    catch(error){
        res.status(500).jsoan({error:error.message});
    }
})

module.exports=router;
