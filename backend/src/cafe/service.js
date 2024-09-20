import { prisma_db } from "../../prisma/connection.js";

// service for the cafe that interacts with the database and encapsulates the logic for the cafe
export default class CafeService {
    constructor() {
        this.prisma_db = prisma_db;
    }


    // get all cafes order by number of employees desc
    async getAllCafes() {
        try {
            return this.prisma_db.cafe.findMany({
                orderBy: {
                    employees: {
                        _count: 'desc',
                    },
                },
                include: {
                    _count: {
                        select: { employees: true },
                    },
                },
            });
        } catch (error) {
            return error    
        }
    }

    // get a cafe by id
    async getCafeById(cafeId) {
        try {
            return this.prisma_db.cafe.findUnique({
                where: { cafeId },
            });
        } catch (error) {
                return error
        }
    }

    // get all cafes by location order by number of employees desc
    async getCafeByLocation(location) {
        try {
            return this.prisma_db.cafe.findMany({
                where: { location },
                orderBy: {
                    employees: {
                        _count: 'desc',
                    },
                },
                include: {
                    _count: {
                        select: { employees: true },
                    },
                },
            });
        } catch (error) {
            return error
        }
    }

    // create a new cafe
    async createCafe(location, name, description) {
        try {
            return this.prisma_db.cafe.create({
                data: {
                    location,
                    name,
                    description,
                },
            });
        } catch (error) {
            return error
        }
    }

    // update a cafe by id
    async updateCafe(cafeId, cafeData) {
        try {
            return this.prisma_db.cafe.update({
                where: { cafeId },
                data: cafeData,
            });
        } catch (error) {
            return error
        }
    }

    // delete a cafe by id
    async deleteCafe(id) {
        try {
            return this.prisma_db.cafe.delete({
                where: { id },
            });
        } catch (error) {
            return error
        }
    }

}