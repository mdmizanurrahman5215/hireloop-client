import React from 'react';
import ManageJobsPage from '../../../components/dashboard/recruiter/ManageJobsPage';
import { getCompaniesByRecruiter, getJobs } from '../../../lib/data';

const ManageJobs = async ({ searchParams }) => {
 
  const resolvedParams = await searchParams;
  const searchTerm = resolvedParams?.search || "";
  const statusFilter = resolvedParams?.status || "all";

  const recruiterCompany = await getCompaniesByRecruiter();
 const companyId = recruiterCompany?.data?.companies[0]?._id; 

console.log("companyId:", companyId); 
  
  let initialJobs = [];
  if (companyId) {
    const res = await getJobs({ 
      companyId: companyId,
      search: searchTerm,
      status: statusFilter !== "all" ? statusFilter : undefined
    });
    console.log("jobs response:", res); 
    initialJobs = res?.data?.data?.jobs;
  }
 console.log("Initial jobs fetched:", initialJobs); 
  return (
    <div>
      <ManageJobsPage 
        recruiterCompany={recruiterCompany} 
        initialJobs={initialJobs}
        defaultSearch={searchTerm}
        defaultStatus={statusFilter}
      />
    </div>
  );
};

export default ManageJobs;