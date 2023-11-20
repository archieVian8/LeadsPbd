import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const userJoinCompetition = db.define(
  "userJoinCompetition",
  {
    idUserJoinCompetition: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idCompetition: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "userJoinCompetition",
  }
);

userJoinCompetition.belongsTo(db.models.user, { foreignKey: 'idUser' });
userJoinCompetition.belongsTo(db.models.competition, { foreignKey: 'idCompetition' });

export default userJoinCompetition;