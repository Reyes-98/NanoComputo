const mysql = require('mysql2/promise');

class baseDeDatos {
    constructor() {
        console.log("paso")
        if (!baseDeDatos.instance) {
            baseDeDatos.instance = this;
            this.conexion = null;
            this.crearConexion();
        }
        return baseDeDatos.instance;
    }

    async crearConexion() {
        try {
            this.conexion = await mysql.createConnection({
                host: /*process.env.DB_HOST || */ "localhost",
                user: /*process.env.DB_USER || */"root",
                password: /*process.env.DB_PASSWORD || */ "",
                database: /*process.env.DB_DATABASE || */ "nano_computo",
                port: /*process.env.DB_PORT ||*/ "3306"
            });
            console.log('Conectado a la base de datos MySQL!');
        } catch (err) {
            console.error('Error en la conexión a la base de datos:', err);
            throw err;
        }
    }

    async query(sql, params) {
        try {
            return await this.conexion.query(sql, params);
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    async close() {
        try {
            if (this.conexion) {
                await this.conexion.end();
                console.log('Conexión cerrada.');
            }
        } catch (err) {
            console.error('Error closing connection:', err);
            throw err;
        }
    }
}

const instanciaConexion = new baseDeDatos();

module.exports = instanciaConexion;
