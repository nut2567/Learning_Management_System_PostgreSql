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
    // Mock API response for GetInstructors
    mockAxiosGet.mockResolvedValueOnce({
      data: { userList: mockInstructors },
    });
    // Call GetInstructors
    const initialinstructor = await GetInstructors();
    // ตรวจสอบว่า axios.get ถูกเรียกด้วย parameters ที่ถูกต้อง
    expect(mockAxiosGet).toHaveBeenCalledWith(
      "http://localhost:4000/api/instructor"
    );

    // Render the component
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

  it("renders empty state when no products are passed", async () => {
    const filters = {
      Instructor: "20",
      Status: "Open",
      Level: "Beginner",
      Sort: "Recommended",
    };

    // Mock API response
    mockAxiosGet.mockResolvedValueOnce({
      data: { courses: [], total: 0 },
    });

    // Call the function
    const initialProducts = await GetProduct(1, 9, filters);

    // ตรวจสอบว่า axios.get ถูกเรียกด้วย parameters ที่ถูกต้อง
    expect(mockAxiosGet).toHaveBeenCalledWith(
      "http://localhost:4000/api/getcourse",
      {
        params: {
          page: 1,
          limit: 9,
          Instructor: "20",
          Status: "Open",
          Level: "Beginner",
          Sort: "Recommended",
        },
      }
    );

    // ตรวจสอบผลลัพธ์ที่คืนค่า
    expect(initialProducts).toEqual({ courses: [], total: 0 });

    // Mock API response for GetInstructors
    mockAxiosGet.mockResolvedValueOnce({
      data: { userList: mockInstructors },
    });
    // Call GetInstructors
    const initialinstructor = await GetInstructors();
    // ตรวจสอบว่า axios.get ถูกเรียกด้วย parameters ที่ถูกต้อง
    expect(mockAxiosGet).toHaveBeenCalledWith(
      "http://localhost:4000/api/instructor"
    );

    // Render the component
    render(
      <Home
        initialProducts={initialProducts}
        initialinstructor={initialinstructor}
      />
    );

    expect(screen.getByText(/No result/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Try to remove filters and sorting/i)
    ).toBeInTheDocument();
  });

  it("should handle API errors gracefully", async () => {
    // Mock API response for GetInstructors
    mockAxiosGet.mockResolvedValueOnce({
      data: { userList: mockInstructors },
    });
    // Call GetInstructors
    const initialinstructor = await GetInstructors();
    // ตรวจสอบว่า axios.get ถูกเรียกด้วย parameters ที่ถูกต้อง
    expect(mockAxiosGet).toHaveBeenCalledWith(
      "http://localhost:4000/api/instructor"
    );

    // Mock API ให้ส่ง error 404
    mockAxiosGet.mockRejectedValue(new Error("Failed to load product data"));

    // Mock console.error
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Call GetProduct
    const initialProducts = await GetProduct();

    // Assert the return value
    expect(initialProducts).toEqual({
      product: [],
      total: 0,
      error: "Failed to load product data",
    });

    // Assert console.error เรียกถูกต้อง
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to load product data",
      expect.any(Error) // ตรวจสอบว่า Error object ถูกส่งเป็น argument
    );

    render(
      <Home
        initialProducts={initialProducts}
        initialinstructor={initialinstructor}
      />
    );
    // ตรวจสอบว่าข้อความแสดงข้อผิดพลาดปรากฏ
    await waitFor(() =>
      expect(
        screen.queryByText(/Failed to load product data/i)
      ).toBeInTheDocument()
    );

    // ตรวจสอบว่าฟิลเตอร์ยังแสดงอยู่
    const instructorSelect = screen.getByLabelText(/Instructor/i);
    expect(instructorSelect).toBeInTheDocument();

    const sortSelect = screen.getByLabelText(/Sort by/i);
    expect(sortSelect).toBeInTheDocument();

    const levelSelect = screen.getByLabelText(/Level/i);
    expect(levelSelect).toBeInTheDocument();

    const statusSelect = screen.getByLabelText(/Status/i);
    expect(statusSelect).toBeInTheDocument();
  });

  it("should update UI when filters are changed", async () => {
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
    // Mock API response for GetInstructors
    mockAxiosGet.mockResolvedValueOnce({
      data: { userList: mockInstructors },
    });
    // Call GetInstructors
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

    const instructorSelect = screen.getByLabelText(/Instructor/i);
    expect(instructorSelect).toBeInTheDocument();

    const sortSelect = screen.getByLabelText(/Sort by/i);
    expect(sortSelect).toBeInTheDocument();

    const levelSelect = screen.getByLabelText(/Level/i);
    expect(levelSelect).toBeInTheDocument();

    const statusSelect = screen.getByLabelText(/Status/i);
    expect(statusSelect).toBeInTheDocument();

    expect(
      screen.getByText(/Titan/i, { selector: "#select-1 option" })
    ).toBeInTheDocument();
    // ตรวจสอบ UI
    expect(
      screen.getByText(/Advanced/i, { selector: "#select-2 option" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Open/i, { selector: "#select-3 option" })
    ).toBeInTheDocument();
    // expect(
    //   screen.getByText(/A-Z/i, { selector: "#select-4 option" })
    // ).toBeInTheDocument();

    // Mock การเปลี่ยนค่าใน Select ของ Sort
    // fireEvent.change(sortSelect, { target: { value: "A-Z" } });

    // Mock การเปลี่ยนค่าใน Select ของ Level
    fireEvent.change(levelSelect, { target: { value: "Advanced" } });

    // Mock การเปลี่ยนค่าใน Select ของ Status
    fireEvent.change(statusSelect, { target: { value: "Open" } });

    expect(instructorSelect).toBeInTheDocument();

    // เปลี่ยนค่า Filter และตรวจสอบว่า UI ตอบสนอง
    fireEvent.change(instructorSelect, { target: { value: "bukky" } });
    expect(screen.getByDisplayValue("bukky")).toBeInTheDocument();

    // fireEvent.change(sortSelect, { target: { value: "A-Z" } });
    // expect(screen.getByDisplayValue("A-Z")).toBeInTheDocument();

    fireEvent.change(levelSelect, { target: { value: "Advanced" } });
    expect(screen.getByDisplayValue("Advanced")).toBeInTheDocument();

    fireEvent.change(statusSelect, { target: { value: "Closed" } });
    expect(screen.getByDisplayValue("Closed")).toBeInTheDocument();

    // ตรวจสอบว่าฟังก์ชัน fetchProduct ถูกเรียกเมื่อเปลี่ยน Filter
    // expect(mockAxiosGet).toHaveBeenCalledTimes(3); // หรือจำนวนครั้งที่คาดว่าจะเรียก
  });
});
