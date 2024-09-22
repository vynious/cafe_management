import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// import routes
import employeeRouter from "./employee/route.js"
import cafeRouter from "./cafe/route.js"
import managementRouter from "./management/route.js"
import assignmentRouter from "./assignment/route.js"

// load environment variables
dotenv.config()

// create express app
const app = express();

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204,
};

// Apply CORS before other middleware
app.use(cors(corsOptions));

// Helmet configuration
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "img-src": ["'self'", "data:", "blob:", process.env.FRONTEND_URL || "*"],
        },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))


app.get("/api", (req, res) => {
    res.send("Hello World")
})

// mount routes
app.use("/api", employeeRouter)
app.use("/api", cafeRouter)
app.use("/api", managementRouter)
app.use("/api", assignmentRouter)

// Log the current directory
console.log('Current directory:', process.cwd());
console.log('__dirname:', __dirname);

// Check if the logos directory exists
const logosPath = join(process.cwd(), 'public', 'cafe_logos');
console.log('Logos path:', logosPath);
console.log('Logos directory exists:', fs.existsSync(logosPath));

// serve static files
app.use('/api/cafe_logos', express.static(join(process.cwd(), 'public', 'cafe_logos')));

// fallback for logo requests
app.use('/api/cafe_logos', (req, res, next) => {
    const defaultLogoPath = join(process.cwd(), 'public', 'cafe_logos', 'default.png');
    console.log('Default logo path:', defaultLogoPath);
    console.log('Default logo exists:', fs.existsSync(defaultLogoPath));

    if (fs.existsSync(defaultLogoPath)) {
        res.sendFile(defaultLogoPath);
    } else {
        res.status(404).send('Logo not found');
    }
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