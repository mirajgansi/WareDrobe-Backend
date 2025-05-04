import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize, testConnection } from './database/db.js';
import dressRoute from './routes/dressRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Convert ES module URL to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: `http://localhost:3000`,
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Correct usage of __dirname for serving static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.use('/dress', dressRoute);

testConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on: http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to start server due to database connection issues:', err);
});
