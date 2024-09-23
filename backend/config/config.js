require('dotenv').config();
module.exports={
  "development"  :{
    "username":"root",
    "password":process.env.MYSQL_PASSWORD,
    "database":"school_database",
    "host": "localhost",
    "dialect":"mysql"
  }
}