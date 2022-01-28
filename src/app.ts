require('dotenv').config();
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import homePage from './routes/user';
import userRouter from './routes/user';
import loginPageWithGoogle from './routes/user';
import channel from './routes/channels';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //to enable us to set cookies in the browser front end which will be use to store access token to the session
app.use(express.static(path.join(__dirname, '..', 'public')));
const corsOptions = {
  origin: process.env.FRONTEND_ROOT_URL,
  origins: process.env.UI_ROOT_URL,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.use(
//   cors({
//     origin: process.env.UI_ROOT_URL,
//     credentials: true,
//   }),
// );
app.use('/', homePage);
app.use('/login', loginPageWithGoogle);
app.use('/auth', userRouter);
app.use('/', channel);
//app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
