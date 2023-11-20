import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const userAchievement = db.define(
  "userAchievement",
  {
    idAchievement: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idWinners: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    idCompetition: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    idOrganizer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    idAcademicEvents: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    achievementDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "userAchievement",
    timestamps: false,
  }
);

userAchievement.belongsTo(db.models.user, { foreignKey: 'idUser' });
userAchievement.belongsTo(db.models.winners, { foreignKey: 'idWinners' });
userAchievement.belongsTo(db.models.competition, { foreignKey: 'idCompetition' });
userAchievement.belongsTo(db.models.eventOrganizer, { foreignKey: 'idOrganizer' });
userAchievement.belongsTo(db.models.academicEvents, { foreignKey: 'idAcademicEvents' });

export default userAchievement;