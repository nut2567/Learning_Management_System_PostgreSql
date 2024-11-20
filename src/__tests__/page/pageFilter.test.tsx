import { render, screen, waitFor } from "@testing-library/react";
import ProductList, { Courses } from "@/app/components/ProductList";
import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import axios from "axios";
import { GetProduct } from "@/app/utils/getproduct";

vi.mock("axios");
const mockAxiosGet = vi.mocked(axios.get);

describe("Filter no sort", () => {
  it("Status", async () => {
    const mockProducts: Courses[] = [
      {
        id: 71,
        courseTitle: "Full-Stack Software Development19",
        courseDuration: 100,
        level: "Intermediate",
        enrollmentCount: 50,
        createdAt: new Date(),
        status: "Open",
        image:
          "https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI",
        userId: 6,
        user: {
          Instructor_Name: "Titan",
          email: "Titan@gmail.com",
          createdAt: new Date(),
          age: 40,
          image: "/Titan.jpg",
          phone: "026-755888",
        },
      },
      {
        id: 2,
        courseTitle: "Front-End Development6",
        courseDuration: 12.5,
        level: "Intermediate",
        enrollmentCount: 668,
        createdAt: new Date(),
        status: "Open",
        image: "/16_4.png",
        userId: 6,
        user: {
          Instructor_Name: "Titan",
          email: "Titan@gmail.com",
          createdAt: new Date(),
          age: 40,
          image: "/Titan.jpg",
          phone: "026-755888",
        },
      },
    ];
    const filters = {
      Instructor: "6",
      Status: "Open",
      Level: "Intermediate",
      Sort: "Recommended",
    };

    // Mock API response
    mockAxiosGet.mockResolvedValueOnce({
      data: { courses: mockProducts, total: 2 },
    });

    // Call the function
    const result = await GetProduct(1, 9, filters);

    // ตรวจสอบว่า axios.get ถูกเรียกด้วย parameters ที่ถูกต้อง
    expect(mockAxiosGet).toHaveBeenCalledWith(
      "http://localhost:4000/api/getcourse",
      {
        params: {
          page: 1,
          limit: 9,
          Instructor: "6",
          Status: "Open",
          Level: "Intermediate",
          Sort: "Recommended",
        },
      }
    );

    // ตรวจสอบผลลัพธ์ที่คืนค่า
    expect(result).toEqual({ courses: mockProducts, total: 2 });

    render(<ProductList products={result.courses} />);

    await waitFor(() => {
      // ตรวจสอบว่ามี <figure> ที่มีรูปภาพที่ถูกต้อง
      expect(
        screen.getByAltText(/Full-Stack Software Development19/i)
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(/Front-End Development6/i)
      ).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: /Full-Stack Software Development19/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: /Front-End Development6/i })
      ).toBeInTheDocument();

      // ตรวจสอบระดับ
      const lavel = screen.getAllByText(/Intermediate/i, {
        selector: "div > div > div:nth-child(1) > button:nth-child(1)",
      });
      expect(lavel).toHaveLength(2);

      // ตรวจสอบสถานะ
      const matches = screen.getAllByText(/Open/i, {
        selector: "div > div > div > button:nth-child(2)",
      });
      expect(matches).toHaveLength(2);

      // ตรวจสอบว่าชื่อคอร์สทั้งหมดถูกเรนเดอร์
      expect(
        screen.getByText(/Front-End Development6/i, {
          selector: "div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Full-Stack Software Development19/i, {
          selector: "div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();

      // ตรวจผู้สอบ
      const tech = screen.getAllByText(/Titan/i, {
        selector: "div > div > div:nth-child(3) > p",
      });
      expect(tech).toHaveLength(2);

      // ตรวจสอบว่าระยะเวลาถูกต้อง
      expect(
        screen.getByText(/12 hr 50 mins/i, { selector: "div:nth-child(1) > p" })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/100 hr 0 mins/i, { selector: "div:nth-child(1) > p" })
      ).toBeInTheDocument();

      // ตรวจสอบจำนวนผู้ลงทะเบียน
      expect(
        screen.getByText(/668/i, { selector: "div:nth-child(2) > p" })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/50/i, { selector: "div:nth-child(2) > p" })
      ).toBeInTheDocument();
    });
  });

  it("All filter and sort courseTitle", async () => {
    const mockProducts: Courses[] = [
      {
        id: 72,
        courseTitle: "Full-Stack Software Development20",
        courseDuration: 80,
        level: "Beginner",
        enrollmentCount: 33,
        createdAt: new Date(),
        status: "Closed",
        image:
          "https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI",
        userId: 6,
        user: {
          Instructor_Name: "Titan",
          email: "Titan@gmail.com",
          createdAt: new Date(),
          age: 40,
          image: "/Titan.jpg",
          phone: "026-755888",
        },
      },
      {
        id: 2,
        courseTitle: "Data Analytics1",
        courseDuration: 12.5,
        level: "Beginner",
        enrollmentCount: 668,
        createdAt: new Date(),
        status: "Closed",
        image: "/16_4.png",
        userId: 6,
        user: {
          Instructor_Name: "Titan",
          email: "Titan@gmail.com",
          createdAt: new Date(),
          age: 40,
          image: "/Titan.jpg",
          phone: "026-755888",
        },
      },
    ];
    const filters = {
      Instructor: "6",
      Status: "Closed",
      Level: "Beginner",
      Sort: "Z-A",
    };

    // Mock API response
    mockAxiosGet.mockResolvedValueOnce({
      data: { courses: mockProducts, total: 2 },
    });

    // Call the function
    const result = await GetProduct(1, 9, filters);

    // ตรวจสอบว่า axios.get ถูกเรียกด้วย parameters ที่ถูกต้อง
    expect(mockAxiosGet).toHaveBeenCalledWith(
      "http://localhost:4000/api/getcourse",
      {
        params: {
          page: 1,
          limit: 9,
          Instructor: "6",
          Status: "Closed",
          Level: "Beginner",
          Sort: "Z-A",
        },
      }
    );

    // ตรวจสอบผลลัพธ์ที่คืนค่า
    expect(result).toEqual({ courses: mockProducts, total: 2 });

    render(<ProductList products={result.courses} />);

    await waitFor(() => {
      // ตรวจสอบว่ามี <figure> ที่มีรูปภาพที่ถูกต้อง
      expect(
        screen.getByAltText(/Full-Stack Software Development20/i)
      ).toBeInTheDocument();
      expect(screen.getByAltText(/Data Analytics1/i)).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: /Full-Stack Software Development20/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: /Data Analytics1/i })
      ).toBeInTheDocument();

      // ตรวจสอบระดับ
      const lavel = screen.getAllByText(/Beginner/i, {
        selector: "div > div > div:nth-child(1) > button:nth-child(1)",
      });
      expect(lavel).toHaveLength(2);

      // ตรวจสอบสถานะ
      const matches = screen.getAllByText(/Closed/i, {
        selector: "div > div > div > button:nth-child(2)",
      });
      expect(matches).toHaveLength(2);

      // ตรวจสอบว่าชื่อคอร์สทั้งหมดถูกเรนเดอร์
      expect(
        screen.getByText(/Data Analytics1/i, {
          selector: "div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Full-Stack Software Development20/i, {
          selector: "div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();

      // ตรวจผู้สอบ
      const tech = screen.getAllByText(/Titan/i, {
        selector: "div > div > div:nth-child(3) > p",
      });
      expect(tech).toHaveLength(2);

      // ตรวจสอบว่าระยะเวลาถูกต้อง
      expect(
        screen.getByText(/80 hr 0 mins/i, { selector: "div:nth-child(1) > p" })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/12 hr 50 mins/i, { selector: "div:nth-child(1) > p" })
      ).toBeInTheDocument();

      // ตรวจสอบจำนวนผู้ลงทะเบียน
      expect(
        screen.getByText(/668/i, { selector: "div:nth-child(2) > p" })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/33/i, { selector: "div:nth-child(2) > p" })
      ).toBeInTheDocument();
    });
  });
});
