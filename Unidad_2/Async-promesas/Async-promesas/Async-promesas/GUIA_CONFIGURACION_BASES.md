# Guia de configuracion: Supabase + SQL Server

Este proyecto quedo configurado para guardar datos en dos bases al mismo tiempo:

- Supabase, usando PostgreSQL.
- SQL Server local, usando la base `doguito`.

## Flujo de guardado

La pagina web ya no guarda directo en Supabase. Ahora usa el backend local:

```txt
Frontend -> Backend Node/Express -> Supabase
                              -> SQL Server
```

## Backend

El backend esta en:

```txt
backend-doguito/server.js
```

Para iniciarlo:

```bash
cd "Unidad_2/Async-promesas/Async-promesas/Async-promesas/backend-doguito"
npm start
```

El backend corre en:

```txt
http://localhost:3000
```

## Rutas disponibles

Clientes:

```txt
GET    /clientes
POST   /clientes
GET    /clientes/:id
PATCH  /clientes/:id
DELETE /clientes/:id
```

Productos:

```txt
GET    /productos
POST   /productos
GET    /productos/:id
PATCH  /productos/:id
DELETE /productos/:id
```

Mascotas:

```txt
GET    /mascota
POST   /mascota
GET    /mascota/:id
PATCH  /mascota/:id
DELETE /mascota/:id
```

## Archivos importantes

Conexion a Supabase:

```txt
backend-doguito/conexion.js
```

Sincronizacion con SQL Server:

```txt
backend-doguito/sqlserver-sync.js
```

Configuracion de variables:

```txt
backend-doguito/.env
```

Servicios del frontend:

```txt
service/client-service.js
service/producto-service.js
service/animales-service.js
```

## Variables principales del .env

Supabase:

```env
DB_TYPE=postgres
DATABASE_URL=postgresql://...
```

SQL Server:

```env
SQLSERVER_SYNC_ENABLED=true
SQLSERVER_HOST=localhost
SQLSERVER_USER=doguito_user
SQLSERVER_PASSWORD=Alina12686130
SQLSERVER_DB=doguito
SQLSERVER_PORT=1433
```

Si `SQLSERVER_SYNC_ENABLED=true`, el backend guarda tambien en SQL Server.

Si `SQLSERVER_SYNC_ENABLED=false`, solo guarda en Supabase.

## Tablas usadas

En Supabase y SQL Server se usan estas tablas:

```txt
clientes
productos
mascota
```

Clientes:

```txt
id
nombre
email
```

Productos:

```txt
id
nombre
precio
descripcion
```

Mascotas:

```txt
id
nombre
edad
raza
peso
dueno_id
```

## SQL para ver datos en SQL Server

```sql
USE doguito;
GO

SELECT * FROM clientes;
SELECT * FROM productos;
SELECT * FROM mascota;
```

## Configuracion que hicimos en SQL Server

En SQL Server Configuration Manager:

```txt
SQL Server Network Configuration
-> Protocols for SQLEXPRESS
-> TCP/IP
```

Se configuro:

```txt
Enabled = Yes
Listen All = Yes
```

En `IP Addresses`, se configuro `IPAll` asi:

```txt
TCP Dynamic Ports =
TCP Port = 1433
```

Tambien se inicio:

```txt
SQL Server Browser
```

Y se reinicio:

```txt
SQL Server (SQLEXPRESS)
```

## Usuario de SQL Server

Se creo el usuario:

```txt
doguito_user
```

Con acceso a la base:

```txt
doguito
```

## Prueba rapida

1. Iniciar backend:

```bash
npm start
```

2. Crear un cliente, producto o mascota desde la web.

3. Revisar en Supabase.

4. Revisar en SQL Server:

```sql
USE doguito;
GO

SELECT * FROM clientes;
SELECT * FROM productos;
SELECT * FROM mascota;
```

