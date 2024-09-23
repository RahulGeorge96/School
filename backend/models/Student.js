const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const studentSchema=new Schema({
    student_id:{type:String,required:true,unique:true},
    student_name:{type:String,required:true},
    student_age:{type:Number,required:true},
    grade:{type:String,required:true},
    school_id:{type:Number,required:true}
})

const Student=mongoose.model('Student',studentSchema);

module.exports=Student;