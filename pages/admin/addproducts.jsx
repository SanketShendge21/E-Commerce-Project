import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./sidebar";
import Head from "next/head";

const Addproducts = () => {
	const router = useRouter();
	useEffect(() => {
		if (!localStorage.getItem("admin")) {
			router.push("/admin/login");
		}
	}, []);

	const [form, setForm] = useState({});

	const handleChange = async (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const submitForm = async (e) => {
		e.preventDefault();
		console.log(form);
		let url = `${process.env.NEXT_PUBLIC_HOST}/api/addproducts`;
		const { title, category, description, price, availableQty, size, color, slug, img } = form;
		const data = { title, category, description, price, availableQty, size, color, slug, img };
		const response = await fetch(url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		});
		let res = await response.json();
		if (res.success) {
			toast.success(res.message);
			setForm({});
		} else {
			toast.error("Error adding product");
		}
	};

	return (
		<>
			<Head>
				<title>Admin - Add Products</title>
			</Head>
			<Sidebar></Sidebar>
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
				<h1 className="text-3xl text-center font-bold"> Add Product </h1>
				<div className="mx-auto flex my-2">
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="title" className="leading-7 text-sm text-gray-600">
								Title
							</label>
							<input
								onChange={handleChange}
								value={form.title ? form.title : ""}
								type="text"
								id="title"
								name="title"
								placeholder="Enter title"
								className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								required
								minLength={5}
							/>
						</div>
					</div>

					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="slug" className="leading-7 text-sm text-gray-600">
								Slug
							</label>
							<input
								onChange={handleChange}
								value={form.slug ? form.slug : ""}
								type="text"
								id="slug"
								name="slug"
								className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								required
								minLength={3}
							/>
						</div>
					</div>
				</div>
				<div className="mx-auto flex my-2">
					<div className="px-2 w-full">
						<div className="mb-4">
							<label htmlFor="description" className="leading-7 text-sm text-gray-600">
								Description
							</label>
							<textarea
								onChange={handleChange}
								value={form.description ? form.description : ""}
								id="description"
								name="description"
								placeholder="Enter Description"
								className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								cols="30"
								rows="2"
								required
								minLength={5}
							></textarea>
						</div>
					</div>

					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="category" className="leading-7 text-sm text-gray-600">
								Category
							</label>
							<select
								onChange={handleChange}
								value={form.category ? form.category : ""}
								type="text"
								id="category"
								name="category"
								className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								required
							>
								<option value="" disabled>
									Select a category
								</option>
								<option value="tshirt">T-shirt</option>
								<option value="hoodies">Hoodies</option>
								<option value="stickers">Stickers</option>
								<option value="mugs">Mugs</option>
							</select>
						</div>
					</div>
				</div>
				<div className="mx-auto flex my-2">
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="color" className="leading-7 text-sm text-gray-600">
								Color
							</label>
							<select
								onChange={handleChange}
								value={form.color ? form.color : ""}
								type="text"
								id="color"
								name="color"
								className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								required
							>
								<option value="" disabled>
									Select a color
								</option>
								<option value="yellow">Yellow</option>
								<option value="red">Red</option>
								<option value="purple">Purple</option>
								<option value="green">Green</option>
							</select>
						</div>
					</div>
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="size" className="leading-7 text-sm text-gray-600">
								Size
							</label>
							<select
								onChange={handleChange}
								value={form.size ? form.size : ""}
								type="text"
								id="size"
								name="size"
								className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								required
							>
								<option value="" disabled>
									Select size
								</option>
								<option value="S">S</option>
								<option value="M">M</option>
								<option value="XL">XL</option>
								<option value="XXL">XXL</option>
							</select>
						</div>
					</div>
				</div>
				<div className="mx-auto flex my-2">
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="color" className="leading-7 text-sm text-gray-600">
								Quantity
							</label>
							<input
								onChange={handleChange}
								value={form.availableQty ? form.availableQty : ""}
								type="text"
								id="availableQty"
								name="availableQty"
								placeholder="Enter Quantity"
								className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								required
							/>
						</div>
					</div>
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="price" className="leading-7 text-sm text-gray-600">
								Price
							</label>
							<input
								onChange={handleChange}
								value={form.price ? form.price : ""}
								type="text"
								id="price"
								name="price"
								placeholder="Enter Price"
								className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								required
							/>
						</div>
					</div>
				</div>
				<div className="mx-auto flex my-2">
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="img" className="leading-7 text-sm text-gray-600">
								Image
							</label>
							<input
								onChange={handleChange}
								value={form.img ? form.img : ""}
								type="text"
								id="img"
								name="img"
								accept="image/*"
								placeholder="Enter image url"
								className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								required
							/>
						</div>
					</div>
				</div>
				<button
					onClick={submitForm}
					type="submit"
					className="flex m-2 mb-5 text-white disabled:bg-orange-300 bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-sm"
				>
					Add Product
				</button>
			</div>
		</>
	);
};

export default Addproducts;
