import { render, screen } from "@testing-library/react";
import ProductList, { Courses } from "@/app/components/ProductList";
import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import axios from "axios";
import { GetProduct } from "@/app/utils/getproduct";
import MockAdapter from "axios-mock-adapter";
import courses from "@lib/courses";

const mockAxios = new MockAdapter(axios);
vi.mock("axios");
const mockAxiosGet = vi.mocked(axios.get);
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
    level: "Advanced",
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
describe("ProductList Component GetProduct api", () => {
  it("renders list of products should call API with correct parameters", async () => {
    const filters = {
      Instructor: "1",
      Status: "Open",
      Level: "Beginner",
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
          Instructor: "1",
          Status: "Open",
          Level: "Beginner",
          Sort: "Recommended",
        },
      }
    );

    // ตรวจสอบผลลัพธ์ที่คืนค่า
    expect(result).toEqual({ courses: mockProducts, total: 2 });

    render(<ProductList products={mockProducts} />);

    // ตรวจสอบว่าชื่อคอร์สทั้งหมดถูกเรนเดอร์
    expect(
      await screen.findByText(/Full-Stack Software Development20/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Full-Stack Software Development19/i)
    ).toBeInTheDocument();

    // ตรวจสอบว่าระยะเวลาถูกต้อง
    expect(await screen.findByText(/80 hr 0 mins/i)).toBeInTheDocument();
    expect(await screen.findByText(/100 hr 0 mins/i)).toBeInTheDocument();

    // ตรวจสอบจำนวนผู้ลงทะเบียน
    expect(await screen.findByText(/33/i)).toBeInTheDocument();
    expect(await screen.findByText(/50/i)).toBeInTheDocument();
  });

  it("renders empty state when no products are passed", () => {
    render(<ProductList products={[]} />);
    expect(screen.getByText(/No result/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Try to remove filters and sorting/i)
    ).toBeInTheDocument();
  });
});
