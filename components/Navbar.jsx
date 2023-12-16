import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { BsBagCheckFill } from "react-icons/bs";
import { CgTrashEmpty } from "react-icons/cg";

const Navbar = ({cart, addToCart, removeFromCart, clearCart, subTotal}) => { // Taking props from _app.component
	console.log(cart, addToCart, removeFromCart, clearCart,subTotal);
	
	const toggleCart = () => {
		// We are removing and adding translate-x-full class to toggle the sideCart menu
		if (ref.current.classList.contains("translate-x-full")) {
			ref.current.classList.remove("translate-x-full");
			ref.current.classList.add("translate-x-0");
		} else if (!ref.current.classList.contains("translate-x-full")) {
			ref.current.classList.remove("translate-x-0");
			ref.current.classList.add("translate-x-full");
		}
	};
	// Using the useRef hook to access the sideCart menu using ref
	const ref = useRef();
	return (
		// Code for Navbar - Start
		// md:property referes to properties that will be applied to devies of medium screen size or above
		<div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md">
			<div className="logo mx-5">
				<Link href={"/"}>
					<Image src="/logo.png" alt="Error" width={200} height={40} />
				</Link>
			</div>
			<div className="nav">
				<ul className="flex items-center space-x-4 font-bold md:text-l">
					<Link href={"/hoodies"}>
						<li>Hoodies</li>
					</Link>
					<Link href={"/tshirts"}>
						<li>Tshirts</li>
					</Link>
					<Link href={"/stickers"}>
						<li>Stickers</li>
					</Link>
					<Link href={"/mugs"}>
						<li>Mugs</li>
					</Link>
				</ul>
			</div>
			<div className="cart absolute right-0 top-4 mx-5">
				<FaShoppingCart onClick={toggleCart} className="text-xl md:text-2xl cursor-pointer" /> {/* Using React Icon */}
			</div>
			{/* Navbar End  */}

			{/* Code for Sidebar - Start */}
			{/* Create a reference for this element using React's useRef hook */}
			{/* CSS Properties 
        1. absolute top-0 right-0: Positions the cart at the top-right corner of its containing element.
        2. transform transition-transform translate-x-full: Initiates a transformation and transition effect. The translate-x-full moves the cart fully outside the viewport horizontally. */}
			<div
				ref={ref}
				className="z-10 sideCart w-72 h-full absolute top-0 right-0 bg-slate-50 px-10 p-10 transfrom transition-transform translate-x-full"
			>
				<h2 className="font-bold text-xl text-center">Shopping Cart</h2>
				<span className="absolute top-5 right-3 cursor-pointer text-2xl text-orange-500" onClick={toggleCart}>
					<IoClose />
				</span>
				<ol className="list-decimal font-semibold">
					{/* If the cart is empty display no items message */}
					{ Object.keys(cart).length === 0 &&
						<div className="my-2">No items present in the cart.</div>
					}
					
					 {/* iterates through each item in the cart object using Object.keys(cart). It returns an array of React elements, each representing an item in the cart. */}
					{Object.keys(cart).map((k)=>{return <li key={k}>
						<div className="item flex my-3">
							<div className="w-2/3 flex items-center justify-center font-semibold">{cart[k].name}</div>
							<div className="w-1/3 flex items-center justify-center font-semibold text-lg">
								<FaCircleMinus onClick={()=>{removeFromCart(k,1,cart[k].price, cart[k].name,cart[k].size,cart[k].variant)}} className="cursor-pointer text-orange-500" />
								<span className="mx-2 text-sm">{cart[k].qty}</span>
								<FaCirclePlus onClick={()=>{addToCart(k,1,cart[k].price, cart[k].name,cart[k].size,cart[k].variant)}} className="cursor-pointer text-orange-500" />
							</div>
						</div>
					</li> })}
				</ol>
				<div className="flex">
					<button className="flex mr-2 text-white bg-orange-500 border-0 py-2 pr-2 focus:outline-none hover:bg-orange-600 rounded text-sm">
						<BsBagCheckFill className="m-1 text-center" />
						Checkout
					</button>
					<button onClick={clearCart} className="flex mr-2 text-white bg-orange-500 border-0 py-2 pr-2 focus:outline-none hover:bg-orange-600 rounded text-sm">
						<CgTrashEmpty className="m-1 text-l text-center" />
						Clear Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
