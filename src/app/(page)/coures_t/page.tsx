import axios from "axios";
import FilterBar from "./FilterBar";
import ProductList from "./ProductList";

const fetchProducts = async (filters: any) => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
  const response = await axios.get(`${baseURL}/api/getcourse`, {
    params: { page: 1, limit: 9, ...filters },
  });
  return response.data;
};

export default async function Home() {
  const filters = {}; // กำหนด filters ที่ต้องการ
  const data = await fetchProducts(filters); // ดึงข้อมูลจาก API

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Available Courses</h1>
      {/* <FilterBar /> */}
      <ProductList products={data.courses || []} />
    </div>
  );
}
