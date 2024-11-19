import axios from "axios";
export default async function GetProduct(
  page = 1,
  limit = 9,
  filters = { Instructor: "", Status: "", Level: "", Sort: "" }
) {
  try {
    // ดึงค่าจาก filters
    const { Instructor, Status, Level, Sort } = filters;

    // สร้าง params object สำหรับ axios
    const params: any = { page, limit };

    // เพิ่มค่าที่ไม่ว่างลงใน params
    if (Instructor) params.Instructor = Instructor;
    if (Status) params.Status = Status;
    if (Level) params.Level = Level;
    if (Sort) params.Sort = Sort;

    // ทำการเรียก API
    const resp = await axios.get(`/api/getcourse`, { params });
    console.log(resp);
    // ตรวจสอบและส่งข้อมูลที่ได้รับ
    if (resp.data && resp.data.courses) {
      return resp.data; // Return data from response
    } else {
      return { product: [], total: 0 }; // Return empty data if no products
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { product: [], total: 0 };
  }
}
