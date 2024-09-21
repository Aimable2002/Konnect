import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import connectDatabase from '../database/connectDatabase.js';

const pool = connectDatabase();

export const signup = async (req, res) => {
    try {
        const { First_name, Last_name, userName, Title, Balance, Email, Phone_number, Password, confirmPassword } = req.body;

        if (!First_name || !Last_name || !userName || !Title || !Email || !Phone_number || !Password || !confirmPassword) {
            return res.status(409).json('Fill all the fields');
        }
        if (Password !== confirmPassword) {
            return res.status(409).json('Passwords do not match');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        // Check if the username already exists
        const checkUserQuery = 'SELECT * FROM USERS WHERE userName = $1';
        const { rows: existingUsers } = await pool.query(checkUserQuery, [userName]);

        if (existingUsers.length > 0) {
            return res.status(404).json('Username already taken');
        }

        // Insert new user
        const insertUserQuery = 'INSERT INTO users (First_name, Last_name, userName, Title, Email, Phone_number, Balance, Password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING userId';
        const { rows: insertedUser } = await pool.query(insertUserQuery, [First_name, Last_name, userName, Title, Email, Phone_number, Balance || 0, Password]);

        const userId = insertedUser[0].userId;
        const token = jwt.sign({ userId }, process.env.SECRET_KEY_AUTH, { expiresIn: '365d' });

        return res.status(200).json({ token });
    } catch (error) {
        console.log('Error in signup controller:', error.message);
        res.status(500).json({ error: 'Internal server signup error' });
    }
};


export const login = async (req, res) => {
    try {
        const { userName, Password } = req.body;

        if (!userName || !Password) {
            return res.status(409).json('Fill all the fields');
        }

        const trackUserQuery = 'SELECT * FROM USERS WHERE userName = $1';
        const { rows: result } = await pool.query(trackUserQuery, [userName]);

        if (result.length === 0) {
            return res.status(400).json('User not found');
        }

        const user = result[0];
        // const isPasswordValid = await bcrypt.compare(Password, user.Password);
        // console.log('ispasswordvalid :', isPasswordValid)

        // if (!isPasswordValid) {
        //     return res.status(400).json('Incorrect password');
        // }
        if(user.password  !== Password){
            return res.status(400).json('Incorrect password')
        }
        const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY_AUTH, { expiresIn: '365d' });
        console.log('token :', token)
        return res.status(200).json({ userId: user.userId, token });
    } catch (error) {
        console.log('Error in login controller:', error.message);
        res.status(500).json({ error: 'Internal login server error' });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json("Successfully logged out");
    } catch (error) {
        console.log("Internal server logout error:", error.message);
        res.status(500).json({ error: "Internal server logout error" });
    }
};