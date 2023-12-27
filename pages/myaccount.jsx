import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const MyAccount = () => {
    const router = useRouter()
    useEffect(() => {
        // if not logged in then redirect to login
        if(!localStorage.getItem('authtoken')){
          router.push('/login')
        }
      }, [router.query])
  return (
    <div>My Account</div>
  )
}

export default MyAccount