import prisma from "@lib/prisma";
import courses from "@lib/courses";

async function main() {
    console.log("Seeding initial courses...");

    for (const course of courses) {
        try {
            // ตรวจสอบว่าคอร์สที่มีชื่อและ userId นี้มีอยู่ในฐานข้อมูลแล้วหรือไม่
            const existingCourse = await prisma.course.findFirst({
                where: {
                    courseTitle: course.Course_Title, // ตรวจสอบชื่อคอร์ส
                    userId: course.userId,            // ตรวจสอบ userId
                },
            });

            if (existingCourse) {
                console.log(`Course "${course.Course_Title}" for user ID ${course.userId} already exists. Skipping.`);
                continue;
            }

            // สร้างข้อมูลคอร์สในฐานข้อมูล
            await prisma.course.create({
                data: {
                    courseTitle: course.Course_Title,
                    courseDuration: course.Course_Duration,
                    level: course.Level,
                    enrollmentCount: course.Enrollment_Count,
                    status: course.Status,
                    image: course.image,
                    userId: course.userId, // ค่าผู้ใช้ที่เกี่ยวข้อง
                },
            });

            console.log(`Course "${course.Course_Title}" created successfully.`);
        } catch (error) {
            console.error(`Error creating course "${course.Course_Title}":`, error);
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
