import React from "react";
import Sidebar from "./sidebar";
import Order from "@/models/Order";
import mongoose from "mongoose";
import Head from "next/head";

const Orders = ({ orders }) => {
	return (
		<div>
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
					font-family: system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
					font-size: 14px;
					font-weight: 600;
					justify-content: center;
					line-height: 1.25;
					min-height: 3rem;
					padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
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
					box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
					transform: translateY(0);
				}
			`}</style>
			<Head>
				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
					crossOrigin="anonymous"
				/>
				<script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
					crossOrigin="anonymous"
				></script>
			</Head>
			<div className="container">
				<h2 className="heading">View Orders</h2>
				<ul className="responsive-table">
					<li className="table-header">
						<div className="col">Order ID</div>
						<div className="col">Email</div>
						<div className="col">Address</div>
						<div className="col">Products</div>
						<div className="col">Amount</div>
						<div className="col">Status</div>
					</li>
					{orders.map((order) => (
						<li key={order._id.$oid} className="table-row table-list mx-7">
							<div className="col">{order.orderId}</div>
							<div className="col">{order.email}</div>
							<div className="col">{order.address}</div>

							{/* Products details */}
							<div className="col" style={{ display: "flex", flexDirection: "column" }}>
								{Object.keys(order.products).map((itemCode) => (
									<div key={itemCode}>
										<div>{order.products[itemCode].name}</div>
										<div>Size: {order.products[itemCode].size}</div>
										<div>Quantity: {order.products[itemCode].qty}</div>
										<div>Price: ₹{order.products[itemCode].price}</div>
									</div>
								))}
							</div>

							<div className="col">₹{order.amount}</div>
							<div className="col">{order.status}</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export async function getServerSideProps(context) {
	if (!mongoose.connections[0].readyState) {
		// if no connection is available connect to the server and return
		await mongoose.connect(process.env.MONGO_URI);
	}
	// Fetch the main orders based on the provided slug
	let orders = await Order.find();

	if (orders == null) {
		return {
			props: { error: 404 },
		};
	}
	return {
		// We have a _id field in the orders which is a object so we need to convert it to a string and then again parse as JSON object
		props: { orders: JSON.parse(JSON.stringify(orders)) }, // will be passed to the page component as props
	};
}

export default Orders;
