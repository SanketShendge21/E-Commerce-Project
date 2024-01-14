import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import Order from "@/models/Order";
import mongoose from "mongoose";
import Head from "next/head";

const MyOrder = ({ subTotal, order, clearCart }) => {
	console.log(order);
	const products = order.products;
	const router = useRouter();
	const [date, setDate] = useState()
	const options = {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	  };
	useEffect(() => {
		setDate(new Date(order.createdAt))
		if (router.query.clearCart == 1) {
			clearCart();
		}
	}, []);

	return (
		<div>
			<Head>
				<title>Order - ThreadsUnveiled</title>
			</Head>
			<section className="text-gray-600 body-font overflow-hidden">
				<div className="container px-5 py-24 mx-auto">
					<div className="lg:w-4/5 mx-auto flex flex-wrap">
						<div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
							<h2 className="text-sm title-font text-gray-500 tracking-widest">THREADS UNVEILED</h2>
							<h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">Order ID: #{order.orderId}</h1>
							<p className="leading-relaxed mb-4">
								Your order has been placed successfully. Your payment status is <b>'{order.status}'</b>
							</p>
							<p className="leading-relaxed mb-4">Order placed on: {date && date.toLocaleDateString("en-IN",options)}</p>
							<div className="flex mb-4">
								<a className="flex-grow text-center border-orange-500 py-2 text-lg px-1">Description</a>
								<a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">Quantity</a>
								<a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">Price</a>
							</div>

							{Object.keys(products).map((key) => {
								return (
									<div key={key} className="flex border-t border-gray-200 py-2">
										<span className="text-gray-500">
											{products[key].name} ({products[key].variant}/{products[key].size})
										</span>
										<span className="m-auto text-gray-500">{products[key].qty}</span>
										<span className="m-auto text-gray-900">₹{products[key].price}</span>
									</div>
								);
							})}

							<div className="flex flex-col">
								<span className="title-font font-medium text-2xl text-gray-900">Subtotal : ₹{order.amount}</span>
								<div className="my-6">
									<button className="flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">
										Track Order
									</button>
								</div>
							</div>
						</div>
						<img
							alt="ecommerce"
							className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
							src="https://m.media-amazon.com/images/I/719pVXD-WCL._SY741_.jpg"
						/>
					</div>
				</div>
			</section>
		</div>
	);
};

export async function getServerSideProps(context) {
	if (!mongoose.connections[0].readyState) {
		// if no connection is available connect to the server and return
		await mongoose.connect(process.env.MONGO_URI);
	}
	// Fetch the order using id passed in query parameters
	let order = await Order.findById(context.query.id);

	return {
		props: { order: JSON.parse(JSON.stringify(order)) }, // will be passed to the page component as props
	};
}

export default MyOrder;
