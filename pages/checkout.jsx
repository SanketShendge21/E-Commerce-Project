import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { CiMoneyCheck1 } from "react-icons/ci";
import Head from "next/head";
import Script from "next/script";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get } from "mongoose";

const Checkout = ({ cart, addToCart, clearCart, removeFromCart, subTotal }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [pincode, setPincode] = useState("");	
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [user, setUser] = useState({value:null})

	useEffect(() => {
		const myuser = JSON.parse(localStorage.getItem("myUser"));
		if(myuser && myuser.token){
			setUser(myuser)
			setEmail(myuser.email)
			fetchData(myuser.token)
		}
	}, [])
	
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
		  getPincode(res.pincode)
		}
	  }

	const getPincode = async(pin)=>{
		// Fetch the pincode from the api
		let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
		let pinJson = await pins.json();
		if(Object.keys(pinJson).includes(pin)){
			// If the pincode is available then set the state and city accordingly
			setCity(pinJson[pin][0])
			setState(pinJson[pin][1])
		}
		else{
			setState('')
			setCity('')
		}
	}  

	const handleChange = async (e) => {
		console.log(user)

		if (e.target.name === "name") {
			setName(e.target.value);
		} else if (e.target.name === "email") {
			setEmail(e.target.value);
		} else if (e.target.name === "phone") {
			setPhone(e.target.value);
		} else if (e.target.name === "address") {
			setAddress(e.target.value);
		} else if (e.target.name === "pincode") {
			setPincode(e.target.value);
			if(e.target.value.length === 6){
				getPincode(e.target.value)
			}
			else{
				setState('')
				setCity('')
			}
		}
		if (name.length > 3 && email.length > 3 && phone.length > 3 && address.length > 3 && pincode.length > 3) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	};

	// Payment Function
	const initiatePayment = async () => {
		let oid = Math.floor(Math.random() * Date.now());

		//Get a transaction token
		let url = `${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`;
		const data = { cart, subTotal, oid, email, name, address, pincode, phone,city,state };
		const response = await fetch(url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		});
		let txnRes = await response.json(); // parses JSON response into native JavaScript objects
		if(txnRes.success){
		let txnToken = txnRes.txnToken;

		var config = {
			flow: "DEFAULT",
			//Optional to hide paymode label when only one paymode is available
			hidePaymodeLabel: true,
			data: {
				orderId: oid,
				amount: subTotal,
				token: txnToken,
				tokenType: "TXN_TOKEN",
			},
			style: {
				//Optional: global style that will apply to all paymodes
				bodyColor: "green",
			},
			merchant: {
				mid: process.env.NEXT_PUBLIC_PAYTM_MID,
			},
			handler: {
				notifyMerchant: function (eventType, data) {
					console.log("notify merchant called", eventType, data);
				},
			},
		};
		window.Paytm.CheckoutJS.init(config)
			.then(function onSuccess() {
				// after successfully updating configuration, invoke JS Checkout
				window.Paytm.CheckoutJS.invoke();
			})
			.catch(function onError(error) {
				console.log("error => ", error);
			});
		}
		else{
			if(txnRes.cartClear){
				clearCart();
			}
			toast.error(txnRes.error);
		}
	};

	return (
		<div className="container px-8 sm:m-auto min-h-screen">
			<Head>
				<title>Checkout - ThreadsUnveiled</title>
				<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
			</Head>
			<Script
				type="application/javascript"
				crossOrigin="anonymous"
				src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
			></Script>
			<h1 className="font-bold text-xl my-8 text-center">Checkout</h1>
			<h2 className="text-xl font-bold">Delivery Details</h2>
			<div className="mx-auto flex my-2">
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
				<div className="px-2 w-1/2">
					<div className="mb-4">
						<label htmlFor="email" className="leading-7 text-sm text-gray-600">
							Name
						</label>
						<input
							onChange={handleChange}
							value={name}
							type="text"
							id="name"
							name="name"
							className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						/>
					</div>
				</div>

				<div className="px-2 w-1/2">
					<div className="mb-4">
						<label htmlFor="email" className="leading-7 text-sm text-gray-600">
							Email
						</label>
						{user && user.token ? <input value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly /> :	<input onChange={handleChange}	value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						/>}

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
							className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
							className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						/>
					</div>
				</div>
			</div>
			<div className="mx-auto flex my-2">
				<div className="px-2 w-1/2">
					<div className="mb-4">
						<label htmlFor="state" className="leading-7 text-sm text-gray-600">
							State
						</label>
						<input
						onChange={handleChange}
						value={state}
							type="text"
							id="state"
							name="state"
							className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							
						/>
					</div>
				</div>

				<div className="px-2 w-1/2">
					<div className="mb-4">
						<label htmlFor="city" className="leading-7 text-sm text-gray-600">
							City
						</label>
						<input
						onChange={handleChange}
						value={city}
							type="text"
							id="city"
							name="city"
							className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							
						/>
					</div>
				</div>
			</div>
			<h2 className="text-xl font-bold">2.Review Cart & Pay</h2>
			<div className="sideCart bg-slate-50 p-6 m-2 shadow-md">
				<ol className="list-decimal font-semibold">
					{/* If the cart is empty display no items message */}
					{Object.keys(cart).length === 0 && <div className="my-2">No items present in the cart.</div>}

					{/* iterates through each item in the cart object using Object.keys(cart). It returns an array of React elements, each representing an item in the cart. */}
					{Object.keys(cart).map((k) => {
						return (
							<li key={k}>
								<div className="item flex my-3">
									<div className="flex font-semibold">
										{cart[k].name} ({cart[k].variant}/{cart[k].size})
									</div>
									<div className="w-1/3 flex items-center justify-center font-semibold text-lg">
										<FaCircleMinus
											onClick={() => {
												removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant);
											}}
											className="cursor-pointer text-orange-500"
										/>
										<span className="mx-2 text-sm">{cart[k].qty}</span>
										<FaCirclePlus
											onClick={() => {
												addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant);
											}}
											className="cursor-pointer text-orange-500"
										/>
									</div>
								</div>
							</li>
						);
					})}
				</ol>
				<span className="font-bold">Subtotal: {subTotal}</span>
			</div>
			<div className="mx-4">
				<Link href={"/checkout"}>
					<button
						disabled={disabled}
						onClick={initiatePayment}
						className="flex mr-2 text-white disabled:bg-orange-300 bg-orange-500 border-0 py-2 pr-2 focus:outline-none hover:bg-orange-600 rounded text-sm"
					>
						<CiMoneyCheck1 className="m-1 text-center text-xl" /> <span className="mt-1 font-semibold">Pay : ₹{subTotal}</span>
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Checkout;
