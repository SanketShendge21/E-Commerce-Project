import Link from "next/link";
// import Image from "next/image";
import React from "react";
import Product from "@/models/Product";
import mongoose from "mongoose";

const Mugs = ({ products }) => {
	return (
		<div>
			<section className="text-gray-600 body-font">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-wrap -m-4 justify-center">
						{/*  products is an object which contains mugs as we have logic is getServerSideProps so we need to take its keys*/}
						{Object.keys(products).length === 0 && <p className="">Sorry, all the mugs are out of stock, new stock coming soon. Stay Tuned!</p>}
						{Object.keys(products).map((item) => {
							// Products is an array so we use map function to get the product and display
							return (
								<div key={products[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
									<Link className="block relative rounded overflow-hidden" href={`/product/${products[item].slug}`} passHref={true}>
										<img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] block" src={products[item].img} />
										<div className="mt-4 text-center">
											<h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].title}</h3>
											<h2 className="text-gray-900 title-font text-lg font-medium">{products[item].desc}</h2>
											<p className="mt-1">₹{products[item].price}</p>
											<div className="mt-1">
												{products[item].size.includes('S') && <span className="border border-gray-300 px-1 mx-1">S</span>}
												{products[item].size.includes('M') && <span className="border border-gray-300 px-1 mx-1">M</span>}
												{products[item].size.includes('L') && <span className="border border-gray-300 px-1 mx-1">L</span>}
												{products[item].size.includes('XL') && <span className="border border-gray-300 px-1 mx-1">XL</span>}
												{products[item].size.includes('XXL') && <span className="border border-gray-300 px-1 mx-1">XXL</span>} 
											</div>
											<div className="mt-1">
												{products[item].color.includes("Red") && 
													<button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
												}
												{products[item].color.includes("Blue") && 
													<button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>
												}
												{products[item].color.includes("Green") && 
													<button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>
												}
												{products[item].color.includes("Purple") && 
													<button className="border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>
												}
												{products[item].color.includes("Yellow") && 
													<button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>
												}
											</div>
										</div>
									</Link>
								</div>
							)
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

	let products = await Product.find({ category: "mugs" });
	let mugs = {};
	for (let item of products) {
		// if item is already present in the collection
		if (item.title in mugs) {
			// If the item is present and the item does not contains the color and size then add it to the array so we can return the item
			if (!mugs[item.title].color.includes(item.color) && item.availableQty > 0) {
				mugs[item.title].color.push(item.color);
			}

			if (!mugs[item.title].size.includes(item.size) && item.availableQty > 0) {
				mugs[item.title].size.push(item.size);
			}
		} else {
			//Initaily mugs object is empty so we need to fill it with data
			//if it is empty, then copy the whole product into tshirt object which will now contain an array of products
			//key here is the title of the product
			// like thsrits {title , size[] , color[], and so on}

			mugs[item.title] = JSON.parse(JSON.stringify(item));
			if (item.availableQty > 0) {
				mugs[item.title].color = [item.color];
				mugs[item.title].size = [item.size];
			}
			else{
				mugs[item.title].color = [];
				mugs[item.title].size = [];
			}
		}
	}
	return {
		// We have a _id field in the product which is a object so we need to convert it to a string and then again parse as JSON object
		props: { products: JSON.parse(JSON.stringify(mugs)) }, // will be passed to the page component as props
	};
}

export default Mugs;
