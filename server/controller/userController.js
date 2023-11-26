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

        const [result] = await user.sequelize.query(
            'CALL SignInUser(:p_email, :p_password)',
            {
                replacements: { p_email: email, p_password: password },
                type: user.sequelize.QueryTypes.RAW,
            }
        );

        console.log("Result from SignInUser stored procedure:", result);

        if (result && 'status' in result && 'idUser' in result) {
            console.log(result.status);

            return res.status(200).json(result);
        } else {
            console.log("Unexpected result from SignInUser stored procedure");
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    } catch (error) {
        console.error("Error in signInUser:", error);
        return res.status(500).json({ msg: "Connection Lost" });
    }
};

export const viewProfileById = async (req, res) => {
    try {
        const { userId } = req.body;

        const result = await db.query('CALL ViewProfileById(:p_userId)', {
            replacements: { p_userId: userId },
            type: db.QueryTypes.RAW,
        });

        if (result && result[0] && result[0][0]) {
            res.json(result[0][0]);
        } else {
            res.json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};
