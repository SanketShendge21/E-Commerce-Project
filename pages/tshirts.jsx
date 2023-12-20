import Link from "next/link";
// import Image from "next/image";
import React from "react";
import Product from "@/models/Product";
import mongoose from "mongoose";

const Tshirts = ({products}) => {
	return (
		<div>
			<section className="text-gray-600 body-font">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-wrap -m-4">
							{products.map((item)=>{
								// Products is an array so we use map function to get the product and display
								return <div key={item._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
								  <Link className="block relative rounded overflow-hidden" href={`/product/${item.slug}`} passHref={true}>
									<img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] block" src={item.img} />
									<div className="mt-4 text-center">
										<h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.title}</h3>
										<h2 className="text-gray-900 title-font text-lg font-medium">{item.desc}</h2>
										<p className="mt-1">{item.price}</p>
										<p className="mt-1">{item.size}</p>
									</div>
								</Link>
							</div>
						})}
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


	let products = await Product.find({category:'tshirt'});
	return {
		// We have a _id field in the product which is a object so we need to convert it to a string and then again parse as JSON object
		props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
	};
}

export default Tshirts;
