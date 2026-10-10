import React from 'react'
import PostJobPage from '@/app/components/dashboard/recruiter/PostJobPage'
import { getCompaniesByRecruiter } from '../../../../lib/data';


const page = async () => {
  const recruiterCompany = await getCompaniesByRecruiter();
  return (
    <div>
      <PostJobPage company={recruiterCompany} />
    </div>
  )
}

export default page
