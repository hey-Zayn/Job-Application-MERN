const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/connection');
const userRouter = require('./router/user.router')


const port = process.env.PORT;
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/api/v1/user/', require('./router/user.router'));
app.use('/api/v1/company/', require('./router/company.router'));
app.use('/api/v1/job/', require('./router/job.router'));
app.use('/api/v1/application/', require('./router/application.router'));




app.get('/', (req, res) => {
    res.send('Hello World');
});




app.listen(port, () => {
    connectDB()
    console.log(`Server is running and listening http://local ${port}`);

})