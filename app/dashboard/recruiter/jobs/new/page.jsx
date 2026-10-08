import React from 'react'
import PostJobPage from '@/app/components/dashboard/recruiter/PostJobPage'
import { getCompaniesByRecruiterAction } from '@/app/lib/data';

const page = async () => {
  const recruiterCompany = await getCompaniesByRecruiterAction();
  return (
    <div>
      <PostJobPage company={recruiterCompany} />
    </div>
  )
}

export default page
