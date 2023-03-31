import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = {}

const index = (props: Props) => {
    const router = useRouter()
    useEffect(()=> {
        router.push('/admin/jobs')
    })
  return (
    <div>index</div>
  )
}

export default index