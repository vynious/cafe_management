import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


// load environment variables
dotenv.config()

// create express app
const app = express();

// middleware
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

app.get("/", (req, res) => { 
    res.send("Hello World")
})

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

