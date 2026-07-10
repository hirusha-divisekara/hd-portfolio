const bcrypt = require("bcrypt");
const prisma = require("../utils/prisma");

async function createAdmin() {
    try {
        const hashedPassword = await bcrypt.hash("ChangeMe123!", 10);

        const admin = await prisma.admin.create({
            data: {
                username: "hirusha",
                password: hashedPassword
            }
        });

        console.log("✅ Admin created successfully!");
        console.log(admin);

    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();