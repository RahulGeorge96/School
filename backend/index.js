//http://localhost:3000/students

const express=require('express');
const mongoose=require('mongoose');
const fs=require('fs');
const path=require('path');
const logger= require('./middleware/logger');
// const validator=require('./middleware/validator');
// const ratelimiter=require('./middleware/ratelimiter');
const studentRoutes=require('./routes/studentRoutes');
const schoolRoutes=require("./routes/schoolRoutes");
const adminRoutes=require("./routes/adminRoutes");
const authRoutes=require("./routes/authRoutes");
const swaggerSetup=require("./swagger/swagger")
const { sequelize } = require('./models/SchoolAdmin');
const app=express();


const PORT=process.env.PORT ||3000;
app.use(express.json());
app.use(logger);
// app.use(validator);
// app.use(ratelimiter);

app.use("/api",studentRoutes);
app.use("/api", schoolRoutes);
app.use("/api",adminRoutes);
app.use("/api/auth",authRoutes);

swaggerSetup(app);

sequelize.authenticate().then(()=>{
    console.log("Connected to MySQL Database");
    sequelize.sync({alter:true}).then(()=>{
      console.log("All models synchronized successfully")
    }).catch((err)=>{
      console.log("Error in synchronizing models",err);
    })
}).catch(err=>{
    console.log("Unable to connect to MySQL",err);
})


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.log("Unable to connect to Mongodb",err));

app.listen(PORT, () => {
  console.log(`Server running on the port http://localhost:${PORT}`);
});




