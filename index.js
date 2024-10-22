require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const getUsersRouter = require('./controllers/getUsers');
const addUsersRouter = require('./controllers/addUser');
const deleteUsersRouter = require('./controllers/deleteUser');
const updateUsersRouter = require('./controllers/updateUser');
const loginRouter = require('./controllers/loginService');
const signupRouter = require('./controllers/signupService');
const logoutRouter = require('./controllers/logout');
const checkLogin = require('./middlewares/authGuard');
const addBrands = require('./controllers/addBrands');
const fileUpload = require('./controllers/fileUpload');
const getBrands = require('./controllers/getBrands');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/users/login', loginRouter);
app.use('/users/signup', signupRouter);
app.use('/users', getUsersRouter);
app.use('/users/add', checkLogin, addUsersRouter);
app.use('/users/delete', checkLogin, deleteUsersRouter);
app.use('/users/update', checkLogin, updateUsersRouter);
app.use('/users/logout', checkLogin, logoutRouter);
app.use('/brands/add', addBrands);
app.use('/brands/logo/upload', fileUpload);
app.use('/brands', getBrands);

// error handling middleware
app.use((req, res, next) => {
    next('Requested url not found!');
});

app.use((err, req, res, next) => {
    console.log(err);

    if (err.message) {
        res.status(500).send(err.message);
    } else {
        res.status(500).send('Internal Server Error');
    }
});

// environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
