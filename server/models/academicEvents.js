import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const academicEvents = db.define(
  "academicEvents",
  {
    idAcademicEvents: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idOrganizer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eventsName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventsLoc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventsJenjang: {
      type: DataTypes.ENUM(
        'Sekolah Dasar',
        'Sekolah Menengah Pertama',
        'Sekolah Menengah Atas',
        'Universitas',
        'Umum'
      ),
      allowNull: false,
    },
    eventsHeld: {
      type: DataTypes.ENUM('luring', 'daring'),
      allowNull: false,
    },
    eventCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventsDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    registrationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    eventsTheme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registrationFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    capacityTotal: {
      type: DataTypes.INTEGER,
    },
    capacityTersisa: {
      type: DataTypes.INTEGER,
    },
    capacityStatus: {
      type: DataTypes.ENUM('full', 'available'),
      defaultValue: 'available',
    },
    deskripsiEvent: {
      type: DataTypes.STRING(500), 
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "academicEvents",
  }
);

academicEvents.belongsTo(db.models.eventOrganizer, { foreignKey: 'idOrganizer' });

export default academicEvents;
