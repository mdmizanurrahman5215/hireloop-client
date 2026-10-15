
import React from 'react'
import JobDetailsPage from '../../components/pages/JobDetailsPage'
import { getJobById } from '../../lib/data'
import EmptyState from '../../components/EmptyState'

const page = async ({ params }) => {

  const resolvedParams = await params;
    console.log("resolvedParams:", resolvedParams); 
  const id = resolvedParams?.id;
 console.log("id:", id); 
  if (!id) {
    return (
      <EmptyState
        title="Invalid Request"
        description="No job ID was provided."
      />
    );
  }


  const response = await getJobById(id);
   console.log("response:", response); 

 
  const job = response?.success ? (response?.data?.data || response?.data) : null;

  console.log("job:", job); 
  
  if (!job || !job._id) {
    return (
      <EmptyState
        title="Job not found"
        description="The job you are looking for does not exist or has been removed."
      />
    );
  }

  return (
    <div>
      <JobDetailsPage job={job} id = {id}/>
     
    </div>
  );
}

export default page;