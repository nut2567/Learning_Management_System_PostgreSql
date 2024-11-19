import axios from "axios";
import FilterBar from "@/app//layouts/FilterPage";
const getInstructors = async () => {
  try {
    const baseURL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
    const resp = await axios.get(`${baseURL}/api/instructor`);
    console.log(resp.data);
    // ตรวจสอบและส่งข้อมูล
    if (resp.data && resp.data.userList) {
      return resp.data.userList; // Return only necessary data
    }
    return [];
  } catch (err) {
    console.error("Error fetching instructors:", err);
    return [];
  }
};

const CoursesSSR = async () => {
  const instructors = await getInstructors();
  return <FilterBar instructors={instructors} />;
};

export default CoursesSSR;
