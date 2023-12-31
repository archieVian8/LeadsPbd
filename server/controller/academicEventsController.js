import db from "../config/database.js";
import academicEvents from "../models/academicEvents.js";
import { Sequelize } from "sequelize";

export const createAcademicEvent = async (req, res) => {
    const {
      idOrganizer,
      eventsName,
      eventsLoc,
      eventsJenjang,
      eventsHeld,
      eventCategory,
      eventsDate,
      registrationDate,
      eventsTheme,
      registrationFee,
      capacityTotal,
      deskripsiEvent, 
    } = req.body;
  
    try {
      console.log("createAcademicEvent - called");
  
      const result = await academicEvents.sequelize.query(
        'CALL CreateAcademicEvent(:idOrganizer, :eventsName, :eventsLoc, :eventsJenjang, :eventsHeld, :eventCategory, :eventsDate, :registrationDate, :eventsTheme, :registrationFee, :capacityTotal, :deskripsiEvent)',
        {
          replacements: {
            idOrganizer,
            eventsName,
            eventsLoc,
            eventsJenjang,
            eventsHeld,
            eventCategory,
            eventsDate,
            registrationDate,
            eventsTheme,
            registrationFee,
            capacityTotal,
            deskripsiEvent, 
          },
          type: academicEvents.sequelize.QueryTypes.RAW,
        }
      );
  
      if (result && result[0] && result[0][0] && result[0][0].academicEventId) {
        const academicEventId = result[0][0].academicEventId;
        return res.json({ msg: 'Academic Event created successfully', academicEventId });
      } else {
        console.error(result);
        return res.status(500).json({ msg: 'Academic Event created successfully' });
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.original ? error.original.message : 'Internal Server Error';
      return res.status(500).json({ msg: errorMessage });
    }
  };

export const viewAllAcademicEvents = async (req, res) => {
    try {
        const result = await db.query(
            'CALL ViewAllAcademicEvents()',
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

export const viewAcademicEventsByJenjang = async (req, res) => {
    try {
        const { jenjang } = req.params;

        const result = await db.query(
            'CALL ViewAcademicEventsByJenjang(:p_jenjang)',
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

export const viewAcademicEventsByHeld = async (req, res) => {
    try {
        const { eventsHeld } = req.params;

        const result = await db.query(
            'CALL ViewAcademicEventsByHeld(:p_eventsHeld)',
            {
                replacements: { p_eventsHeld: eventsHeld },
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

export const viewAcademicEventsByJenjangHeld = async (req, res) => {
    try {
        const { jenjang, eventsHeld } = req.params;

        const result = await db.query(
            'CALL ViewAcademicEventsByJenjangHeld(:p_jenjang, :p_eventsHeld)',
            {
                replacements: { p_jenjang: jenjang, p_eventsHeld: eventsHeld },
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

export const joinAcademicEvents = async (req, res) => {
  try {
      console.log("joinAcademicEvents - called");
      const { userId, academicEventsId } = req.body;

      const [result] = await db.query('CALL JoinAcademicEvents(:p_userId, :p_academicEventsId)', {
          replacements: { p_userId: userId, p_academicEventsId: academicEventsId },
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

export const viewAcademicEventsApplicants = async (req, res) => {
    try {
        const { organizerId, academicEventsId } = req.body;

        const result = await db.query(
            'CALL ViewAcademicEventsApplicants(:p_organizerId, :p_academicEventsId)',
            {
                replacements: { p_organizerId: organizerId, p_academicEventsId: academicEventsId },
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

export const viewAcademicEventsById = async (req, res) => {
    try {
        console.log("ViewAcademicEventsById - Called");
        const { academicEventsId } = req.body;

        const [result] = await db.query('CALL ViewAcademicEventsById(:p_academicEventsId)', {
            replacements: { p_academicEventsId: academicEventsId },
            type: db.QueryTypes.RAW,
        });
        
        console.log(result);
        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
    
};