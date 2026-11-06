import React from 'react'
import ApplicationsPage from '../../../components/dashboard/jobseeker/applications/ApplicationsPage'
import { getServerUser } from '../../../lib/server-session';

const page = async () => {
    const user = await getServerUser();
  return (
    <div>
      <ApplicationsPage user={user} />
    </div>
  )
}

export default page
