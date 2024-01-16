import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const MyAccount = () => {
	const router = useRouter();
	useEffect(() => {
		// if not logged in then redirect to login
		const myuser = JSON.parse(localStorage.getItem("myUser"));
		if (!myuser) {
			router.push("/login");
		}

		// If user is logged in then set the registered email and readOnly (cannot change)
		if (myuser && myuser.token) {
			setUser(myuser);
			setEmail(myuser.email);
      fetchData(myuser.token)
		}
	}, [router.query]);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [pincode, setPincode] = useState("");
	const [password, setPassword] = useState("");
	const [confirm_password, setConfirmPassword] = useState("");
	const [current_password, setCurrentPassword] = useState("");
	const [user, setUser] = useState({ value: null });
	const [passwordError, setPasswordError] = useState(false);

	const handleChange = async (e) => {

		if (e.target.name === "name") {
			setName(e.target.value);
		} else if (e.target.name === "phone") {
			setPhone(e.target.value);
		} else if (e.target.name === "address") {
			setAddress(e.target.value);
		} else if (e.target.name === "pincode") {
			setPincode(e.target.value);
		} else if (e.target.name === "password") {
			setPassword(e.target.value);
		} else if (e.target.name === "confirm_password") {
			setConfirmPassword(e.target.value);
		}
		else if (e.target.name === "current_password") {
			setCurrentPassword(e.target.value);
		}
	};

	// Validate the password
	const validate = (e) => {
		e.preventDefault();
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	  
		// Validate password
		const isValidPassword = passwordRegex.test(password);
		setPasswordError(!isValidPassword);

	  
		if (isValidPassword) {
		  changePassword();
		}
	  };

  // To fetch data and pre-fill the form
  const fetchData = async(token)=>{
    let url = `${process.env.NEXT_PUBLIC_HOST}/api/getuser`;
    // pass the auth token
		const data = { token:token };
		const response = await fetch(url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		});
		let res = await response.json();
    console.log(res);
    if(res.success){
      setName(res.name)
      setPhone(res.phone)
      setAddress(res.address)
      setPincode(res.pincode)
    }
  } 

  // To update User details
	const changeDetails = async () => {
		let url = `${process.env.NEXT_PUBLIC_HOST}/api/updateuser`;
		const data = { token:user.token, name, address, pincode, phone };
		const response = await fetch(url, {
			method: "PUT", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		});
		let res = await response.json();
    if(res.success){
      toast.success("Details updated successfully")
    }
	};

  // To update password
	const changePassword = async () => {
		let url = `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`;
		const data = { token:user.token, password, confirm_password, current_password };
		const response = await fetch(url, {
			method: "PUT", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		});
		let res = await response.json();
		console.log(res);
		if(res.success){
			toast.success("Password updated successfully");
		}
		else{
			toast.error(res.error)
		}
		// After form submission clear the input fields
		setPassword('')
		setConfirmPassword('')
		setCurrentPassword('')
	};

	return (
		<>
			<Head>
				<title>My Account - ThreadsUnveiled</title>
			</Head>
			<div className="container my-9 mx-auto">
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
				<h1 className="text-3xl text-center font-bold"> Update your account </h1>
				<h2 className="text-xl font-bold">1. Delivery Details</h2>
				<div className="mx-auto flex my-2">
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="name" className="leading-7 text-sm text-gray-600">
								Name
							</label>
							<input
								onChange={handleChange}
								value={name}
								type="text"
								id="name"
								name="name"
								placeholder="Enter name"
								className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								required
							/>
						</div>
					</div>

					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="email" className="leading-7 text-sm text-gray-600">
								Email (cannot update)
							</label>
							{user && user.token ? (
								<input
									value={user.email}
									type="email"
									id="email"
									name="email"
									className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									readOnly
								/>
							) : (
								<input
									onChange={handleChange}
									value={email}
									type="email"
									id="email"
									name="email"
									className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									required
								/>
							)}
						</div>
					</div>
				</div>

				<div className="px-2 w-full">
					<div className="mb-4">
						<label htmlFor="address" className="leading-7 text-sm text-gray-600">
							Address
						</label>
						<textarea
							onChange={handleChange}
							value={address}
							id="address"
							name="address"
							placeholder="Enter address"
							className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							cols="30"
							rows="2"
						></textarea>
					</div>
				</div>

				<div className="mx-auto flex my-2">
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="phone" className="leading-7 text-sm text-gray-600">
								Phone
							</label>
							<input
								onChange={handleChange}
								value={phone}
								type="phone"
								id="phone"
								name="phone"
								placeholder="Enter 10 Digit Number"
								className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								required
							/>
						</div>
					</div>

					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
								Pincode
							</label>
							<input
								onChange={handleChange}
								value={pincode}
								type="text"
								id="pincode"
								name="pincode"
								placeholder="Enter Pincode"
								className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								required
							/>
						</div>
					</div>
				</div>
				<button onClick={changeDetails} className="flex m-2 mb-5 text-white disabled:bg-orange-300 bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-sm">
					Submit
				</button>

				<h2 className="text-xl font-bold">2. Change Password</h2>
				<div className="mx-auto flex my-2">
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="phone" className="leading-7 text-sm text-gray-600">
							Current Password
							</label>
							<input
								onChange={handleChange}
								value={current_password}
								type="text"
								id="current_password"
								name="current_password"
								placeholder="Enter Current Password"
								className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								required
							/>
						</div>
					</div>
				</div>
				<div className="mx-auto flex my-2">
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="password" className="leading-7 text-sm text-gray-600">
								New Password
							</label>
							<input
								onChange={handleChange}
								value={password}
								type="text"
								id="password"
								name="password"
								placeholder="Enter your new password"
								className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								required
							/>
							{passwordError &&	<span className="text-red-600 mb-4">
									<p>Password must:</p>
									<ul className="list-disc ml-5">
										<li>Be at least 8 characters long.</li>
										<li>Include at least one lowercase letter.</li>
										<li>Include at least one uppercase letter.</li>
										<li>Include at least one digit.</li>
										<li>Include at least one special character (@, $, !, %, *, ?, &).</li>
									</ul>
								</span>}
						</div>
					</div>

					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="confirm_password" className="leading-7 text-sm text-gray-600">
								Confirm Password
							</label>
							<input
								onChange={handleChange}
								value={confirm_password}
								type="password"
								id="confirm_password"
								name="confirm_password"
								placeholder="Confirm your password"
								className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								required
							/>
						</div>
					</div>
				</div>
				<button onClick={validate} className="flex m-2 text-white disabled:bg-orange-300 bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-sm">
					Submit
				</button>
			</div>
		</>
	);
};

export default MyAccount;
