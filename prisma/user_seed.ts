import prisma from "@lib/prisma"
import user from '@lib/userinfo';
async function main() {
    console.log("Seeding initial users...");

    for (const userData of user) {
        try {
            const existingUser = await prisma.user.findUnique({
                where: {
                    Instructor_Name: userData.Instructor_Name,
                },
            });

            if (existingUser) {
                console.log(`User "${userData.Instructor_Name}" already exists. Skipping.`);
                continue;
            }

            await prisma.user.create({
                data: {
                    Instructor_Name: userData.Instructor_Name,
                    age: userData.age,
                    email: userData.email,
                    image: userData.image,
                    phone: userData.phone,
                },
            });

            console.log(`User "${userData.Instructor_Name}" created successfully.`);
        } catch (error) {
            console.error(`Error creating user "${userData.Instructor_Name}":`, error);
        }
    }

    console.log("Seeding completed.");
}

// เรียกใช้ฟังก์ชัน main และจัดการข้อผิดพลาด
main()
    .catch((e) => {
        console.error("Error during seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });