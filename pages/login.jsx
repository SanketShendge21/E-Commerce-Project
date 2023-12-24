import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {email,password};
  let url = `http://localhost:3000/api/login`;
  const res = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  let response = await res.json();
  if(response.success) {
    toast.success("Login successful")
    setEmail('');
    setPassword('');
    setTimeout(() => {
      router.push('http://localhost:3000')
    }, 1000);
  }
  else{
    toast.error("Login failed")
  }
  }

  const handleChange = (e) => {
    if(e.target.name === 'email'){
      setEmail(e.target.value)
    }
    if(e.target.name === 'password'){
      setPassword(e.target.value)
    }
  }

  return (
  <div>
    <Head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/motion-tailwind/motion-tailwind.css" />
    </Head>
    <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
    <ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
      <div>
        <img src="/logo.png" alt="Error" className=' mx-auto w-auto h-14' />
      </div>
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          
        <div className="flex items-center justify-center w-full lg:p-12">
        <div className="flex items-center xl:p-10">
          <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl" onSubmit={handleSubmit} method='POST'>
            <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign In</h3>
            <p className="mb-4 text-grey-700">Enter your email and password</p>
            <Link href={'/login'} className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
              <img className="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" 
              alt="Error"/>
              Sign in with Google
            </Link>
            <div className="flex items-center mb-3">
              <hr className="h-0 border-b border-solid border-grey-500 grow" />
              <p className="mx-4 text-grey-600">or</p>
              <hr className="h-0 border-b border-solid border-grey-500 grow" />
            </div>
            <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email</label>
            <input onChange={handleChange} id="email" name='email' type="email" value={email} placeholder="mail@loopple.com" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
            <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password</label>
            <input onChange={handleChange} id="password" name='password' value={password} type="password" placeholder="Enter a password" className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
            <div className="flex flex-row justify-between mb-8">
              <label htmlFor='loggedin' className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                <input type="checkbox" checked value="" className="sr-only peer" />
                <div
                  className="w-5 h-5 bg-white border-2 rounded-sm border-grey-500 peer peer-checked:border-0 peer-checked:bg-orange-500">
                  <img className="" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png" alt="tick" />
                </div>
                <span className="ml-3 text-sm font-normal text-grey-900">Keep me logged in</span>
              </label>
              <Link href={"/forgotpassword"} className="mr-4 text-sm font-medium text-orange-500">Forget password?</Link>
            </div>
            <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-orange-600 focus:ring-4 focus:ring-orange-100 bg-orange-500">Sign In</button>
            <p className="text-sm leading-relaxed text-grey-900">Not registered yet?
             <Link href={"/signup"} className="font-bold text-grey-700">Create an Account</Link></p>
          </form>
        </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login