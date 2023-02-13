import express from 'express';
import { initializeDbConnection } from './db.js';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import routes from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { uploadFile } from './routes/usersControllers/uploadFile.js';

// ES6 modules not supporting __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const app = express();

const PORT = process.env.PORT || 8080;

// MIDDLEWARE
// app.use(
//   cors({
//     origin: 'https://portfolio-viq1.onrender.com', // where react app is working
//     credentials: true,
//   })
// );

app.use(function (req, res, next) {
  //  res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = [
    'http://localhost:5173/',
    'https://portfoliocreator.onrender.com/',
    'http://portfoliocreator.onrender.com/',
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, UPDATE');
  next();
});

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser(process.env.SECRET));

//SET UP SESSION
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// INITIALIZE PASSPORT
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(
//   express.json({
//     limit: '50mb',
//   })
// );

// import('./config/passportConfig.js');

app.post('/files/upload/:userId', upload.single('file'), uploadFile);
// Add all the routes to our Express server
app.use(routes);

app.get('/download', (req, res, next) => {
  const { userId } = req.body;
  console.log(userId, 'w download');
  res.download('./src/file-1676032365436-205186676');
});

/** ERROR HANDLERS */
//404
app.use((req, res, next) => {
  next(createError(404, 'Error 404: Route is not defined..🤨'));
});

//MAIN ERROR HANDLER
app.use((error, req, res, next) => {
  if (error) {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message,
        stack: error.stack,
      },
    });
  }
  next();
});

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
initializeDbConnection().then(() => {
  app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Server is listening on port http://localhost:${PORT}`);
    }
  });
});
