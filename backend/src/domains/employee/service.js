import { prisma_db } from "../../utils/connect_db";

export default class EmployeeService {
    constructor() {
        this.prisma_db = prisma_db
    }
}