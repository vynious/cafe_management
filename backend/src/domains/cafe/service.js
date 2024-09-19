import { prisma_db } from "../../utils/connect_db";

// interact with the database and encapsulate the logic for the cafe
export default class CafeService {
    constructor() {
        this.prisma_db = prisma_db;
    }

    // get all cafes
    async getAllCafes() {
        return this.prisma_db.cafe.findMany();
    }

    // get a cafe by id
    async getCafeById(id) {
        return this.prisma_db.cafe.findUnique({
            where: { id },
        });
    }

    // get all cafes by location
    async getCafeByLocation(location) {
        return this.prisma_db.cafe.findMany({
            where: { location },
        });
    }

    // create a new cafe
    async createCafe(cafeData) {
        return this.prisma_db.cafe.create({
            data: cafeData,
        });
    }

    // update a cafe by id
    async updateCafe(id, cafeData) {
        return this.prisma_db.cafe.update({
            where: { id },
            data: cafeData,
        });
    }

    // delete a cafe by id
    async deleteCafe(id) {
        return this.prisma_db.cafe.delete({
            where: { id },
        });
    }
}