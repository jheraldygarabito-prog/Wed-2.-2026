import sql from 'mssql';

const syncEnabled = process.env.SQLSERVER_SYNC_ENABLED === 'true';
const sqlServerHost = process.env.SQLSERVER_HOST || process.env.DB_HOST;
const [serverName, instanceName] = sqlServerHost.split('\\');

const sqlConfig = {
    user: process.env.SQLSERVER_USER || process.env.DB_USER,
    password: process.env.SQLSERVER_PASSWORD || process.env.DB_PASSWORD,
    server: serverName,
    database: process.env.SQLSERVER_DB || process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        ...(instanceName ? { instanceName } : {}),
    },
};

if (!instanceName) {
    sqlConfig.port = Number(process.env.SQLSERVER_PORT || process.env.DB_PORT || 1433);
}

let sqlPool;

const getSqlPool = async () => {
    if (!syncEnabled) {
        return null;
    }

    if (!sqlPool) {
        sqlPool = await new sql.ConnectionPool(sqlConfig).connect();
    }

    return sqlPool;
};

export const syncCliente = async (action, cliente) => {
    const pool = await getSqlPool();
    if (!pool) return;

    if (action === 'delete') {
        await pool.request()
            .input('id', sql.UniqueIdentifier, cliente.id)
            .query('UPDATE mascota SET dueno_id = NULL WHERE dueno_id = @id; DELETE FROM clientes WHERE id = @id');
        return;
    }

    if (action === 'insert') {
        await pool.request()
            .input('id', sql.UniqueIdentifier, cliente.id)
            .input('nombre', sql.VarChar(255), cliente.nombre)
            .input('email', sql.VarChar(255), cliente.email)
            .query('INSERT INTO clientes (id, nombre, email) VALUES (@id, @nombre, @email)');
        return;
    }

    await pool.request()
        .input('id', sql.UniqueIdentifier, cliente.id)
        .input('nombre', sql.VarChar(255), cliente.nombre)
        .input('email', sql.VarChar(255), cliente.email)
        .query('UPDATE clientes SET nombre = @nombre, email = @email WHERE id = @id');
};

export const syncProducto = async (action, producto) => {
    const pool = await getSqlPool();
    if (!pool) return;

    if (action === 'delete') {
        await pool.request()
            .input('id', sql.UniqueIdentifier, producto.id)
            .query('DELETE FROM productos WHERE id = @id');
        return;
    }

    if (action === 'insert') {
        await pool.request()
            .input('id', sql.UniqueIdentifier, producto.id)
            .input('nombre', sql.VarChar(255), producto.nombre)
            .input('precio', sql.Decimal(10, 2), producto.precio)
            .input('descripcion', sql.VarChar(sql.MAX), producto.descripcion)
            .query('INSERT INTO productos (id, nombre, precio, descripcion) VALUES (@id, @nombre, @precio, @descripcion)');
        return;
    }

    await pool.request()
        .input('id', sql.UniqueIdentifier, producto.id)
        .input('nombre', sql.VarChar(255), producto.nombre)
        .input('precio', sql.Decimal(10, 2), producto.precio)
        .input('descripcion', sql.VarChar(sql.MAX), producto.descripcion)
        .query('UPDATE productos SET nombre = @nombre, precio = @precio, descripcion = @descripcion WHERE id = @id');
};

export const syncMascota = async (action, mascota) => {
    const pool = await getSqlPool();
    if (!pool) return;

    if (action === 'delete') {
        await pool.request()
            .input('id', sql.UniqueIdentifier, mascota.id)
            .query('DELETE FROM mascota WHERE id = @id');
        return;
    }

    if (action === 'insert') {
        await pool.request()
            .input('id', sql.UniqueIdentifier, mascota.id)
            .input('nombre', sql.VarChar(255), mascota.nombre)
            .input('edad', sql.Int, mascota.edad)
            .input('raza', sql.VarChar(255), mascota.raza)
            .input('peso', sql.Decimal(10, 2), mascota.peso)
            .input('duenoId', sql.UniqueIdentifier, mascota.duenoId)
            .query(`
                INSERT INTO mascota (id, nombre, edad, raza, peso, dueno_id)
                VALUES (@id, @nombre, @edad, @raza, @peso, @duenoId)
            `);
        return;
    }

    await pool.request()
        .input('id', sql.UniqueIdentifier, mascota.id)
        .input('nombre', sql.VarChar(255), mascota.nombre)
        .input('edad', sql.Int, mascota.edad)
        .input('raza', sql.VarChar(255), mascota.raza)
        .input('peso', sql.Decimal(10, 2), mascota.peso)
        .input('duenoId', sql.UniqueIdentifier, mascota.duenoId)
        .query(`
            UPDATE mascota
            SET nombre = @nombre, edad = @edad, raza = @raza, peso = @peso, dueno_id = @duenoId
            WHERE id = @id
        `);
};
