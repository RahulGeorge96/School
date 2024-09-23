const express=require('express');
const router=express.Router();
const {School}=require("../models/SchoolAdmin");

router.post('/schools',async(req,res)=>{
    try{
        const {school_name,school_address}=req.body;
        const school = await School.create({ school_name, school_address });
        res.status(201).json(school)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
})

router.get('/schools',async(req,res)=>{
    try{
        const schools=await School.findAll();
        res.json(schools);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

module.exports=router;