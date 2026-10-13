import React from 'react';
import MyCompanyPage from '../../../components/dashboard/recruiter/company/MyCompanyPage';
import { getCompaniesByRecruiter } from '../../../lib/data';






const MyCompanyHomePage = async () => {
  const recruiterCompany = await getCompaniesByRecruiter(); 
  console.log("Recruiter company data:", recruiterCompany);

  return (
    <div>
      <MyCompanyPage initialCompany={recruiterCompany} />
    </div>
  );
};

export default MyCompanyHomePage;