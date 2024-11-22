import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "@/app/components/FilterBar";
import { describe, it, expect, vi } from "vitest";
import React from "react";
describe("FilterBar Component", () => {
  const mockSetInstructor = vi.fn();
  const mockSetLevel = vi.fn();
  const mockSetStatus = vi.fn();
  const mockSetSort = vi.fn();
  const wrapFilterBar = () => {
    return render(
      <FilterBar
        Instructor=""
        setInstructor={mockSetInstructor}
        Level=""
        setLevel={mockSetLevel}
        Status=""
        setStatus={mockSetStatus}
        Sort="Recommended"
        setSort={mockSetSort}
        instructors={mockInstructors}
      />
    );
  };
  const mockInstructors = [
    {
      id: "1",
      Instructor_Name: "Titan",
      email: "titan@example.com",
      role: "Instructor",
    },
    {
      id: "2",
      Instructor_Name: "Alex",
      email: "alex@example.com",
      role: "Instructor",
    },
  ];

  it("renders filters correctly", () => {
    wrapFilterBar();
    // ตรวจสอบว่า element ต่างๆ แสดงผลได้ถูกต้อง
    expect(screen.getByLabelText(/Instructor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Level/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sort by/i)).toBeInTheDocument();
  });

  it("fires setInstructor when an instructor is selected", async () => {
    wrapFilterBar();

    const instructorSelect = screen.getByLabelText(/Instructor/i);
    fireEvent.change(instructorSelect, { target: { value: "1" } });

    // ตรวจสอบว่า mock function ถูกเรียก
    expect(mockSetInstructor).toHaveBeenCalledWith("1");
    //ถ้าเลือก 1 จะต้องได้ชื่อของคนไอดี 1
    expect(await screen.findByText(/Titan/i)).toBeInTheDocument();
  });

  it("fires setLevel when a level is selected", async () => {
    wrapFilterBar();

    const levelSelect = screen.getByLabelText(/Level/i);
    fireEvent.change(levelSelect, { target: { value: "Advanced" } });

    expect(mockSetLevel).toHaveBeenCalledWith("Advanced");
    expect(await screen.findByText(/Advanced/i)).toBeInTheDocument();
  });

  it("fires setStatus when a status is selected", () => {
    wrapFilterBar();

    const statusSelect = screen.getByLabelText(/Status/i);
    fireEvent.change(statusSelect, { target: { value: "Open" } });

    expect(mockSetStatus).toHaveBeenCalledWith("Open");
  });

  it("fires setSort when a sorting option is selected", () => {
    wrapFilterBar();

    const sortSelect = screen.getByLabelText(/Sort by/i);
    fireEvent.change(sortSelect, { target: { value: "A-Z" } });

    expect(mockSetSort).toHaveBeenCalledWith("A-Z");
  });
});
