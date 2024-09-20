import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from 'cookie-parser';

// import routes
import employeeRoute from "./employee/route"
import cafeRoute from "./cafe/route"
import managementRoute from "./management/route"
import employmentRoute from "./employment/route"

// load environment variables
dotenv.config()

// create express app
const app = express();

// middleware
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => { 
    res.send("Hello World")
})

// mount routes
app.use("/", employeeRoute)
app.use("/", cafeRoute)
app.use("/", managementRoute)
app.use("/", employmentRoute)

// serve static files
app.use('/logos', express.static('uploads/cafe_logos'));

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

