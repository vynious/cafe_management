import CafeService from "./service.js";

// Rest controller for the cafe
export default class CafeController {
    constructor() {
        this.cafeService = new CafeService();

        // bind methods to the instance
        this.getCafeById = this.getCafeById.bind(this);
        this.getAllCafes = this.getAllCafes.bind(this);
        this.createCafe = this.createCafe.bind(this);
        this.updateCafe = this.updateCafe.bind(this);
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
            const cafes = req.query.location
                ? await this.cafeService.getCafeByLocation(req.query.location)
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
            const { cafeId, updateCafeData } = req.body
            if (!cafeId || !updateCafeData) {
                return res.status(400).json({ error: 'Cafe ID and updated cafe data are required' });
            }
            const updatedCafe = await this.cafeService.updateCafe(cafeId, updateCafeData);
            res.json(updatedCafe);
        } catch (error) {
            console.error(`Error updating cafe by id: ${req.params.id}`, error);
            next(error);
        }
    }
}