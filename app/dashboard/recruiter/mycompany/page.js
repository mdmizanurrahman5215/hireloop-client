import React from 'react';
import MyCompanyPage from '../../../components/dashboard/recruiter/company/MyCompanyPage';
import { getCompaniesByRecruiterAction } from '../../../lib/data';

const MyCompanyHomePage = async () => {
  const recruiterCompany = await getCompaniesByRecruiterAction();

  return (
    <div>
      <MyCompanyPage initialCompany={recruiterCompany} />
    </div>
  );
};

export default MyCompanyHomePage;