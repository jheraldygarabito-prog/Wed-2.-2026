import cors from 'cors';
import express from 'express';
import pool from './conexion.js';
import { syncMysqlCliente, syncMysqlMascota, syncMysqlProducto } from './mysql-sync.js';
import { syncCliente, syncMascota, syncProducto } from './sqlserver-sync.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/clientes', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, nombre, email FROM clientes ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/clientes/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, nombre, email FROM clientes WHERE id = $1',
            [req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/clientes', async (req, res) => {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
        return res.status(400).json({ message: 'Nombre y email son obligatorios' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO clientes (nombre, email) VALUES ($1, $2) RETURNING id, nombre, email',
            [nombre, email]
        );
        await syncCliente('insert', result.rows[0]);
        await syncMysqlCliente('insert', result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.patch('/clientes/:id', async (req, res) => {
    const { nombre, email } = req.body;

    try {
        const result = await pool.query(
            'UPDATE clientes SET nombre = $1, email = $2 WHERE id = $3 RETURNING id, nombre, email',
            [nombre, email, req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        await syncCliente('update', result.rows[0]);
        await syncMysqlCliente('update', result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/clientes/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM clientes WHERE id = $1 RETURNING id, nombre, email',
            [req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        await syncCliente('delete', result.rows[0]);
        await syncMysqlCliente('delete', result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, nombre, precio, descripcion FROM productos ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/productos/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, nombre, precio, descripcion FROM productos WHERE id = $1',
            [req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/productos', async (req, res) => {
    const { nombre, precio, descripcion } = req.body;

    if (!nombre || !precio || !descripcion) {
        return res.status(400).json({ message: 'Nombre, precio y descripcion son obligatorios' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO productos (nombre, precio, descripcion) VALUES ($1, $2, $3) RETURNING id, nombre, precio, descripcion',
            [nombre, precio, descripcion]
        );
        await syncProducto('insert', result.rows[0]);
        await syncMysqlProducto('insert', result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.patch('/productos/:id', async (req, res) => {
    const { nombre, precio, descripcion } = req.body;

    try {
        const result = await pool.query(
            'UPDATE productos SET nombre = $1, precio = $2, descripcion = $3 WHERE id = $4 RETURNING id, nombre, precio, descripcion',
            [nombre, precio, descripcion, req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await syncProducto('update', result.rows[0]);
        await syncMysqlProducto('update', result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/productos/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM productos WHERE id = $1 RETURNING id, nombre, precio, descripcion',
            [req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await syncProducto('delete', result.rows[0]);
        await syncMysqlProducto('delete', result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/mascota', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT id, nombre, edad, raza, peso, dueno_id AS "duenoId"
            FROM mascota
            ORDER BY id ASC
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/mascota/:id', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, nombre, edad, raza, peso, dueno_id AS "duenoId"
             FROM mascota
             WHERE id = $1`,
            [req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/mascota', async (req, res) => {
    const { nombre, edad, raza, peso, duenoId } = req.body;

    if (!nombre || !edad || !raza || !peso || !duenoId) {
        return res.status(400).json({ message: 'Nombre, edad, raza, peso y duenoId son obligatorios' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO mascota (nombre, edad, raza, peso, dueno_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, nombre, edad, raza, peso, dueno_id AS "duenoId"`,
            [nombre, edad, raza, peso, duenoId]
        );
        await syncMascota('insert', result.rows[0]);
        await syncMysqlMascota('insert', result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.patch('/mascota/:id', async (req, res) => {
    const { nombre, edad, raza, peso, duenoId } = req.body;

    try {
        const result = await pool.query(
            `UPDATE mascota
             SET nombre = $1, edad = $2, raza = $3, peso = $4, dueno_id = $5
             WHERE id = $6
             RETURNING id, nombre, edad, raza, peso, dueno_id AS "duenoId"`,
            [nombre, edad, raza, peso, duenoId, req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }

        await syncMascota('update', result.rows[0]);
        await syncMysqlMascota('update', result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/mascota/:id', async (req, res) => {
    try {
        const result = await pool.query(
            `DELETE FROM mascota
             WHERE id = $1
             RETURNING id, nombre, edad, raza, peso, dueno_id AS "duenoId"`,
            [req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }

        await syncMascota('delete', result.rows[0]);
        await syncMysqlMascota('delete', result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
