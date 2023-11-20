import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const userJoinAcademicEvents = db.define(
  "userJoinAcademicEvents",
  {
    idUserJoinAcademicEvents: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idAcademicEvents: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "userJoinAcademicEvents",
  }
);

userJoinAcademicEvents.belongsTo(db.models.user, { foreignKey: 'idUser' });
userJoinAcademicEvents.belongsTo(db.models.academicEvents, { foreignKey: 'idAcademicEvents' });

export default userJoinAcademicEvents;