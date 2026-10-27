import React from 'react'
import UserManagementPage from '../../../components/dashboard/admin/pages/UserManagementPage'
import { getUserList } from '../../../lib/api/users'

const page = async() => {
  const data = await getUserList()
  const users =data?.users;
  console.log({data});
  console.log({users});
  
  return (
    <div>
      <UserManagementPage INITIAL_USERS_DATA = {users}/>
    </div>
  )
}

export default page
