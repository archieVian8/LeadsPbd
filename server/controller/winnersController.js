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

        if (result && result[0] && result[0].Status) {
            console.log({ status: result[0].Status });
            return res.json({ status: result[0].Status });
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

        const [
            winners,
        ] = await db.query(
            'CALL ViewCompetitionWinners(:p_organizerId, :p_competitionId)',
            {
                replacements: { p_organizerId: organizerId, p_competitionId: competitionId },
                type: db.QueryTypes.RAW,
            }
        );

        if (winners && winners.length > 0) {
            return res.json({ winners });
        } else {
            console.log(winners);
            return res.json({ msg: 'Winners Competition' });
        }
    } catch (error) {
        console.error(error);
        const errorMessage = error.original ? error.original.message : 'Internal Server Error';
        return res.status(500).json({ msg: errorMessage });
    }
};