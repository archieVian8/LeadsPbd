import db from "../config/database.js";
import winners from "../models/winners.js";
import { Sequelize } from "sequelize";

export const chooseCompetitionWinnersRanked = async (req, res) => {
    try {
        const { organizerId, competitionId, winnerInfo } = req.body;

        if (!organizerId) {
            return res.status(400).json({ msg: 'organizerId is required' });
        }

        const [result] = await db.query(
            'CALL ChooseCompetitionWinnersRanked(:p_organizerId, :p_competitionId, :p_winnerInfo)',
            {
                replacements: {
                    p_organizerId: organizerId,
                    p_competitionId: competitionId,
                    p_winnerInfo: winnerInfo,
                },
                type: db.QueryTypes.RAW,
            }
        );

        console.log('Result:', result);

        if (result && Object.keys(result).length > 0) {
            console.log(result);
            return res.json(result);
        } else {
            console.log('Unexpected result:', result);
            return res.status(500).json({ msg: 'Unexpected result from stored procedure' });
        }
    } catch (error) {
        console.error('Error:', error);

        const errorMessage = error.original ? error.original.message : 'Internal Server Error';
        return res.status(500).json({ msg: errorMessage });
    }
};

export const viewCompetitionWinners = async (req, res) => {
    try {
        console.log("ViewCompetitionWinners - Called")
        const { organizerId, competitionId } = req.body;

        const [result] = await db.query(
            'CALL ViewCompetitionWinners(:p_organizerId, :p_competitionId)',
            {
                replacements: { p_organizerId: organizerId, p_competitionId: competitionId },
                type: db.QueryTypes.RAW,
            }
        );

        const winners = result;

        if (winners && Object.keys(winners).length > 0) {
            console.log(winners);
            return res.json(winners);
        } else {
            console.log("ViewCompetitionWinners - No winners found");
            return res.json({ msg: 'No winners found' });
        }
    } catch (error) {
        console.error(error);
        const errorMessage = error.original ? error.original.message : 'Internal Server Error';
        return res.status(500).json({ msg: errorMessage });
    }
};