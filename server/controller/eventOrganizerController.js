import db from "../config/database.js";
import eventOrganizer from "../models/eventOrganizer.js";
import { Sequelize } from "sequelize";

export const signUpEventOrganizer = async (req, res) => {
    const {
        email, password, organizerName, organizerInstitution, organizerAddress, phoneNumber
    } = req.body;

    try {
        console.log("signUpEventOrganizer - called");

        const existingOrganizer = await eventOrganizer.findOne({
            where: {
                email: email,
            },
        });

        if (existingOrganizer) {
            return res.status(400).json({ msg: 'Email is already registered' });
        }

        const result = await eventOrganizer.sequelize.query(
            'CALL SignUpEventOrganizer(:email, :password, :organizerName, :organizerInstitution, :organizerAddress, :phoneNumber)',
            {
                replacements: {
                    email,
                    password,
                    organizerName,
                    organizerInstitution,
                    organizerAddress,
                    phoneNumber
                },
                type: eventOrganizer.sequelize.QueryTypes.RAW,
            }
        );

        const resultRows = result[0];

        if (resultRows && resultRows.length > 0) {
            const firstRow = resultRows[0];
            const status = firstRow.status;

            if (status === 'Success') {
                return res.json({ msg: 'Event Organizer register success' });
            } else {
                console.error('Failed to register event organizer:', result);
                return res.status(500).json({ msg: status });
            }
        } else {
            console.error(result);
            return res.status(500).json({ msg: 'Sukses' });
        }
    } catch (error) {
        console.error(error);
        const errorMessage = error.original ? error.original.message : 'Server Error';
        return res.status(500).json({ msg: errorMessage });
    }
};

export const signInEventOrganizer = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      console.log('signInEventOrganizer - called');
  
      const result = await eventOrganizer.sequelize.query(
        'CALL SignInEventOrganizer(:email, :password)',
        {
          replacements: {
            email,
            password,
          },
          type: eventOrganizer.sequelize.QueryTypes.RAW,
        }
      );
  
      if (result && result[0] && result[0][0] && result[0][0].status) {
        const status = result[0][0].status;
  
        if (status === 'Success') {
          return res.json({ msg: 'Sign in success' });
        } else {
          console.error(result);
          return res.status(401).json({ msg: 'Invalid email or password' });
        }
      } else {
        console.error(result);
        return res.status(500).json({ msg: 'Lihat Pada Terminal' });
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.original ? error.original.message : 'Internal Server Error';
      return res.status(500).json({ msg: errorMessage });
    }
  };