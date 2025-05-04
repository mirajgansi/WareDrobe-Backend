import { Sequelize } from "sequelize";

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME || 'MyWareDrobe', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD || 'admin123', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false, // Disable logging for cleaner output
});

// Test database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('DB connection successful ............................');
    } catch (error) {
        console.error('Unable to connect to the database ...............', error);
    }
}

// Export the sequelize instance and testConnection function
export {sequelize, testConnection};