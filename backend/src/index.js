import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import helmet from "helmet"

// import routes
import employeeRouter from "./employee/route.js"
import cafeRouter from "./cafe/route.js"
import managementRouter from "./management/route.js"
import employmentRouter from "./employment/route.js"

// load environment variables
dotenv.config()

// create express app
const app = express();

// middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World")
})

// mount routes
app.use("/", employeeRouter)
app.use("/", cafeRouter)
app.use("/", managementRouter)
app.use("/", employmentRouter)

// serve static files
app.use('/logos', express.static('uploads/cafe_logos'), (req, res, next) => {
    // if the file is not found, fallback to a default image
    res.sendFile('default.png', { root: 'uploads/cafe_logos' });
});

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


export default app;