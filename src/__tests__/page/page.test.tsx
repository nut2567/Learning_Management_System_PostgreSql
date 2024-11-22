import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "@/app/layouts/homepage";
import { GetProduct } from "@/app/utils/getproduct";
import { GetInstructors } from "@/app/utils/getInstructors";
import { describe, it, expect, beforeEach, vi } from "vitest";
import ProductList, { Courses } from "@/app/components/ProductList";
import user from "@lib/userinfo";
import React from "react";
import axios from "axios";

vi.mock("axios");
const mockAxiosGet = vi.mocked(axios.get);
const mockInstructors = user;

describe("Renders list of products should call API with correct parameters", () => {
  it("no filter no sort", async () => {
    const mockProducts: Courses[] = [
      {
        id: 72,
        courseTitle: "Full-Stack Software Development20",
        courseDuration: 80,
        level: "Advanced",
        enrollmentCount: 33,
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
    ];

    // Mock API response
    mockAxiosGet.mockResolvedValueOnce({
      data: { courses: mockProducts, total: 2 },
    });
    const initialProducts = await GetProduct();
    // ตรวจสอบว่า axios.get ถูกเรียกด้วย parameters ที่ถูกต้อง
    expect(mockAxiosGet).toHaveBeenCalledWith(
      "http://localhost:4000/api/getcourse",
      {
        params: {
          page: 1,
          limit: 9,
        },
      }
    );
    vi.clearAllMocks();
    mockAxiosGet.mockResolvedValueOnce({
      data: { userList: mockInstructors },
    });
    const initialinstructor = await GetInstructors();
    // ตรวจสอบว่า axios.get ถูกเรียกด้วย parameters ที่ถูกต้อง
    expect(mockAxiosGet).toHaveBeenCalledWith(
      "http://localhost:4000/api/instructor"
    );

    render(
      <Home
        initialProducts={initialProducts}
        initialinstructor={initialinstructor}
      />
    );

    // ตรวจสอบผลลัพธ์ที่คืนค่า
    expect(initialProducts).toEqual({ courses: mockProducts, total: 2 });
    expect(initialinstructor).toEqual(mockInstructors);

    await waitFor(() => {
      // ตรวจสอบว่ามี <figure> ที่มีรูปภาพที่ถูกต้อง
      expect(
        screen.getByAltText(/Full-Stack Software Development19/i)
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(/Full-Stack Software Development20/i)
      ).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: /Full-Stack Software Development19/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: /Full-Stack Software Development20/i })
      ).toBeInTheDocument();

      // ตรวจสอบระดับ
      expect(
        screen.getByText(/Advanced/i, {
          selector: "div > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Intermediate/i, {
          selector: "div > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).toBeInTheDocument();

      // ตรวจสอบสถานะ
      const matches = screen.getAllByText(/Open/i, {
        selector: "div > div > div > button:nth-child(2)",
      });
      expect(matches).toHaveLength(2);

      // ตรวจสอบว่าชื่อคอร์สทั้งหมดถูกเรนเดอร์
      expect(
        screen.getByText(/Full-Stack Software Development20/i, {
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
        screen.getByText(/80 hr 0 mins/i, { selector: "div:nth-child(1) > p" })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/100 hr 0 mins/i, { selector: "div:nth-child(1) > p" })
      ).toBeInTheDocument();

      // ตรวจสอบจำนวนผู้ลงทะเบียน
      expect(
        screen.getByText(/33/i, { selector: "div:nth-child(2) > p" })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/50/i, { selector: "div:nth-child(2) > p" })
      ).toBeInTheDocument();

      expect(screen.getByText("Available Courses")).toBeInTheDocument();

      expect(screen.getByLabelText(/Instructor/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Level/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Sort by/i)).toBeInTheDocument();

      const filter = screen.getAllByText(/All/i, {
        selector: "option",
      });
      expect(filter).toHaveLength(3);
      const Recommended = screen.getAllByText(/Recommended/i, {
        selector: "option",
      });
      expect(Recommended).toHaveLength(1);
    });
  });
});
