import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const Signup = () => {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/motion-tailwind/motion-tailwind.css" />
      </Head>
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div>
          <img src="/logo.png" alt="Error" className=' mx-auto w-auto h-14' />
        </div>
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
            
          <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10">
            <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
              <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign Up</h3>
              <p className="mb-4 text-grey-700">Enter your email and password</p>
              <Link href={'/signup'} className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
                <img className="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" 
                alt="Error"/>
                Sign Up with Google
              </Link>
              <div className="flex items-center mb-3">
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
                <p className="mx-4 text-grey-600">or</p>
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
              </div>

              <label htmlFor="name" className="mb-2 text-sm text-start text-grey-900">Name</label>
              <input id="name" type="text" placeholder="Enter your name" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>

              <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email</label>
              <input id="email" type="email" placeholder="mail@loopple.com" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>

              <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password</label>
              <input id="password" type="password" placeholder="Enter a password" className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
              
              <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-orange-600 focus:ring-4 focus:ring-orange-100 bg-orange-500">Sign Up</button>
              
              <p className="text-sm leading-relaxed text-grey-900">Already have an Account? 
               <Link href={"/login"} className="font-bold text-grey-700"> Login</Link></p>
            </form>
          </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Signup