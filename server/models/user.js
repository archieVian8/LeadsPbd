import { Sequelize } from "sequelize";

import db from "../config/database.js";

const {DataTypes} = Sequelize;

const user = db.define(
    "user", 
    {
      idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      elementarySchool: {
        type: DataTypes.STRING,
      },
      juniorHighSchool: {
        type: DataTypes.STRING,
      },
      seniorHighSchool: {
        type: DataTypes.STRING,
      },
      university: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.ENUM("MALE", "FEMALE"),
      },
      about: {
        type: DataTypes.STRING,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      timestamps: false,
      tableName : 'user' 	
    },
  );
  
  export default user;