import axios from "axios";
import CoursesSSR from "@/app/utils/getInstructors";

const Home = async () => {
  return <CoursesSSR />;
};

export default Home;
