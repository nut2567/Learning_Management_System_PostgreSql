import axios from "axios";
import React from "react";
import FilterBar from "@/app/layouts/FilterPage";
export const GetInstructors = async () => {
  try {
    const baseURL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
    const { data } = await axios.get(`${baseURL}/api/instructor`);
    console.log(data);
    // ตรวจสอบและส่งข้อมูล
    if (data && data.userList) {
      return data.userList;
    }
    return [];
  } catch (err) {
    console.error("Error fetching instructors:", err);
    return [];
  }
};

const InstructorsSSR = async () => {
  const instructors = await GetInstructors();
  return <FilterBar instructors={instructors} />;
};

export default InstructorsSSR;
