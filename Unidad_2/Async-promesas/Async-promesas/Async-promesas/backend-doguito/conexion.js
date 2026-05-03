import dns from 'dns';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
dns.setDefaultResultOrder('ipv4first');

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 10000,
});

export default pool;
