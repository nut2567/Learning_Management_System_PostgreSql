"use client";

import WrapLoading from "@/app/layouts/WrapLoadind";
import { Suspense } from "react";
import dynamic from "next/dynamic";
// dynamic import สำหรับ component ที่ใช้ useSearchParams
import CourseForm from "./CourseForm";
export default function MyComponent() {
  return (
    <Suspense fallback={<WrapLoading />}>
      <CourseForm />
    </Suspense>
  );
}
