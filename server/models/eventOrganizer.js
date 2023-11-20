import { Sequelize } from "sequelize";

import db from "../config/database.js";

const {DataTypes} = Sequelize;

const eventOrganizer = db.define(
    "eventOrganizer", 
    {
      idOrganizer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      organizerName: {
        type: DataTypes.STRING,
      },
      organizerInstitution: {
        type: DataTypes.STRING,
      },
      organizerAddress: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName : 'eventOrganizer' 	
    },
  );
  
  export default eventOrganizer;