import connectDatabase from "../database/connectDatabase.js";

const pool = connectDatabase();

export const getPeople = async (req, res) => {
    try {
        const selectUsers = 'SELECT * FROM USERS';
        const { rows: results } = await pool.query(selectUsers);
        if (results.length === 0) {
            console.log('invite friend');
            return res.status(300).json('invite friend');
        }
        return res.status(200).json(results);
    } catch (error) {
        console.log('internal server error:', error.message);
        return res.status(500).json({ error: 'internal server error' });
    }
};

export const getOnPeople = async (req, res) => {
    try {
        const USERID = req.user.userId;
        const selectOnPeople = 'SELECT * FROM USERS WHERE userId = $1';
        const { rows: result } = await pool.query(selectOnPeople, [USERID]);
        if (result.length === 0) {
            return res.status(404).json('user not found');
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log('internal server error:', error.message);
        return res.status(500).json({ error: 'internal server error' });
    }
};

export const getUsersTask = async (req, res) => {
    try {
        const USERID = req.user.userId;
        const selectUsersTask = 'SELECT * FROM USERS_TASK_VIEW WHERE Approval = $1 AND task_giverId <> $2 ORDER BY taskId DESC';
        const { rows: result } = await pool.query(selectUsersTask, ['Approve', USERID]);
        if (result.length === 0) {
            console.log('No task yet');
            return res.status(400).json('No task yet');
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log('internal server error:', error.message);
        return res.status(500).json({ error: 'internal server error' });
    }
};

export const getHistory = async (req, res) => {
    try {
        const USERID = req.user.userId;
        if (!USERID) {
            console.log('missing data');
            return res.status(400).json('missing data');
        }
        const fetchHistory = 'SELECT * FROM CLIENT_HISTORY WHERE task_giverId = $1 OR task_takerId = $2';
        const { rows: result } = await pool.query(fetchHistory, [USERID, USERID]);
        return res.status(200).json(result);
    } catch (error) {
        console.log('internal server error:', error.message);
        return res.status(500).json({ error: 'internal server error' });
    }
};

export const getHistory2 = async (req, res) => {
    try {
        const USERID = req.user.userId;
        if (!USERID) {
            console.log('missing data');
            return res.status(400).json('missing data');
        }
        const fetchHistory = 'SELECT * FROM INVITEE_VIEW WHERE inviterId = $1 OR TakerId = $2';
        const { rows: result } = await pool.query(fetchHistory, [USERID, USERID]);
        return res.status(200).json(result);
    } catch (error) {
        console.log('internal server error:', error.message);
        return res.status(500).json({ error: 'internal server error' });
    }
};

export const getLogUser = async (req, res) => {
    try {
        const user = req.user.userId;
        const fetchUser = 'SELECT * FROM USERS WHERE userId = $1';
        const { rows: result } = await pool.query(fetchUser, [user]);
        return res.status(200).json(result);
    } catch (error) {
        console.log('internal server error:', error.message);
        return res.status(500).json({ error: 'internal server error' });
    }
};
