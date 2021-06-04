import express from "express";
import {readdirSync} from "fs";
import cors from "cors";
import mongoose from 'mongoose'; 
const morgan = require("morgan");
require("dotenv").config();

const app = express();

//db connect

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => console.log('DB Connected'))
.catch(() => console.log('DB Error: ', err));

//middlewares
app.use(cors());
app.use(morgan("dev"));

// Route Middleware
readdirSync("./Routes").map((r) => app.use("/api", require(`./Routes/${r}`)));

const port = process.env.PORT|| 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));