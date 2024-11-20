import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import MockAdapter from "axios-mock-adapter";
import { GetInstructors } from "@/app/utils/getInstructors";

import user from "@lib/userinfo";
const mockAxios = new MockAdapter(axios);
vi.mock("axios");
const mockAxiosGet = vi.mocked(axios.get);

describe("instructor", async () => {
  it("should fetch instructors successfully", async () => {
    // Mock API response
    mockAxiosGet.mockResolvedValueOnce({
      data: { userList: user }, // กำหนดข้อมูลที่ mock ให้เหมือนกับการตอบกลับจาก API
    });

    // Call the function
    const result = await GetInstructors(); // เรียก API จริง

    // ตรวจสอบว่า axios.get ถูกเรียกด้วย parameters ที่ถูกต้อง
    expect(mockAxiosGet).toHaveBeenCalledWith(
      "http://localhost:4000/api/instructor"
    );

    // ตรวจสอบผลลัพธ์ที่คืนค่า
    expect(result).toEqual(user);
  });

  it("should handle API errors gracefully", async () => {
    // Mock API ให้ส่ง error 404
    mockAxios.onGet("/api/instructor").reply(404);

    // Mock console.error
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Call GetProduct
    const result = await GetInstructors();
    // Assert console.error เรียกถูกต้อง
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching instructors:",
      expect.any(Error) // ตรวจสอบว่า Error object ถูกส่งเป็น argument
    );

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});
