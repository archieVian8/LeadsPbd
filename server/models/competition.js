import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const competition = db.define(
  "competition",
  {
    idCompetition: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idOrganizer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    competitionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    competitionCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenjang: {
      type: DataTypes.ENUM('Sekolah Dasar', 'Sekolah Menengah Pertama', 'Sekolah Menengah Atas', 'Universitas', 'Umum'),
      allowNull: false,
    },
    registrationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tingkat: {
      type: DataTypes.ENUM('Kota', 'Provinsi', 'Nasional'),
      allowNull: false,
    },
    prizes: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    requirement: {
      type: DataTypes.STRING,
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
  },
  {
    timestamps: false,
    tableName: "competition",
  }
);

competition.belongsTo(db.models.eventOrganizer, { foreignKey: 'idOrganizer' });

export default competition;
