import React from 'react'
import JobListings from '../../../components/JobListings'
import AdminLayout from '../../../components/layouts/AdminLayout'

type Props = {}

const EditJobs = (props: Props) => {
  return (
    <AdminLayout>
      <JobListings/>
    </AdminLayout>
  )
}

export default EditJobs