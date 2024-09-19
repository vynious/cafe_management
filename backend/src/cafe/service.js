import { prisma_db } from "../../prisma/connect_db";

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
            // todo: return error message
            return
        }
    }

    // get a cafe by id
    async getCafeById(cafeId) {
        try {
            return this.prisma_db.cafe.findUnique({
                where: { cafeId },
            });
        } catch (error) {
            // todo: return error message
            return
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
            // todo: return error message
            return
        }
    }

    // create a new cafe
    async createCafe(cafeData) {
        try {
            return this.prisma_db.cafe.create({
                data: cafeData,
            });
        } catch (error) {
            // todo: return error message
            return
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
            // todo: return error message
            return
        }
    }

    // delete a cafe by id
    async deleteCafe(id) {
        try {
            return this.prisma_db.cafe.delete({
                where: { id },
            });
        } catch (error) {
            // todo: return error message
            return
        }
    }

}