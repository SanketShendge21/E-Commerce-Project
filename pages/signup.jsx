import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [nameError, setNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// If the user is already logged in then we should redirect to the home page
		if (localStorage.getItem("authtoken")) {
			router.push("/");
		}
	}, []);

const validate = (e) => {
  e.preventDefault();

  const nameRegex = /^[a-zA-Z\s]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate name
  const isValidName = nameRegex.test(name);
  setNameError(!isValidName);

  // Validate password
  const isValidPassword = passwordRegex.test(password);
  setPasswordError(!isValidPassword);

  // Validate email
  const isValidEmail = emailRegex.test(email);
  setEmailError(!isValidEmail);

  if (isValidName && isValidPassword && isValidEmail) {
    handleSubmit();
  }
};


	const handleSubmit = async () => {

			setEmailError(false);
			setPasswordError(false);
			setNameError(false);
			const data = { name, email, password };
			let url = `${process.env.NEXT_PUBLIC_HOST}/api/signup`;
			const res = await fetch(url, {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			let response = await res.json();
			if (response.success) {
				toast.success("Signup successful, your account has been created");
				setEmail("");
				setPassword("");
				setName("");
				setTimeout(() => {
					router.push(`${process.env.NEXT_PUBLIC_HOST}/login`);
				}, 1000);
			} else {
				toast.error("Signup failed");
			}
		
	};

	const handleChange = (e) => {
		if (e.target.name === "name") {
			setName(e.target.value);
		}
		if (e.target.name === "email") {
			setEmail(e.target.value);
		}
		if (e.target.name === "password") {
			setPassword(e.target.value);
		}
	};

	return (
		<div>
			<Head>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/motion-tailwind/motion-tailwind.css" />
				<title>SignUp - ThreadsUnveiled</title>
			</Head>
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
			<div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
				<div>
					<img src="/logo.png" alt="Error" className=" mx-auto w-auto h-14" />
				</div>
				<div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
					<div className="flex items-center justify-center w-full lg:p-12">
						<div className="flex items-center xl:p-10">
							<form onSubmit={validate} className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl" method="POST">
								<h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign Up</h3>
								<p className="mb-4 text-grey-700">Enter your email and password</p>
								<Link
									href={"/signup"}
									className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300"
								>
									<img
										className="h-5 mr-2"
										src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
										alt="Error"
									/>
									Sign Up with Google
								</Link>
								<div className="flex items-center mb-3">
									<hr className="h-0 border-b border-solid border-grey-500 grow" />
									<p className="mx-4 text-grey-600">or</p>
									<hr className="h-0 border-b border-solid border-grey-500 grow" />
								</div>

								<label htmlFor="name" className="mb-2 text-sm text-start text-grey-900">
									Name
								</label>
								<input
									value={name}
									onChange={handleChange}
									id="name"
									name="name"
									type="text"
									placeholder="Enter your name"
									className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  required
								/>
               {nameError &&  <span className="text-red-600 mb-5">Name can only contain alphabets and spaces.</span>}

								<label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">
									Email
								</label>
								<input
									value={email}
									onChange={handleChange}
									id="email"
									name="email"
									type="email"
									placeholder="mail@loopple.com"
									className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  required
								/>
                {emailError && <span className="text-red-600 mb-5">"Enter a valid email address.</span>}

								<label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">
									Password
								</label>
								<input
									value={password}
									onChange={handleChange}
									id="password"
									name="password"
									type="password"
									placeholder="Enter a password"
									className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  required
								/>
                {passwordError &&	<span className="text-red-600 mb-5">
									<p>Password must:</p>
									<ul className="list-disc ml-5">
										<li>Be at least 8 characters long.</li>
										<li>Include at least one lowercase letter.</li>
										<li>Include at least one uppercase letter.</li>
										<li>Include at least one digit.</li>
										<li>Include at least one special character (@, $, !, %, *, ?, &).</li>
									</ul>
								</span>}

								<button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-orange-600 focus:ring-4 focus:ring-orange-100 bg-orange-500">
									Sign Up
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

export default Signup;
