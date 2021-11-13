import express from "express";
import {readdirSync} from "fs";
import cors from "cors";
import mongoose from 'mongoose'; 
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require('compression');
const dotenv = require('dotenv');
const mongoSanitize = require('express-mongo-sanitize');

dotenv.config({ path: './.env' });

const app = express();

//db connect
try {
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => console.log('DB Connected'))
.catch(() => console.log('DB Error: ', error));

} catch(error) {
    console.log(error);
}


//middlewares
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(morgan("dev"));
app.use(express.json());
app.use(compression());
app.use(mongoSanitize());







// Route Middleware
readdirSync("./Routes").map((r) => app.use("/api", require(`./Routes/${r}`)));

const port = process.env.PORT|| 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));