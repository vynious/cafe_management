import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import { generateEmployeeId } from '../src/utils/id-gen.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();


const seedDataPath = path.join(__dirname, 'seed_data.json');
const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));

console.log('Seed data loaded:', seedData);

async function clearDatabase() {
    console.log('Clearing existing database records...');
    await prisma.assignment.deleteMany({});
    await prisma.employee.deleteMany({});
    await prisma.cafe.deleteMany({});
    console.log('Database cleared successfully');
}

// seed the database
async function main() {
    try {
        await clearDatabase();

        console.log('Starting to seed the database...');
        // seed cafes
        if (seedData.cafes) {
            for (const cafe of seedData.cafes) {
                await prisma.cafe.create({ data: cafe });
            }
            console.log('Cafes seeded successfully');
        }

        // seed employees
        if (seedData.employees) {
            for (const employee of seedData.employees) {

                await prisma.employee.create({
                    data: {
                        id: generateEmployeeId(),
                        ...employee
                    }
                });
            }
            console.log('Employees seeded successfully');
        }

        // create the relationship aka the assignments
        console.log('Creating assignments...');
        const employees = await prisma.employee.findMany();
        const cafes = await prisma.cafe.findMany();

        for (const employee of employees) {
            // randomly select a cafe
            const randomCafe = cafes[Math.floor(Math.random() * cafes.length)];

            // create an assignment
            await prisma.assignment.create({
                data: {
                    employeeId: employee.id,
                    cafeId: randomCafe.id,
                    // randomise the date
                    startDate: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)) 
                }
            });
        }
        console.log('Assignments created successfully');
        console.log('Database seeding completed');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });