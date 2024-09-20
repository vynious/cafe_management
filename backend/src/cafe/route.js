import express from 'express';
import CafeController from './controller';
import { handleLogoUpload } from '../middlware/upload';


const router = express.Router();
const cafeController = new CafeController();

// SETTLED
// route to get all cafes or by location
// The response of this endpoint should be the below and sorted by the highest number of
// employees first
// If a valid location is provided, it will filter the list to return only cafes that is within the area
// If an invalid location is provided, it should return an empty list
// If no location is provided, it should list down all cafes
router.get('/cafes', cafeController.getAllCafes)


// SETTLED
// route to create a new cafe
// checks if logo is included in the request body
router.post('/cafe', handleLogoUpload, cafeController.createCafe);

// SETTLED
// route to update cafe by id
router.put('/:id', cafeController.updateCafe);

// SETTLED
// route to delete cafe by id
router.delete('/:id', cafeController.deleteCafe);

// SETTLED
// route to terminate employment for an employee for a cafe
router.delete('/employment', cafeController.terminateEmployment);
