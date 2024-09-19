import CafeService from "../services/cafeService";

// rest controller for the cafe
export default class CafeController {
    // constructor for the cafe controller
    constructor() {
        this.cafeService = new CafeService()
    }

    // endpoint to get a cafe by id
    async getCafeById(req, res) {
        const cafe = await this.cafeService.getCafeById(req.params.id);
        res.json(cafe);
    }

    // endpoint to get all cafes by location
    async getAllCafes(req, res) {
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

    // endpoint to get all employees for a cafe
    // if no cafe is provided, get all 
    async getEmployeesForCafe(req, res) {
        let employees = [];
        if (!req.params.cafe) {
            employees = await this.cafeService.getEmployees(req.params.cafe);
        } else {
            employees = await this.cafeService.getAllEmployees();
        }
        res.json(employees);
    }

    // endpoint to register a new employee for a cafe
    async registerEmployeeForCafe(req, res) {
        // validate the request body
        const { cafeId, employeeId } = req.body;
        if (!cafeId || !employeeId) {
            return res.status(400).json({ error: 'Cafe ID and employee ID are required' });
        }
        // register the employee for the cafe
        const employement = await this.cafeService.registerEmployeeForCafe(cafeId, employeeId);
        res.json(employement);
    }
}