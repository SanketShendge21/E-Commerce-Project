import React, {useEffect} from 'react'
import Sidebar from './sidebar'
import { useRouter } from 'next/router'
const Index = () => {
  const router = useRouter()
  useEffect(() => {
    if(!localStorage.getItem('admin')){
      router.push('/admin/login')
    }
  }, [])
  return (
    <div className='min-h-screen'>

      <Sidebar></Sidebar>
    </div>
  )
}

export default Index