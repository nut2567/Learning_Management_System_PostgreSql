import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import { GetProduct } from "@/app/utils/getproduct";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

describe("GetProduct", () => {
  vi.mock("axios");
  const mockAxiosGet = vi.mocked(axios.get);

  it("should call API with correct parameters have filter", async () => {
    const mockProducts = [
      {
        id: 72,
        courseTitle: "Full-Stack Software Development20",
        courseDuration: 80,
        level: "Beginner",
        enrollmentCount: 33,
        createdAt: new Date(),
        status: "Open",
        image:
          "https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI",
        userId: 1,
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
        level: "Beginner",
        enrollmentCount: 50,
        createdAt: new Date(),
        status: "Open",
        image:
          "https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI",
        userId: 1,
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
      Instructor: "1",
      Status: "Open",
      Level: "Beginner",
      Sort: "Recommended",
    };

    // Mock API response
    mockAxiosGet.mockResolvedValueOnce({
      data: { courses: mockProducts, total: 72 },
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
    expect(result).toEqual({ courses: mockProducts, total: 72 });
  });

  it("should call API with correct parameters no filter", async () => {
    const mockProducts = [
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

    // Call the function
    const result = await GetProduct(1, 9);

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

    // ตรวจสอบผลลัพธ์ที่คืนค่า
    expect(result).toEqual({ courses: mockProducts, total: 2 });
  });

  it("should return empty data when API response is invalid", async () => {
    mockAxios.onGet("/api/getcourse").reply(200, { data: null });

    const result = await GetProduct();
    expect(result).toEqual({ product: [], total: 0 });
  });

  it("should handle API errors gracefully", async () => {
    // Mock API ให้ส่ง error 404
    mockAxios.onGet("/api/getcourse").reply(404);

    // Mock console.error
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Call GetProduct
    const result = await GetProduct();

    // Assert the return value
    expect(result).toEqual({ product: [], total: 0 });

    // Assert console.error เรียกถูกต้อง
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to fetch products:",
      expect.any(Error) // ตรวจสอบว่า Error object ถูกส่งเป็น argument
    );

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});
