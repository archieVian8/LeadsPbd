import db from "../config/database.js";
import competition from "../models/competition.js";
import userJoinCompetition from "../models/userJoinCompetition.js";
import { Sequelize } from "sequelize";

export const createCompetition = async (req, res) => {
    const {
        idOrganizer,
        competitionName,
        competitionCategory,
        jenjang,
        registrationDate,
        deskripsi,
        tingkat,
        prizes,
        requirement,
        capacityTotal
    } = req.body;

    try {
        console.log("createCompetition - called");

        const result = await competition.sequelize.query(
            'CALL CreateCompetition(:idOrganizer, :competitionName, :competitionCategory, :jenjang, :registrationDate, :deskripsi, :tingkat, :prizes, :requirement, :capacityTotal)',
            {
                replacements: {
                    idOrganizer,
                    competitionName,
                    competitionCategory,
                    jenjang,
                    registrationDate,
                    deskripsi,
                    tingkat,
                    prizes,
                    requirement,
                    capacityTotal,
                },
                type: competition.sequelize.QueryTypes.RAW,
            }
        );

        if (result && result[0] && result[0][0] && result[0][0].competitionId) {
            const competitionId = result[0][0].competitionId;
            return res.json({ msg: 'Competition created successfully', competitionId });
        } else {
            console.error(result);
            return res.status(500).json({ msg: 'Competition created successfully' });
        }
    } catch (error) {
        console.error(error);
        const errorMessage = error.original ? error.original.message : 'Internal Server Error';
        return res.status(500).json({ msg: errorMessage });
    }
};


export const viewAllCompetitions = async (req, res) => {
  try {
      const result = await db.query(
          'CALL ViewAllCompetitions()',
          {
              type: Sequelize.QueryTypes.RAW,
          }
      );

      console.log(result);
      res.json(result);

  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const viewCompetitionsByJenjang = async (req, res) => {
  try {
      const { jenjang } = req.params;  

      const result = await db.query(
          'CALL ViewCompetitionsByJenjang(:p_jenjang)',
          {
              replacements: { p_jenjang: jenjang },  
              type: Sequelize.QueryTypes.RAW,
          }
      );

      console.log(result);
      res.json(result);

  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const viewCompetitionsByTingkat = async (req, res) => {
  try {
      const { tingkat } = req.params;

      const result = await db.query(
          'CALL ViewCompetitionsByTingkat(:p_tingkat)',
          {
              replacements: { p_tingkat: tingkat },
              type: Sequelize.QueryTypes.RAW,
          }
      );

      console.log(result);
      res.json(result);

  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const viewCompetitionsByTingkatJenjang = async (req, res) => {
  try {
      const { tingkat, jenjang } = req.params;

      const result = await db.query(
          'CALL ViewCompetitionsByTingkatJenjang(:p_tingkat, :p_jenjang)',
          {
              replacements: { p_tingkat: tingkat, p_jenjang: jenjang },
              type: Sequelize.QueryTypes.RAW,
          }
      );

      console.log(result);
      res.json(result);

  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const joinCompetition = async (req, res) => {
    try {
        console.log("joinCompetition - called");
        const { userId, competitionId } = req.body;

        const [result] = await db.query('CALL JoinCompetition(:p_userId, :p_competitionId)', {
            replacements: { p_userId: userId, p_competitionId: competitionId },
            type: db.QueryTypes.RAW,
        });

        if (result && 'Status' in result) {
            console.log(result.Status);
            return res.json({ status: result.Status });
        } else {
            console.log("Empty result");
            return res.json({ msg: 'Empty result' });
        }
    } catch (error) {
        console.error(error);
        const errorMessage = error.original ? error.original.message : 'Internal Server Error';
        return res.status(500).json({ msg: errorMessage });
    }
};

export const viewCompetitionApplicants = async (req, res) => {
    try {
        const { organizerId, competitionId } = req.body;

        const result = await db.query(
            'CALL ViewCompetitionApplicants(:p_organizerId, :p_competitionId)',
            {
                replacements: { p_organizerId: organizerId, p_competitionId: competitionId },
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

export const viewCompetitionById = async (req, res) => {
    try {
        console.log("ViewCompetitionById - Called");
        const { competitionId } = req.body;

        const [result] = await db.query('CALL ViewCompetitionById(:p_competitionId)', {
            replacements: { p_competitionId: competitionId },
            type: db.QueryTypes.RAW,
        });
        
        console.log(result);
        res.json(result);
  
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


