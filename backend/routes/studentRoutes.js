    const express=require("express");
    const router=express.Router();
    const Student=require("../models/Student");
    const authenticateJWT=require("../middleware/authMiddleware");
   const roleMiddleware = require("../middleware/roleMiddleware");

    router.use(authenticateJWT);

    router.post('/students',roleMiddleware(['admin','teacher']),(req,res)=>{
        const {student_id,student_name,student_age,grade,school_id}=req.body;
        const newStudent=new Student({student_id,student_name,student_age,grade,school_id});

        newStudent.save().then(student=> res.status(201).json(student)).catch(err=> res.status(500).json(err));
    })

    router.get(
      "/students",
      roleMiddleware(['admin', 'teacher','viewer']),
      (req, res) => {
        const { age, grade, school_id } = req.query;
        let filter = {};
        if (age) {
          filter.student_age = age;
        }
        if (grade) {
          filter.grade = grade;
        }
        if (school_id) {
          filter.school_id = school_id;
        }
        Student.find(filter)
          .then((students) => res.json(students))
          .catch((err) => res.status(500).json(err));
      }
    );

    router.put(
      "/students/:id",
      roleMiddleware(['admin', 'teacher']),
      (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        Student.findByIdAndUpdate(id, updatedData, { new: true })
          .then((updatedStudent) => res.json(updatedStudent))
          .catch((err) => res.status(500).json(err));
      }
    );

    router.delete(
      "/students/:id",
      roleMiddleware(['admin']),
      (req, res) => {
        const { id } = req.params;
        Student.findByIdAndDelete(id)
          .then(() => res.status(204).send())
          .catch((err) => res.status(500).json(console.error()));
      }
    );
    module.exports=router;