const express= require('express')
const cors= require('cors')
const bodyParser= require('body-parser')
const { sequelize, testConnection } = require('./database/db'); 
const dressRoute = require('./routes/dressRoutes');

const path = require('path');
const Dress = require('./model/dress');


const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors({
    origin: `http://localhost:3000`,
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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