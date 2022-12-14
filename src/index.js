require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models');


const router = require('./routes/router');
const authRoute = require('./routes/authRoute');
const employeeRoute = require('./routes/employeesRoute');
const departmentRoute = require('./routes/departmentRoute');
const categoryRoute = require('./routes/categoryRoute');
const discountRoute = require('./routes/discountRoute');
const paymentMethodRoute = require('./routes/paymentMethodRoute');
const warehouseRoute = require('./routes/warehouseRoute');
const settingRoute = require('./routes/settingRoute');
const itemRoute = require('./routes/itemRoute');
const stockRoute = require('./routes/stockRoute');
const salesRoute = require('./routes/salesRoute');
const tableRoute = require('./routes/tableRoute');
const salesLinesRoute = require('./routes/salesLinesRoute');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const bodyParser = require("body-parser");
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg" || 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }else{
        cb(null, false)
    }
};

app.use('/uploads', express.static('uploads'));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single("image"));



app.use(cors({ origin: true, credentials: true }));
sequelize
    .authenticate()
    .then((result) => {
        console.log('Database Connection has been established successfully');
    }).catch((err) => {
        console.log('Unable to connect to the database:', err);
    });


app.use('/', router);
app.use('/auth', authRoute);
app.use('/employee', employeeRoute);
app.use('/department', departmentRoute);
app.use('/category', categoryRoute);
app.use('/discount', discountRoute);
app.use('/payment', paymentMethodRoute);
app.use('/warehouse', warehouseRoute);
app.use('/setting', settingRoute);
app.use('/item', itemRoute);
app.use('/stock', stockRoute);
app.use('/sales', salesRoute);
app.use('/table', tableRoute);
app.use('/sales_lines', salesLinesRoute)

app.listen(process.env.SERVER_PORT, () => {console.log('Server Running')});
