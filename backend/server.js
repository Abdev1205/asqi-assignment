import express from 'express';
import session from 'express-session';
import './helper/passport.js'; // Passport configuration
import connectDb from "./Db/connect.js"
import authRoutes from "./routes/v1/auth/index.js"
import uploadRoutes from "./routes/v1/upload/index.js"
import employeeRoutes from "./routes/v1/employee/index.js"
import departmentRoutes from "./routes/v1/department/index.js"
// import carRoutes from "./routes/v1/car/index.js"
import cookieParser from 'cookie-parser';
import cors from "cors"
import { config } from "dotenv";

config({
  path: ".env"
});

// server configuration
const app = express();
const PORT = process.env.PORT || 5000;


const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Authorization',
    'Content-Type',
    'Accept',
    'Cache-Control',
    'DNT',
    'If-Modified-Since',
    'Keep-Alive',
    'Origin',
    'User-Agent',
    'X-Requested-With',
    'company-code'
  ],
  exposedHeaders: ['Content-Length', 'Content-Range'],
  optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser())


app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || "abhaymishra",
  cookie: {
    maxAge: 3600000 * 24, // 1 day
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// Handle preflight OPTIONS requests for all routes
app.options('*', cors(corsOptions));


// route middlware
app.use('/api/auth', authRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/department', departmentRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// databse connection 
const databaseConnection = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.get("/", (req, res) => {
      res.send("Hi Welcome Spyne Backend")
    })
  } catch (error) {
    console.log(error);
  }
}
databaseConnection();
