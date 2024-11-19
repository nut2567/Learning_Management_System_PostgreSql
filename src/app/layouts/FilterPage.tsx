"use client";

import { useState } from "react";
import FilterBar, { User } from "@/app/components/FilterBar";

import React from "react";
const FilterPage = ({ instructors }: { instructors: User[] }) => {
  const [Instructor, setInstructor] = useState("");
  const [Level, setLevel] = useState("");
  const [Status, setStatus] = useState("");
  const [Sort, setSort] = useState("");

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Courses</h1>
      <FilterBar
        Instructor={Instructor}
        setInstructor={setInstructor}
        Level={Level}
        setLevel={setLevel}
        Status={Status}
        setStatus={setStatus}
        Sort={Sort}
        setSort={setSort}
        instructors={instructors}
      />
    </div>
  );
};

export default FilterPage;
