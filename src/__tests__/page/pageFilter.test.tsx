import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "@/app/layouts/homepage";
import { GetProduct } from "@/app/utils/getproduct";
import { GetInstructors } from "@/app/utils/getInstructors";
import { describe, it, expect, beforeEach, vi } from "vitest";
import ProductList, { Courses } from "@/app/components/ProductList";
import React from "react";
import axios from "axios";

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
    id: 28,
    courseTitle: "Back-End Development6",
    courseDuration: 3,
    level: "Advanced",
    enrollmentCount: 98,
    createdAt: new Date(),
    status: "Open",
    image: "/16_9.png",
    userId: 3,
    user: {
      Instructor_Name: "deisy",
      email: "deisy@home.com",
      createdAt: new Date(),
      age: 1.2,
      image: "/S__7667726_0.jpg",
      phone: "098-9895888",
    },
  },
];
const mockInstructors = [
  {
    id: 2,
    Instructor_Name: "bukky",
    createdAt: "2024-11-17T20:47:15.262Z",
    age: 3.5,
    email: "bukky@home.com",
    image: "/bukky.jpg",
    phone: "098-9895888",
  },
  {
    id: 3,
    Instructor_Name: "deisy",
    createdAt: "2024-11-17T20:47:15.270Z",
    age: 1.2,
    email: "deisy@home.com",
    image: "/S__7667726_0.jpg",
    phone: "098-9895888",
  },
  {
    id: 4,
    Instructor_Name: "John Wick",
    createdAt: "2024-11-17T20:47:15.274Z",
    age: 30,
    email: "John_Wick@gokillyou.com",
    image: "/nut.jpg",
    phone: "5",
  },
  {
    id: 5,
    Instructor_Name: "Jon Snow",
    createdAt: "2024-11-17T20:47:15.278Z",
    age: 40,
    email: "Jon Snow@filllikecool.com",
    image: "/Jon_Snow.png",
    phone: "088-8885648",
  },
  {
    id: 1,
    Instructor_Name: "Nutthawat",
    createdAt: "2024-11-17T11:26:15.634Z",
    age: 28,
    email: "Nutthawat@gmail.com",
    image: "/20191216_082746.jpg",
    phone: "098-2691859",
  },
  {
    id: 6,
    Instructor_Name: "Titan",
    createdAt: "2024-11-17T20:47:15.289Z",
    age: 40,
    email: "Titan@gmail.com",
    image: "/Titan.jpg",
    phone: "026-755888",
  },
];

describe("Renders list of products should call API with correct parameters Filter", async () => {
  beforeEach(async () => {
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
    // ตรวจสอบผลลัพธ์ที่คืนค่า
    expect(initialProducts).toEqual({ courses: mockProducts, total: 2 });
    expect(initialinstructor).toEqual(mockInstructors);

    render(
      <Home
        initialProducts={initialProducts}
        initialinstructor={initialinstructor}
      />
    );
  });
  it("All filter no sort", async () => {
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
    expect(
      screen.getByText(/Advanced/i, { selector: "#select-2 option" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Open/i, { selector: "#select-3 option" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A-Z/i, { selector: "#select-sort option" })
    ).toBeInTheDocument();

    mockAxiosGet.mockResolvedValueOnce({
      data: {
        courses: [
          {
            id: 16,
            courseTitle: "Front-End Development4",
            courseDuration: 24,
            level: "Beginner",
            enrollmentCount: 58205,
            createdAt: "2024-11-17T22:09:12.716Z",
            status: "Open",
            image: "/16_4.png",
            userId: 2,
            user: {
              Instructor_Name: "bukky",
              email: "bukky@home.com",
              createdAt: "2024-11-17T20:47:15.262Z",
              age: 3.5,
              image: "/bukky.jpg",
              phone: "098-9895888",
            },
          },
          {
            id: 17,
            courseTitle: "Front-End Development5",
            courseDuration: 24,
            level: "Beginner",
            enrollmentCount: 58205,
            createdAt: "2024-11-17T22:09:12.721Z",
            status: "Open",
            image: "/16_4.png",
            userId: 2,
            user: {
              Instructor_Name: "bukky",
              email: "bukky@home.com",
              createdAt: "2024-11-17T20:47:15.262Z",
              age: 3.5,
              image: "/bukky.jpg",
              phone: "098-9895888",
            },
          },
        ],
        total: 2,
      },
    });

    // Mock การเปลี่ยนค่าใน Select ของ Status
    fireEvent.change(statusSelect, { target: { value: "Open" } });
    expect(screen.getByDisplayValue("Open")).toBeInTheDocument();

    await waitFor(() => {
      // ตรวจสอบว่ามี <figure> ที่มีรูปภาพที่ถูกต้อง
      expect(
        screen.getByAltText(/Front-End Development4/i)
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(/Front-End Development5/i)
      ).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: /Front-End Development4/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: /Front-End Development5/i })
      ).toBeInTheDocument();

      // ตรวจสอบระดับ
      const lavel = screen.getAllByText(/Beginner/i, {
        selector: "div > div > div:nth-child(1) > button:nth-child(1)",
      });
      expect(lavel).toHaveLength(2);
      expect(
        screen.queryByText(/Advanced/i, {
          selector: "div > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Intermediate/i, {
          selector: "div > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).not.toBeInTheDocument();

      // ตรวจสอบสถานะ
      const matches = screen.getAllByText(/Open/i, {
        selector: "div > div > div > button:nth-child(2)",
      });
      expect(matches).toHaveLength(2);
      expect(
        screen.queryByText(/Closed/i, {
          selector: "div > div > div > button:nth-child(2)",
        })
      ).not.toBeInTheDocument();

      // ตรวจสอบว่าชื่อคอร์สทั้งหมดถูกเรนเดอร์
      expect(
        screen.getByText(/Front-End Development5/i, {
          selector: "div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Front-End Development4/i, {
          selector: "div:nth-child(2) > h2",
        })
      ).toBeInTheDocument();

      // ตรวจผู้สอบ
      const tech = screen.getAllByText(/bukky/i, {
        selector: "div > div > div:nth-child(3) > p",
      });
      expect(tech).toHaveLength(2);

      // ตรวจสอบว่าระยะเวลาถูกต้อง
      expect(
        screen.getAllByText(/24 hr 0 mins/i, {
          selector: "div:nth-child(1) > p",
        })
      ).toHaveLength(2);

      // ตรวจสอบจำนวนผู้ลงทะเบียน
      expect(
        screen.getAllByText(/58,205/i, { selector: "div:nth-child(2) > p" })
      ).toHaveLength(2);
    });
  });

  it("All filter and sort courseTitle", async () => {
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
    expect(
      screen.getByText(/Advanced/i, { selector: "#select-2 option" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Open/i, { selector: "#select-3 option" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A-Z/i, { selector: "#select-sort option" })
    ).toBeInTheDocument();
    const mock = () => {
      return mockAxiosGet.mockResolvedValueOnce({
        data: {
          courses: [
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
          ],
          total: 2,
        },
      });
    };

    mock();

    // Mock การเปลี่ยนค่าใน Select ของ Status
    fireEvent.change(statusSelect, { target: { value: "Closed" } });
    expect(screen.getByDisplayValue("Closed")).toBeInTheDocument();
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
      expect(
        screen.queryByText(/Open/i, {
          selector: "div > div > div > button:nth-child(2)",
        })
      ).not.toBeInTheDocument();

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

    mock();

    // Mock การเปลี่ยนค่าใน Select ของ Level
    fireEvent.change(levelSelect, { target: { value: "Beginner" } });
    expect(screen.getByDisplayValue("Beginner")).toBeInTheDocument();
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

      expect(
        screen.queryByText(/Advanced/i, {
          selector: "div > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Intermediate/i, {
          selector: "div > div > div:nth-child(1) > button:nth-child(1)",
        })
      ).not.toBeInTheDocument();

      // ตรวจสอบสถานะ
      const matches = screen.getAllByText(/Closed/i, {
        selector: "div > div > div > button:nth-child(2)",
      });

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
