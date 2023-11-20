import db from "../config/database.js";
import userAchievement from "../models/userAchievement.js";
import { Sequelize } from "sequelize";

export const viewUserAchievement = async (req, res) => {
  try {
    const { userId } = req.body;

    const result = await db.query(
      'CALL ViewUserAchievement(:p_userId)',
      {
        replacements: { p_userId: userId },
        type: db.QueryTypes.RAW,
      }
    );

    if (result && result[0] && result[0][0] && result[0][0].Status) {
      console.log({ status: result[0][0].Status });
      return res.json({ status: result[0][0].Status });
    } else {
      console.log(result);
      return res.json(result);
    }
  } catch (error) {
    console.error(error);
    const errorMessage = error.original ? error.original.message : 'Internal Server Error';
    return res.status(500).json({ msg: errorMessage });
  }
};