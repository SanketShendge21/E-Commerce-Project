import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
const ForgotPassword = () => {
	const router = useRouter();
	useEffect(() => {
		// If the user is already logged in then we should redirect to the home page
		if (localStorage.getItem("authtoken")) {
			router.push("/");
		}
	}, []);
	return (
		<div>
			<Head>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/motion-tailwind/motion-tailwind.css" />
			</Head>
			<div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
				<div>
					<img src="/logo.png" alt="Error" className=" mx-auto w-auto h-14" />
				</div>
				<div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
					<div className="flex items-center justify-center w-full lg:p-12">
						<div className="flex items-center xl:p-10">
							<form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
								<h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Forgot password</h3>
								<p className="mb-4 text-grey-700">Enter your Email</p>

								<label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">
									Email
								</label>
								<input
									id="email"
									type="email"
									placeholder="mail@loopple.com"
									className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
								/>

								<button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-orange-600 focus:ring-4 focus:ring-orange-100 bg-orange-500">
									Continue
								</button>
								<p className="text-sm leading-relaxed text-grey-900">
									Already have an Account?
									<Link href={"/login"} className="font-bold text-grey-700">
										{" "}
										Login
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
