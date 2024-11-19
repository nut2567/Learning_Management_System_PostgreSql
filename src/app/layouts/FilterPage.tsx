"use client";

import { useState } from "react";
import FilterBar, { User } from "@/app/components/FilterBar";

const FilterPage = ({ instructors }: { instructors: User[] }) => {
  const [Instructor, setInstructor] = useState("");
  const [Level, setLevel] = useState("");
  const [Status, setStatus] = useState("");
  const [Sort, setSort] = useState("");

  return (
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
  );
};

export default FilterPage;
