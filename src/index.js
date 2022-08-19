require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models')

const router = require('./routes/router');
const authRoute = require('./routes/authRoute');
const employeeRoute = require('./routes/employeesRoute');
const departmentRoute = require('./routes/departmentRoute');
const categoryRoute = require('./routes/categoryRoute');
const discountRoute = require('./routes/discountRoute');
const paymentMethodRoute = require('./routes/paymentMethodRoute');
const warehouseRoute = require('./routes/warehouseRoute');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.listen(process.env.SERVER_PORT, () => {console.log('Server Running')});
