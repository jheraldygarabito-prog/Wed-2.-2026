import pool from './node_modules/conexion.js';

console.log('Probando conexión a la base de datos...');

// La conexión ya se prueba al importar, pero aquí hacemos una consulta simple
try {
    if (process.env.DB_TYPE === 'mssql') {
        const result = await pool.request().query('SELECT 1 AS test');
        console.log('Conexión a SQL Server exitosa:', result.recordset);
    } else if (process.env.DB_TYPE === 'postgres') {
        const result = await pool.query('SELECT 1 AS test');
        console.log('Conexion a PostgreSQL exitosa:', result.rows);
    } else {
        const [rows] = await pool.query('SELECT 1 AS test');
        console.log('Conexión exitosa:', rows);
    }
} catch (error) {
    console.error('Error en la conexión:', error.message);
}
