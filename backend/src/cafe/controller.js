import CafeService from "./service";
import EmployeeService from "../employee/service";

// Rest controller for the cafe
export default class CafeController {
    constructor() {
        this.cafeService = new CafeService();
        this.employeeService = new EmployeeService();
    }

    // Endpoint to get a cafe by id
    async getCafeById(req, res) {
        const cafe = await this.cafeService.getCafeById(req.params.id);
        res.json(cafe);
    }

    // Endpoint to get all cafes by location if given a location
    async getAllCafes(req, res) {
        const cafes = req.params.location
            ? await this.cafeService.getCafeByLocation(req.params.location)
            : await this.cafeService.getAllCafes();
        res.json(cafes);
    }

    // Endpoint to create a new cafe
    async createCafe(req, res) {
        const cafe = await this.cafeService.createCafe(req.body);
        res.json(cafe);
    }

    // Endpoint to update a cafe by id
    async updateCafe(req, res) {
        try {
            const updatedCafe = await this.cafeService.updateCafe(req.params.id, req.body);
            res.json(updatedCafe);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Endpoint to delete a cafe by id
    async deleteCafe(req, res) {
        await this.cafeService.deleteCafe(req.params.id);
        res.status(204).send();
    }
}