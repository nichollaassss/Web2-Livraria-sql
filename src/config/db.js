import mysql from "mysql2/promise";

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "livraria_entrelinhas",
    waitForConnections: true,
    connectionLimit: 10,
    decimalNumbers: true
};

export const pool = mysql.createPool(dbConfig);

export async function testConnection() {
    const connection = await pool.getConnection();
    try {
        await connection.ping();
        console.log("Conexão com o banco MySQL estabelecida com sucesso!");
    } finally {
        connection.release();
    }
}
