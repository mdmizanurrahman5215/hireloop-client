import React from "react";
import JobsPage from "../components/pages/JobsPage";
import { getJobs } from "../lib/data"; 

export default async function Page({ searchParams }) {
 
  const resolvedParams = await searchParams; 
  const search = resolvedParams?.search || "";
  const category = resolvedParams?.category || "";
  const type = resolvedParams?.type || "";
  const location = resolvedParams?.location || "";
  const isRemote = resolvedParams?.isRemote || "";
  const minSalary = resolvedParams?.minSalary || "";
  const maxSalary = resolvedParams?.maxSalary || "";
  const page = Number(resolvedParams?.page) || 1;
  
  console.log("Search Params:", { search, category, type, location, isRemote, minSalary, maxSalary, page }); 
  console.log("Search Params:", resolvedParams); 
  
  // Server Side-এ Data Fetch
  const response = await getJobs({
    search,
    category,
    type,
    location,
    isRemote,
    minSalary,
    maxSalary,
    page,
  });

  console.log("response:", response);
  const jobs = response?.success
    ? response?.data?.jobs || response?.data?.data?.jobs || response?.data || []
    : [];
  console.log("jobs:", jobs); 
  
  const totalPages = response?.success 
    ? response?.data?.totalPages || response?.data?.data?.totalPages || 1 
    : 1;
  const errorMsg = !response?.success ? response?.error || "Failed to load jobs" : "";

  return (
    <JobsPage
      jobs={jobs}
      totalPages={totalPages}
      errorMsg={errorMsg}
      searchQuery={search}
      selectedTypes={type ? type.split(",") : []}
      currentPage={page}
    />
  );
}