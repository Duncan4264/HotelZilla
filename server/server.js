import express from "express";
import {readdirSync} from "fs";
import cors from "cors";
import mongoose from 'mongoose'; 
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const morgan = require("morgan");
const helmet = require("helmet");

require("dotenv").config();

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

// const checkJwt = jwt({
//     // Dynamically provide a signing key
//     // based on the kid in the header and 
//     // the signing keys provided by the JWKS endpoint.
//     secret: jwksRsa.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: `https://dev-w3d00qd3.us.auth0.com/.well-known/jwks.json`
//     }),
  
//     // Validate the audience and the issuer.
//     audience: 'http://localhost:8000/api/',
//     issuer: [`https://dev-w3d00qd3.us.auth0.com/`],
//     algorithms: ['RS256']
//   });
  
//   // enforce on all endpoints
//   app.use(checkJwt);
  
  

//middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


// Route Middleware
readdirSync("./Routes").map((r) => app.use("/api", require(`./Routes/${r}`)));

const port = process.env.PORT|| 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));