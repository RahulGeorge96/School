const {Sequelize,DataTypes}=require('sequelize');
const config=require('../config/config.js');
const sequelize=new Sequelize(config.development);

const School=sequelize.define('School',{
    school_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    school_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    school_address:{
        type:DataTypes.STRING,
        allowNull:false
    }

});

const Admin=sequelize.define('Admin',{
    admin_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    admin_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    admin_email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
    type:DataTypes.STRING,
    allowNull:false
    },
    role:{
        type:DataTypes.ENUM('admin','teacher','viewer'),
        allowNull:false,
        defaultValue:'admin'
    },
    school_id:{
        type:DataTypes.INTEGER,
        references:{
            model:School,
            key:'school_id'
        }
    }
})
School.hasMany(Admin,{foreignKey:'school_id'});
Admin.belongsTo(School,{foreignKey:'school_id'});
module.exports={sequelize,School,Admin}