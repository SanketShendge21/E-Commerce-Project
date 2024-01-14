import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Product from "@/models/Product";
import mongoose from "mongoose";
import Sidebar from "./sidebar";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewProducts = ({ products }) => {
	const router = useRouter();
	const [form, setForm] = useState({});
	useEffect(() => {
		if (!localStorage.getItem("admin")) {
			router.push("/admin/login");
		}
	}, []);

    // Update products api
    const updateProduct = async() => {
		let url = `${process.env.NEXT_PUBLIC_HOST}/api/updateproducts`;

		const { title, category, desc, price, availableQty, size, color, slug,_id } = form;
		const data = { title, category, desc, price, availableQty, size, color, slug, _id };
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
			toast.success(res.message)
			window.location = '/admin/viewproducts'
		}
		else{
			toast.error(res.message)
		}
    }

    // Toggle modal for update product
    const fetchProduct = async(productId)=>{
		let url = `${process.env.NEXT_PUBLIC_HOST}/api/updateproducts`;
		// pass the auth token
			const data = { productId };
			const response = await fetch(url, {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				headers: {
					"Content-Type": "application/json",
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: JSON.stringify(data), // body data type must match "Content-Type" header
			});
			let res = await response.json();
		if(res.success){
			setForm({...form,...res.product})
		}
    }

	const handleChange = (e)	=> {
		setForm({...form,[e.target.name]: e.target.value})
	}

	return (
		<>
        <Sidebar></Sidebar>
			<style jsx>{`
				body {
					font-family: "lato", sans-serif;
				}
				.container {
					max-width: 100%;
					margin-left: auto;
					margin-right: auto;
					padding-left: 10px;
					padding-right: 10px;
				}

				h2 {
					font-size: 26px;
					margin: 20px 0;
					text-align: center;
					small {
						font-size: 0.5em;
					}
				}

				.responsive-table {
					li {
						border-radius: 3px;
						padding: 25px 30px;
						display: flex;
						justify-content: space-between;
						margin-bottom: 25px;
					}
					.table-header {
						background-color: #95a5a6;
						font-size: 14px;
						text-transform: uppercase;
						letter-spacing: 0.03em;
					}
					.table-row {
						background-color: #ffffff;
						box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
					}


					@media all and (max-width: 767px) {
						.table-header {
							display: none;
						}
						.table-row {
						}
						li {
							display: block;
						}
						.col {
							flex-basis: 100%;
						}
						.col {
							display: flex;
                            flex-direction: column;
							padding: 10px;
							&:before {
								color: #6c7a89;
								padding-right: 10px;
								content: attr(data-label);
								flex-basis: 50%;
								text-align: right;
                                justify-content: center;
                                
							}
						}
					}
				}
                .update {
                    align-items: center;
                    background-clip: padding-box;
                    background-color: #fa6400;
                    border: 1px solid transparent;
                    border-radius: 1.2rem;
                    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
                    box-sizing: border-box;
                    color: #fff;
                    cursor: pointer;
                    display: inline-flex;
                    font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
                    font-size: 14px;
                    font-weight: 600;
                    justify-content: center;
                    line-height: 1.25;
                    min-height: 3rem;
                    padding: calc(.875rem - 1px) calc(1.5rem - 1px);
                    position: relative;
                    text-decoration: none;
                    transition: all 250ms;
                    user-select: none;
                    -webkit-user-select: none;
                    touch-action: manipulation;
                    vertical-align: baseline;
                    width: auto;
                  }
                  
                  .update:hover,
                  .update:focus {
                    background-color: #fb8332;
                    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
                  }
                  
                  .update:hover {
                    transform: translateY(-1px);
                  }
                  
                  .update:active {
                    background-color: #c85000;
                    box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
                    transform: translateY(0);
                  }
			`}</style>
			<Head>
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
				<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
				<title>Admin - View Products</title>
			</Head>
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
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
                <div className="mb-3">
				<label htmlFor="description" className="leading-7 text-sm text-gray-600">
					Description
				</label>
				<textarea
					onChange={handleChange}
					value={form.desc ? form.desc : ""}
					id="desc"
					name="desc"
					placeholder="Enter Description"
					className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					cols="30"
					rows="2"
					required
					minLength={5}
				></textarea>
                </div>
                <div className="mb-3">
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
					minLength={5}
				/>
                </div>
                <div className="mb-3">
				<label htmlFor="category" className="leading-7 text-sm text-gray-600">
					Category
				</label>
				<input
					onChange={handleChange}
					value={form.category ? form.category : ""}
					type="text"
					id="category"
					name="category"
					placeholder="Enter Category"
					className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					required
					minLength={2}
				/>
                </div>
                <div className="mb-3">
				<label htmlFor="color" className="leading-7 text-sm text-gray-600">
					Color
				</label>
				<input
					onChange={handleChange}
					value={form.color ? form.color : ""}
					type="text"
					id="color"
					name="color"
					placeholder="Enter Color"
					className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					required
					minLength={2}
				/>
                </div>
                <div className="mb-3">
				<label htmlFor="size" className="leading-7 text-sm text-gray-600">
					Size
				</label>
				<input
					onChange={handleChange}
					value={form.size ? form.size : ""}
					type="text"
					id="size"
					name="size"
					placeholder="Enter Size"
					className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					required
				/>
                </div>
                <div className="mb-3">
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
                <div className="mb-3">
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
    
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-success"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button  type="button" className="btn btn-outline-danger" onClick={updateProduct}>
                Update Product
              </button>
            </div>
          </div>
        </div>
      </div>
			<div className="min-h-screen">
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
				<div className="container">
					<h2 className="heading">View Products</h2>
					<ul className="responsive-table">
						<li className="table-header">
							<div className="col">Title</div>
							<div className="col">Slug</div>
							<div className="col">Image</div>
							<div className="col">Color/Size</div>
							<div className="col">Price</div>
							<div className="col">Update</div>
						</li>
                        {products.map((product)=>{return <li key={product._id} className="table-row table-list mx-7">
							<div className="col">
								{product.title}
							</div>
							<div className="col">
								{product.slug}
							</div>
							<div className="col">
								<img src={product.img} height="50px" width="50px" alt="Not found" />
							</div>
							<div className="col">
								{product.color}/{product.size}
							</div>
							<div className="col">
                                ₹{product.price}
							</div>
							<div className="col">
                                <button
								data-bs-toggle="modal"
								data-bs-target="#exampleModal"
								onClick={()=>{fetchProduct(product._id)}} className="update" role="button">Update</button>
							</div>
						</li>
                        })}
					</ul>
				</div>
			</div>
		</>
	);
};
export async function getServerSideProps(context) {
	let error = null;
	if (!mongoose.connections[0].readyState) {
		// if no connection is available connect to the server and return
		await mongoose.connect(process.env.MONGO_URI);
	}
	// Fetch the main product based on the provided slug
	let products = await Product.find();

	if (products == null) {
		return {
			props: { error: 404 },
		};
	}
	return {
		// We have a _id field in the product which is a object so we need to convert it to a string and then again parse as JSON object
		props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
	};
}

export default ViewProducts;
