import express from 'express';
import EmploymentController from './controller.js';

const employmentRouter = express.Router();

const employmentController = new EmploymentController();

export default employmentRouter;
