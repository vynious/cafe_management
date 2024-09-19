import express from 'express';
import CafeController from '../controllers/cafeController';

const router = express.Router();
const cafeController = new CafeController();

// route to get all cafes or by location
// The response of this endpoint should be the below and sorted by the highest number of
// employees first
// If a valid location is provided, it will filter the list to return only cafes that is within the area
// If an invalid location is provided, it should return an empty list
// If no location is provided, it should list down all cafes
router.get('/cafes', cafeController.getAllCafes);

// route to create a new cafe
router.post('/cafe', cafeController.createCafe);

// route to update cafe by id
router.put('/:id', cafeController.updateCafe);

// route to delete cafe by id
router.delete('/:id', cafeController.deleteCafe);

// route to get employees for a cafe
router.get('/employees', cafeController.getEmployeesForCafe);
