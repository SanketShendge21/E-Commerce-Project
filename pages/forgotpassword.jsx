import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { redirect } from "next/dist/server/api-utils";

const ForgotPassword = () => {
	const router = useRouter();

	useEffect(() => {
		// If the user is already logged in then we should redirect to the home page
		if (localStorage.getItem("myUser")) {
			router.push("/");
		}
	}, []);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm_password, setConfirmPassword] = useState("");

	const handleChange = (e) => {
		if (e.target.name === "email") {
			setEmail(e.target.value);
		} else if (e.target.name === "password") {
			setPassword(e.target.value);
		} else if (e.target.name === "confirm_password") {
			setConfirmPassword(e.target.value);
		}
	};

	// Function for resetting password
	const resetPassword = async (e) => {
		e.preventDefault();

		if (password == confirm_password) {
			let url = `${process.env.NEXT_PUBLIC_HOST}/api/forgot`;
			const data = { email:localStorage.getItem('email'), sendMail: false, token:router.query.token, password };
			const response = await fetch(url, {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				headers: {
					"Content-Type": "application/json",
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: JSON.stringify(data), // body data type must match "Content-Type" header
			});
			let res = await response.json(); // parses JSON response into native JavaScript objects
			if (res.success) {
				toast.success("Password has been changed");
				setTimeout(() => {
					router.push("/login")
				}, 3000);
				localStorage.removeItem('email')
			}
			else {
				toast.error("Some error occurred while resetting password. Please try again later");
				setTimeout(() => {
					router.push("/login")
				}, 3000);
			}
		}
	};

	// Function to send password reset instructions via email
	const sendEmail = async (e) => {
		e.preventDefault();
		localStorage.setItem('email',email)
		let url = `${process.env.NEXT_PUBLIC_HOST}/api/forgot`;
		const data = { email, sendMail: true };
		const response = await fetch(url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		});
		let res = await response.json(); // parses JSON response into native JavaScript objects
		if (res.success) {
			toast.success("Password reset instructions have been sent to your email");
			setTimeout(() => {
				router.push("/login")
			}, 3000);
		} else {
			toast.error("Some error occurred while sending password reset instructions");
		}
	};

	const redirectToLogin = () => {
		Swal.fire({
			icon: 'error',
			title: 'Error while updating. Please try again',
			text: 'Redirecting to login'
		  });
		setTimeout(() => {
			router.push("/login");
		},2000)
	};

	return (
		<div>
			      <ToastContainer
				position="top-left"
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
							{router.query.token && (
								<div>
									<form onSubmit={resetPassword} className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl" method="POST">
										<h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Forgot password</h3>
										<p className="mb-4 text-grey-700">Enter your Email</p>

										<label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">
											New Password
										</label>
										<input
											onChange={handleChange}
											id="password"
											type="text"
											value={password}
											name="password"
											placeholder="Enter your password"
											className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
											required
										/>
										<label htmlFor="confirm_password" className="mb-2 text-sm text-start text-grey-900">
											Confirm Password
										</label>
										<input
											onChange={handleChange}
											id="confirm_password"
											type="password"
											value={confirm_password}
											name="confirm_password"
											placeholder="Confirm password"
											className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
											required
										/>

										<button
											type="submit"
											disabled={password != confirm_password}
											className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-orange-600 focus:ring-4 focus:ring-orange-100 bg-orange-500 disabled:bg-orange-300"
										>
											Reset
										</button>
										{/* <p className="text-sm leading-relaxed text-grey-900">
									Already have an Account?
									<Link href={"/login"} className="font-bold text-grey-700">
										{" "}
										Login
									</Link>
								</p> */}
										{password != confirm_password && <span className="text-red-600">Passwords does not match</span>}
										{password && password == confirm_password && <span className="text-green-600">Passwords Match</span>}
									</form>
								</div>
							) }

							{/* // If token is not specified then show the form */}
							{!router.query.token && (
								<form onSubmit={sendEmail} className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl" method="POST">
									<h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Forgot password</h3>
									<p className="mb-4 text-grey-700">Enter your Email</p>

									<label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">
										Email
									</label>
									<input
										onChange={handleChange}
										id="email"
										type="email"
										value={email}
										name="email"
										placeholder="mail@loopple.com"
										className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
										required
									/>

									<button
										type="submit"
										className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-orange-600 focus:ring-4 focus:ring-orange-100 bg-orange-500"
									>
										Continue
									</button>
									<p className="text-sm leading-relaxed text-grey-900">
										Remember your password?
										<Link href={"/login"} className="font-bold text-grey-700">
											{" "}
											Login
										</Link>
									</p>
								</form>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
