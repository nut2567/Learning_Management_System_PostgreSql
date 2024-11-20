import { render, screen, waitFor } from "@testing-library/react";
import ProductList, { Courses } from "@/app/components/ProductList";
import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import axios from "axios";
import { GetProduct } from "@/app/utils/getproduct";

vi.mock("axios");
const mockAxiosGet = vi.mocked(axios.get);

describe("Renders list of products should call API with correct parameters no filter all sort", () => {
  it("sort courseTitle Z-A", async () => {
    const mockProducts: Courses[] = [
      {
        id: 72,
        courseTitle: "Full-Stack Software Development20",
        courseDuration: 80,
        level: "Advanced",
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
      Instructor: "",
      Status: "",
      Level: "",
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
          Sort: "Z-A",
        },
      }
    );

    // ตรวจสอบผลลัพธ์ที่คืนค่า
    expect(result).toEqual({ courses: mockProducts, total: 2 });

    render(<ProductList products={result.courses} />);
    await waitFor(() => {
      // ตรวจสอบระดับ
      expect(
        screen.getByText(/Advanced/i, {
          selector:
            "#card_Courses_1 > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Beginner/i, {
          selector:
            "#card_Courses_2 > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).toBeInTheDocument();

      // ตรวจสอบสถานะ
      const matches = screen.getAllByText(/Closed/i, {
        selector: "div > div > div > button:nth-child(2)",
      });
      expect(matches).toHaveLength(2);

      // ตรวจสอบว่าชื่อคอร์สทั้งหมดถูกเรนเดอร์
      expect(
        screen.getByText(/Full-Stack Software Development20/i, {
          selector: "#card_Courses_1 > div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Data Analytics1/i, {
          selector: "#card_Courses_2 > div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();

      // ตรวจผู้สอบ
      const tech = screen.getAllByText(/Titan/i, {
        selector: "div > div > div:nth-child(3) > p",
      });
      expect(tech).toHaveLength(2);

      // ตรวจสอบว่าระยะเวลาถูกต้อง
      expect(
        screen.getByText(/80 hr 0 mins/i, {
          selector: "#card_Courses_1 >div:nth-child(3) >div:nth-child(1) > p",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/12 hr 50 mins/i, {
          selector: "#card_Courses_2 >div:nth-child(3) >div:nth-child(1) > p",
        })
      ).toBeInTheDocument();

      // ตรวจสอบจำนวนผู้ลงทะเบียน
      expect(
        screen.getByText(/33/i, {
          selector: "#card_Courses_1 >div:nth-child(3) >div:nth-child(2) > p",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/668/i, {
          selector: "#card_Courses_2 >div:nth-child(3) >div:nth-child(2) > p",
        })
      ).toBeInTheDocument();
    });
  });

  it("sort courseTitle A-Z", async () => {
    const mockProducts: Courses[] = [
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
      {
        id: 72,
        courseTitle: "Full-Stack Software Development20",
        courseDuration: 80,
        level: "Advanced",
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
    ];
    const filters = {
      Instructor: "",
      Status: "",
      Level: "",
      Sort: "A-Z",
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
          Sort: "A-Z",
        },
      }
    );

    // ตรวจสอบผลลัพธ์ที่คืนค่า
    expect(result).toEqual({ courses: mockProducts, total: 2 });

    render(<ProductList products={result.courses} />);

    await waitFor(() => {
      // ตรวจสอบระดับ
      expect(
        screen.getByText(/Advanced/i, {
          selector:
            "#card_Courses_2 > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Beginner/i, {
          selector:
            "#card_Courses_1 > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).toBeInTheDocument();

      // ตรวจสอบสถานะ
      const matches = screen.getAllByText(/Closed/i, {
        selector: "div > div > div > button:nth-child(2)",
      });
      expect(matches).toHaveLength(2);

      // ตรวจสอบว่าชื่อคอร์สทั้งหมดถูกเรนเดอร์
      expect(
        screen.getByText(/Full-Stack Software Development20/i, {
          selector: "#card_Courses_2 > div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Data Analytics1/i, {
          selector: "#card_Courses_1 > div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();

      // ตรวจผู้สอบ
      const tech = screen.getAllByText(/Titan/i, {
        selector: "div > div > div:nth-child(3) > p",
      });
      expect(tech).toHaveLength(2);

      // ตรวจสอบว่าระยะเวลาถูกต้อง
      expect(
        screen.getByText(/80 hr 0 mins/i, {
          selector: "#card_Courses_2 >div:nth-child(3) >div:nth-child(1) > p",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/12 hr 50 mins/i, {
          selector: "#card_Courses_1 >div:nth-child(3) >div:nth-child(1) > p",
        })
      ).toBeInTheDocument();

      // ตรวจสอบจำนวนผู้ลงทะเบียน
      expect(
        screen.getByText(/33/i, {
          selector: "#card_Courses_2 >div:nth-child(3) >div:nth-child(2) > p",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/668/i, {
          selector: "#card_Courses_1 >div:nth-child(3) >div:nth-child(2) > p",
        })
      ).toBeInTheDocument();
    });
  });

  it("sort Enrollment count (High to low)", async () => {
    const mockProducts: Courses[] = [
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
      {
        id: 72,
        courseTitle: "Full-Stack Software Development20",
        courseDuration: 80,
        level: "Advanced",
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
    ];
    const filters = {
      Instructor: "",
      Status: "",
      Level: "",
      Sort: "countHigh",
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
          Sort: "A-Z",
        },
      }
    );

    // ตรวจสอบผลลัพธ์ที่คืนค่า
    expect(result).toEqual({ courses: mockProducts, total: 2 });

    render(<ProductList products={result.courses} />);

    await waitFor(() => {
      // ตรวจสอบระดับ
      expect(
        screen.getByText(/Advanced/i, {
          selector:
            "#card_Courses_2 > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Beginner/i, {
          selector:
            "#card_Courses_1 > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).toBeInTheDocument();

      // ตรวจสอบสถานะ
      const matches = screen.getAllByText(/Closed/i, {
        selector: "div > div > div > button:nth-child(2)",
      });
      expect(matches).toHaveLength(2);

      // ตรวจสอบว่าชื่อคอร์สทั้งหมดถูกเรนเดอร์
      expect(
        screen.getByText(/Full-Stack Software Development20/i, {
          selector: "#card_Courses_2 > div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Data Analytics1/i, {
          selector: "#card_Courses_1 > div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();

      // ตรวจผู้สอบ
      const tech = screen.getAllByText(/Titan/i, {
        selector: "div > div > div:nth-child(3) > p",
      });
      expect(tech).toHaveLength(2);

      // ตรวจสอบว่าระยะเวลาถูกต้อง
      expect(
        screen.getByText(/80 hr 0 mins/i, {
          selector: "#card_Courses_2 >div:nth-child(3) >div:nth-child(1) > p",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/12 hr 50 mins/i, {
          selector: "#card_Courses_1 >div:nth-child(3) >div:nth-child(1) > p",
        })
      ).toBeInTheDocument();

      // ตรวจสอบจำนวนผู้ลงทะเบียน
      expect(
        screen.getByText(/33/i, {
          selector: "#card_Courses_2 >div:nth-child(3) >div:nth-child(2) > p",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/668/i, {
          selector: "#card_Courses_1 >div:nth-child(3) >div:nth-child(2) > p",
        })
      ).toBeInTheDocument();
    });
  });

  it("sort Enrollment count (Low to high)", async () => {
    const mockProducts: Courses[] = [
      {
        id: 2,
        courseTitle: "Data Analytics1",
        courseDuration: 12.5,
        level: "Beginner",
        enrollmentCount: 123,
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
      {
        id: 72,
        courseTitle: "Full-Stack Software Development20",
        courseDuration: 80,
        level: "Advanced",
        enrollmentCount: 5200,
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
    ];
    const filters = {
      Instructor: "",
      Status: "",
      Level: "",
      Sort: "countLow",
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
          Sort: "A-Z",
        },
      }
    );

    // ตรวจสอบผลลัพธ์ที่คืนค่า
    expect(result).toEqual({ courses: mockProducts, total: 2 });

    render(<ProductList products={result.courses} />);

    await waitFor(() => {
      // ตรวจสอบระดับ
      expect(
        screen.getByText(/Advanced/i, {
          selector:
            "#card_Courses_2 > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Beginner/i, {
          selector:
            "#card_Courses_1 > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).toBeInTheDocument();

      // ตรวจสอบสถานะ
      const matches = screen.getAllByText(/Closed/i, {
        selector: "div > div > div > button:nth-child(2)",
      });
      expect(matches).toHaveLength(2);

      // ตรวจสอบว่าชื่อคอร์สทั้งหมดถูกเรนเดอร์
      expect(
        screen.getByText(/Full-Stack Software Development20/i, {
          selector: "#card_Courses_2 > div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Data Analytics1/i, {
          selector: "#card_Courses_1 > div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();

      // ตรวจผู้สอบ
      const tech = screen.getAllByText(/Titan/i, {
        selector: "div > div > div:nth-child(3) > p",
      });
      expect(tech).toHaveLength(2);

      // ตรวจสอบว่าระยะเวลาถูกต้อง
      expect(
        screen.getByText(/80 hr 0 mins/i, {
          selector: "#card_Courses_2 >div:nth-child(3) >div:nth-child(1) > p",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/12 hr 50 mins/i, {
          selector: "#card_Courses_1 >div:nth-child(3) >div:nth-child(1) > p",
        })
      ).toBeInTheDocument();

      // ตรวจสอบจำนวนผู้ลงทะเบียน
      expect(
        screen.getByText(/5,200/i, {
          selector: "#card_Courses_2 >div:nth-child(3) >div:nth-child(2) > p",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/123/i, {
          selector: "#card_Courses_1 >div:nth-child(3) >div:nth-child(2) > p",
        })
      ).toBeInTheDocument();
    });
  });

  it("sort Course duration (Hight to low)", async () => {
    const mockProducts: Courses[] = [
      {
        id: 2,
        courseTitle: "Data Analytics1",
        courseDuration: 72.3,
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
      {
        id: 72,
        courseTitle: "Full-Stack Software Development20",
        courseDuration: 18.2,
        level: "Advanced",
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
    ];
    const filters = {
      Instructor: "",
      Status: "",
      Level: "",
      Sort: "durationHigh",
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
          Sort: "durationHigh",
        },
      }
    );

    // ตรวจสอบผลลัพธ์ที่คืนค่า
    expect(result).toEqual({ courses: mockProducts, total: 2 });

    render(<ProductList products={result.courses} />);

    await waitFor(() => {
      // ตรวจสอบระดับ
      expect(
        screen.getByText(/Advanced/i, {
          selector:
            "#card_Courses_2 > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Beginner/i, {
          selector:
            "#card_Courses_1 > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).toBeInTheDocument();

      // ตรวจสอบสถานะ
      const matches = screen.getAllByText(/Closed/i, {
        selector: "div > div > div > button:nth-child(2)",
      });
      expect(matches).toHaveLength(2);

      // ตรวจสอบว่าชื่อคอร์สทั้งหมดถูกเรนเดอร์
      expect(
        screen.getByText(/Full-Stack Software Development20/i, {
          selector: "#card_Courses_2 > div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Data Analytics1/i, {
          selector: "#card_Courses_1 > div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();

      // ตรวจผู้สอบ
      const tech = screen.getAllByText(/Titan/i, {
        selector: "div > div > div:nth-child(3) > p",
      });
      expect(tech).toHaveLength(2);

      // ตรวจสอบว่าระยะเวลาถูกต้อง
      expect(
        screen.getByText(/18 hr 20 mins/i, {
          selector: "#card_Courses_2 >div:nth-child(3) >div:nth-child(1) > p",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/72 hr 30 mins/i, {
          selector: "#card_Courses_1 >div:nth-child(3) >div:nth-child(1) > p",
        })
      ).toBeInTheDocument();

      // ตรวจสอบจำนวนผู้ลงทะเบียน
      expect(
        screen.getByText(/33/i, {
          selector: "#card_Courses_2 >div:nth-child(3) >div:nth-child(2) > p",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/668/i, {
          selector: "#card_Courses_1 >div:nth-child(3) >div:nth-child(2) > p",
        })
      ).toBeInTheDocument();
    });
  });

  it("sort Course duration (Low to high)", async () => {
    const mockProducts: Courses[] = [
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
      {
        id: 72,
        courseTitle: "Full-Stack Software Development20",
        courseDuration: 80,
        level: "Advanced",
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
    ];
    const filters = {
      Instructor: "",
      Status: "",
      Level: "",
      Sort: "durationLow",
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
          Sort: "durationLow",
        },
      }
    );

    // ตรวจสอบผลลัพธ์ที่คืนค่า
    expect(result).toEqual({ courses: mockProducts, total: 2 });

    render(<ProductList products={result.courses} />);

    await waitFor(() => {
      // ตรวจสอบระดับ
      expect(
        screen.getByText(/Advanced/i, {
          selector:
            "#card_Courses_2 > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Beginner/i, {
          selector:
            "#card_Courses_1 > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).toBeInTheDocument();

      // ตรวจสอบสถานะ
      const matches = screen.getAllByText(/Closed/i, {
        selector: "div > div > div > button:nth-child(2)",
      });
      expect(matches).toHaveLength(2);

      // ตรวจสอบว่าชื่อคอร์สทั้งหมดถูกเรนเดอร์
      expect(
        screen.getByText(/Full-Stack Software Development20/i, {
          selector: "#card_Courses_2 > div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Data Analytics1/i, {
          selector: "#card_Courses_1 > div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();

      // ตรวจผู้สอบ
      const tech = screen.getAllByText(/Titan/i, {
        selector: "div > div > div:nth-child(3) > p",
      });
      expect(tech).toHaveLength(2);

      // ตรวจสอบว่าระยะเวลาถูกต้อง
      expect(
        screen.getByText(/80 hr 0 mins/i, {
          selector: "#card_Courses_2 >div:nth-child(3) >div:nth-child(1) > p",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/12 hr 50 mins/i, {
          selector: "#card_Courses_1 >div:nth-child(3) >div:nth-child(1) > p",
        })
      ).toBeInTheDocument();

      // ตรวจสอบจำนวนผู้ลงทะเบียน
      expect(
        screen.getByText(/33/i, {
          selector: "#card_Courses_2 >div:nth-child(3) >div:nth-child(2) > p",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/668/i, {
          selector: "#card_Courses_1 >div:nth-child(3) >div:nth-child(2) > p",
        })
      ).toBeInTheDocument();
    });
  });
});
