import db from "../config/database.js";
import user from "../models/user.js";
import { Sequelize } from "sequelize";

export const signUpUser = async (req, res) => {
    const {
        firstName, lastName, email, password, phoneNumber, elementarySchool, juniorHighSchool,
        seniorHighSchool, university, gender, about, birthdate
    } = req.body;

    try {
        console.log("signUpUser - called");

        const existingUser = await user.findOne({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ msg: 'Email is already registered' });
        }

        const result = await user.sequelize.query(
            'CALL SignUpUser(:firstName, :lastName, :email, :password, :phoneNumber, :elementarySchool, :juniorHighSchool, :seniorHighSchool, :university, :gender, :about, :birthdate)',
            {
                replacements: {
                    firstName,
                    lastName,
                    email,
                    password,
                    phoneNumber,
                    elementarySchool,
                    juniorHighSchool,
                    seniorHighSchool,
                    university,
                    gender,
                    about,
                    birthdate
                },
                type: user.sequelize.QueryTypes.RAW,
            }
        );

        const resultRows = result[0];

        if (resultRows && resultRows.length > 0) {
            const firstRow = resultRows[0];
            const status = firstRow.status;

            if (status === 'Success') {
                return res.json({ msg: 'Account register success' });
            } else {
                console.error('Failed to register account:', result);
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

export const signInUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("signInUser - called");

        const result = await user.sequelize.query(
            'CALL SignInUser(:email, :password)',
            {
                replacements: {
                    email,
                    password,
                },
                type: user.sequelize.QueryTypes.RAW,
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