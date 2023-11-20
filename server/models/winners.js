import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const winners = db.define(
  "winners",
  {
    idWinners: {
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
    idOrganizer: {
      type: DataTypes.INTEGER,
      allowNull: true, 
      defaultValue: null, 
    },
    rankWinners: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "winners",
  }
);

winners.belongsTo(db.models.user, { foreignKey: 'idUser' });
winners.belongsTo(db.models.competition, { foreignKey: 'idCompetition' });
winners.belongsTo(db.models.eventOrganizer, { foreignKey: 'idOrganizer' });

export default winners;