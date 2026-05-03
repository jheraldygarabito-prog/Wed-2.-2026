import mysql from 'mysql2/promise';

const syncEnabled = process.env.MYSQL_SYNC_ENABLED === 'true';

let mysqlPool;

const getMysqlPool = () => {
    if (!syncEnabled) {
        return null;
    }

    if (!mysqlPool) {
        mysqlPool = mysql.createPool({
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || '',
            database: process.env.MYSQL_DB || 'doguito',
            port: Number(process.env.MYSQL_PORT || 3306),
            waitForConnections: true,
            connectionLimit: 10,
        });
    }

    return mysqlPool;
};

export const syncMysqlCliente = async (action, cliente) => {
    const pool = getMysqlPool();
    if (!pool) return;

    if (action === 'delete') {
        await pool.execute('UPDATE mascota SET dueno_id = NULL WHERE dueno_id = ?', [cliente.id]);
        await pool.execute('DELETE FROM clientes WHERE id = ?', [cliente.id]);
        return;
    }

    if (action === 'insert') {
        await pool.execute(
            'INSERT INTO clientes (id, nombre, email) VALUES (?, ?, ?)',
            [cliente.id, cliente.nombre, cliente.email]
        );
        return;
    }

    await pool.execute(
        'UPDATE clientes SET nombre = ?, email = ? WHERE id = ?',
        [cliente.nombre, cliente.email, cliente.id]
    );
};

export const syncMysqlProducto = async (action, producto) => {
    const pool = getMysqlPool();
    if (!pool) return;

    if (action === 'delete') {
        await pool.execute('DELETE FROM productos WHERE id = ?', [producto.id]);
        return;
    }

    if (action === 'insert') {
        await pool.execute(
            'INSERT INTO productos (id, nombre, precio, descripcion) VALUES (?, ?, ?, ?)',
            [producto.id, producto.nombre, producto.precio, producto.descripcion]
        );
        return;
    }

    await pool.execute(
        'UPDATE productos SET nombre = ?, precio = ?, descripcion = ? WHERE id = ?',
        [producto.nombre, producto.precio, producto.descripcion, producto.id]
    );
};

export const syncMysqlMascota = async (action, mascota) => {
    const pool = getMysqlPool();
    if (!pool) return;

    if (action === 'delete') {
        await pool.execute('DELETE FROM mascota WHERE id = ?', [mascota.id]);
        return;
    }

    if (action === 'insert') {
        await pool.execute(
            'INSERT INTO mascota (id, nombre, edad, raza, peso, dueno_id) VALUES (?, ?, ?, ?, ?, ?)',
            [mascota.id, mascota.nombre, mascota.edad, mascota.raza, mascota.peso, mascota.duenoId]
        );
        return;
    }

    await pool.execute(
        'UPDATE mascota SET nombre = ?, edad = ?, raza = ?, peso = ?, dueno_id = ? WHERE id = ?',
        [mascota.nombre, mascota.edad, mascota.raza, mascota.peso, mascota.duenoId, mascota.id]
    );
};
