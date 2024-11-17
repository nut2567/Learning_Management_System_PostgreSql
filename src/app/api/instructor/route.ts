import prisma from "@lib/prisma";
import { NextResponse, NextRequest } from 'next/server';
export async function GET() {
    const time = new Date();
    let userList = await prisma.user.findMany({
        orderBy: {
            Instructor_Name: 'asc',  // จัดเรียงชื่อผู้สอนจาก A-Z
        }
    });

    return NextResponse.json({ message: "Success get user", time, userList }, { status: 200 });

}


export async function POST(req: Request) {
    try {
        // ตรวจสอบว่า req.json() คืนค่าเป็น object หรือไม่
        const { Instructor_Name, age, email, image, phone } = await req.json();

        // ตรวจสอบว่าได้รับค่าจาก request หรือไม่
        if (!Instructor_Name || !age || !email || !image || !phone) {
            return NextResponse.json(
                { message: "กรุณาระบุข้อมูลให้ครบถ้วน" },
                { status: 400 }
            );
        }

        const time = new Date();

        // ตรวจสอบว่ามีชื่อผู้สอนนี้อยู่ในฐานข้อมูลหรือไม่
        const existingUser = await prisma.user.findUnique({
            where: {
                Instructor_Name: Instructor_Name,
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "มีชื่อผู้สอนนี้อยู่แล้ว กรุณาใช้ชื่ออื่น", time },
                { status: 409 } // ใช้ 409 Conflict เพราะข้อมูลซ้ำ
            );
        }

        // สร้างผู้สอนใหม่ในฐานข้อมูล
        await prisma.user.create({
            data: {
                Instructor_Name,
                age,
                email,
                image,
                phone,
            },
        });

        return NextResponse.json(
            { message: "Success add user", time },
            { status: 201 } // ใช้ 201 Created เมื่อเพิ่มข้อมูลสำเร็จ
        );
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { message: "เกิดข้อผิดพลาดในการเพิ่มผู้สอน", error },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect(); // ปิดการเชื่อมต่อ Prisma
    }
}
