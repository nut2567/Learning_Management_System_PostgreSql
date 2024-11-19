import { NextResponse } from "next/server";
import prisma from "@lib/prisma";  // ตรวจสอบว่า prisma เชื่อมต่อกับฐานข้อมูลแล้ว

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "9");
  const Instructor = searchParams.get("Instructor") || "";
  const Status = searchParams.get("Status") || "";
  const Level = searchParams.get("Level") || "";
  const Sort = searchParams.get("Sort") || "";

  const query: any = {};

  if (Instructor) {
    query.userId = parseInt(Instructor);
  }

  if (Status) {
    query.status = Status;
  }

  if (Level) {
    query.level = Level;
  }

  let sortOption: any = {};

  if (Sort === "A-Z") {
    sortOption = { courseTitle: "asc" };
  } else if (Sort === "Z-A") {
    sortOption = { courseTitle: "desc" };
  } else if (Sort === "countHigh") {
    sortOption = { enrollmentCount: "desc" };
  } else if (Sort === "countLow") {
    sortOption = { enrollmentCount: "asc" };
  } else if (Sort === "durationHigh") {
    sortOption = { courseDuration: "desc" };
  } else if (Sort === "durationLow") {
    sortOption = { courseDuration: "asc" };
  } else {
    sortOption = { createdAt: "desc" }; // ไม่มีการจัดเรียง
  }


  try {
    const skip = (page - 1) * limit;

    // ค้นหาข้อมูลจากฐานข้อมูล Prisma
    let courses = await prisma.course.findMany({
      where: query,
      orderBy: sortOption,
      skip: skip,
      take: limit,
      include: {
        user: {
          select: {
            Instructor_Name: true,
            email: true,
            createdAt: true,
            age: true,
            image: true,
            phone: true
          }
        }
      }
    });

    const total = await prisma.course.count({
      where: query
    });


    // query SELECT "id", "courseTitle", "courseDuration", "level", "status" FROM "Course" WHERE "status" = 'Open' AND "level" = 'Advanced' ORDER BY "courseTitle" ASC LIMIT 10 OFFSET 0


    return NextResponse.json(
      { message: "Success get List", courses, total },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { message: "Failed to fetch data", error },
      { status: 500 }
    );
  }
}
