import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { CgTrashEmpty } from 'react-icons/cg';
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from 'next/router';

const Sidebar = () => {
    const router = useRouter()
    const ref = useRef();
    const [sidebar, setSidebar] = useState(false);
    const [admin, setAdmin] = useState()
    const toggleBar = () => {
        setSidebar(!sidebar);
    }
    const logout = ()=>{
        localStorage.removeItem('admin')
        router.push('/admin/login')
    }
    useEffect(() => {
        if(localStorage.getItem('admin')){
            let token = JSON.parse(localStorage.getItem('admin'))
            setAdmin(token.token)
        }
    }, [])
    
  return (
    <div className='container mx-2 p-4'>
        {/* ${sidebar ? 'left-0':'-left-96'} */}
        <GiHamburgerMenu className='cursor-pointer' onClick={toggleBar} />
        <div ref={ref}
				className={`z-10 sideBar w-80 h-[100vh] absolute  top-0 bg-slate-50 px-10 p-10 transition-all ${sidebar ? 'left-0':'-left-96'} `}>
				<h2 className="font-bold text-xl text-center">Dashboard</h2>
				<span className="absolute top-5 right-3 cursor-pointer text-2xl text-orange-500" onClick={toggleBar}>
					<IoClose />
				</span>
				<ul className="font-semibold ">
                    <Link href={`/admin`}><li className='py-4 hover:text-orange-600'>Dashboard</li></Link>
                    <Link href={`/admin/addproducts`}><li className='py-4 hover:text-orange-600'>Add Products</li></Link>
                    <Link href={`/admin/viewproducts`}><li className='py-4 hover:text-orange-600'>View Products</li></Link>
                    <Link href={`/admin/orders`}><li className='py-4 hover:text-orange-600'>Orders</li></Link>
				</ul>

			</div>
            <div className="login absolute right-0 top-4 mx-5 flex">
				
				{!admin ?<Link href={'/admin/login'}>
					<button className="bg-orange-500 px-2  py-1 rounded-md text-sm text-white mx-2">Login</button>
				</Link>
                : 
                <button onClick={logout} className="bg-orange-500 px-2  py-1 rounded-md text-sm text-white mx-2">Logout</button>
            }
			</div>
    </div>
  )
}

export default Sidebar