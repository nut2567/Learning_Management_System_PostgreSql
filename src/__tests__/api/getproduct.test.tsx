import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import { GetProduct } from "@/app/utils/getproduct";
import MockAdapter from "axios-mock-adapter";
import courses from "@lib/courses";

const mockAxios = new MockAdapter(axios);
const mockProducts = courses;

describe("GetProduct", () => {
  vi.mock("axios");

  it("should call API with correct parameters", async () => {
    const mockAxiosGet = vi.mocked(axios.get);

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
