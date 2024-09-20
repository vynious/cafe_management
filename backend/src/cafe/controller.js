import CafeService from "./service.js";
import EmployeeService from "../employee/service.js";

// Rest controller for the cafe
export default class CafeController {
    constructor() {
        this.cafeService = new CafeService();
        this.employeeService = new EmployeeService();
    }

    // Endpoint to get a cafe by id
    async getCafeById(req, res, next) {
        try {
            const cafe = await this.cafeService.getCafeById(req.params.id);
            res.json(cafe);
        } catch (error) {
            console.error(`Error getting cafe by id: ${req.params.id}`, error);
            next(error);
        }
    }

    // Endpoint to get all cafes by location if given a location
    async getAllCafes(req, res, next) {
        try {
            const cafes = req.params.location
                ? await this.cafeService.getCafeByLocation(req.params.location)
                : await this.cafeService.getAllCafes();
            res.json(cafes);
        } catch (error) {
            console.error(`Error getting cafes by location: ${req.params.location}`, error);
            next(error);
        }
    }

    // Endpoint to create a new cafe
    async createCafe(req, res, next) {
        try {
            // validation for required fields
            const { location, name, description } = req.body;
            if (!location || !name || !description) {
                return res.status(400).json({ error: 'Location, name, and description are required' });
            }
            const cafe = await this.cafeService.createCafe(location, name, description);
            res.json(cafe);
        } catch (error) {
            console.error('Error creating cafe', error);
            next(error);
        }   
    }

    // Endpoint to update a cafe by id
    async updateCafe(req, res, next) {
        try {
            const updatedCafe = await this.cafeService.updateCafe(req.params.id, req.body);
            res.json(updatedCafe);
        } catch (error) {
            console.error(`Error updating cafe by id: ${req.params.id}`, error);
            next(error);
        }
    }

    // Endpoint to delete a cafe by id
    async deleteCafe(req, res, next) {
        try {
            await this.cafeService.deleteCafe(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(`Error deleting cafe by id: ${req.params.id}`, error);
            next(error);
        }
    }
}