import axios from "axios";
import FilterBar from "@/app/layouts/FilterPage";
export const GetInstructors = async () => {
  try {
    const baseURL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
    const { data } = await axios.get(`${baseURL}/api/instructor`);
    console.log(data);
    // ตรวจสอบและส่งข้อมูล
    if (data && data.userList) {
      return data.userList; // Return only necessary data
    }
    return [];
  } catch (err) {
    console.error("Error fetching instructors:", err);
    return [];
  }
};

const CoursesSSR = async () => {
  const instructors = await GetInstructors();
  return <FilterBar instructors={instructors} />;
};

export default CoursesSSR;
