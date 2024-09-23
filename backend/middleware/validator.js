const validator = (req, res, next) => {
    if(req.method=="GET"){
        return(next());
    }
    
  const { studentid,name, age, grade } = req.body;

  if (typeof studentid !=="string" ||
    typeof name !== "string" ||
    typeof age !== "number" ||
    typeof grade !== "string"
  ) {
    return res.status(400).json({ error: "Invalid data format" });
  }

  if (age < 0 || age > 120) {
    return res.status(400).json({ error: "Invalid age" });
  }
  next();
};

module.exports=validator;