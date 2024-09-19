import CafeService from "../services/cafeService";

// rest controller for the cafe
export default class CafeController {
    // constructor for the cafe controller
    constructor() {
        this.cafeService = new CafeService()
    }

    // endpoint to get all cafes
    async getAllCafes(req, res) {
        const cafes = await this.cafeService.getAllCafes();
        res.json(cafes);
    }

    // endpoint to get a cafe by id
    async getCafeById(req, res) {
        const cafe = await this.cafeService.getCafeById(req.params.id);
        res.json(cafe);
    }

    // endpoint to get all cafes by location
    async getCafeByLocation(req, res) {
        let cafes = [];
        if (!req.params.location) {
            // get all cafes if no location is provided
            cafes = await this.cafeService.getAllCafes();
        } else {
            // get cafes by location if location is provided
            cafes = await this.cafeService.getCafeByLocation(req.params.location);
        }
        res.json(cafes);
    }

    // endpoint to create a new cafe
    async createCafe(req, res) {
        const cafe = await this.cafeService.createCafe(req.body);
        res.json(cafe);
    }

    // endpoint to update a cafe by id
    async updateCafe(req, res) {
        const cafe = await this.cafeService.updateCafe(req.params.id, req.body);
        res.json(cafe);
    }

    // endpoint to delete a cafe by id
    async deleteCafe(req, res) {
        await this.cafeService.deleteCafe(req.params.id);
    }


}