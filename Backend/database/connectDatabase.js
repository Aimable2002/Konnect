import pkg from 'pg';
const { Pool } = pkg;

const connectDatabase = () => {
    try {
        const pool = new Pool({
            host: process.env.POSTGRESQL_HOST,
            port: process.env.PORT_PG,
            user: process.env.POSTGRESQL_USER, // PostgreSQL user
            password: process.env.POSTGRESQL_PASSWORD,      // Your PostgreSQL password
            database: process.env.POSTGRESQL_DB, // Your database name
            max: 20, // Maximum number of connections in the pool
            idleTimeoutMillis: 600000, 
            connectionTimeoutMillis: 2000 
        });

        // Test the connection
        pool.query('SELECT NOW()', (err, res) => {
            if (err) {
                console.error('Failed to connect to the PostgreSQL database:', err);
                return;
            }
            console.log('Connected to the PostgreSQL database at:', res.rows[0].now);
        });

        return pool;
    } catch (error) {
        console.error('Failed to connect to the PostgreSQL database:', error);
    }
};

export default connectDatabase;