import Head from "next/head";
import { useEffect } from "react";
import dynamic from 'next/dynamic';
import Product from "@/models/Product";
import mongoose from "mongoose";
import Link from "next/link";

import { BsFillCartPlusFill } from "react-icons/bs";


const DynamicCarousel = dynamic(() => import('@/components/Carousel'), { ssr: false });

const Home = ({tshirts, hoodies,addToCart}) => {
  useEffect(() => {
    // Initialize the tw-elements library when the component mounts
    import('tw-elements').then(({ initTE, Carousel }) => {
      initTE({ Carousel });
    });
  }, []);

 

  return (
    <>
      <div>
        <Head>
          <title>ThreadsUnveiled</title>
          {/* Add your meta tags and other head elements here */}
        </Head>

        <DynamicCarousel />
		<section className="container mx-auto my-8">
    <h2 className="text-3xl font-bold mb-4">From ThreadsUnveiled</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    
		
      <div key="101" className="bg-white p-4 rounded-md shadow-2xl flex flex-col transition-transform transform hover:scale-105">
        <div className="mb-4 relative overflow-hidden rounded-md">
          <div className=" cursor-pointer absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-75 transition-opacity duration-300"></div>
        <img src={`https://m.media-amazon.com/images/I/71OFKtclW4L._AC_AA180_.jpg`} alt={`Not found`} className=" max-w-full max-h-full object-cover rounded-md hover:opacity-75 transition-opacity duration-300" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">GIGABYTE NVIDIA GeForce RTX 3060 WINDFORCE OC 12GB GDDR6 pci_e_x16 Graphics Card (GV-N3060WF2OC-12GD)</h3>
        <Link target="_blank" href={`https://amzn.to/3DJnjuu`}><button className="flex  ml-4 text-white bg-orange-500 border-0 disabled:bg-orange-300 py-2 px-2 md:px-6 focus:outline-none hover:bg-orange-600 rounded"
								>
									<BsFillCartPlusFill className="mr-1 mt-1 text-center" />
									Buy Now
								</button></Link>
      </div>

      <div key="102" className="bg-white p-4 rounded-md shadow-2xl flex flex-col transition-transform transform hover:scale-105">
        <div className="mb-4 relative overflow-hidden rounded-md">
          <div className=" cursor-pointer absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-75 transition-opacity duration-300"></div>
        <img src={`https://m.media-amazon.com/images/I/51nnZ+cziYL._AC_AA180_.jpg`} alt={`Not found`} className=" max-w-full max-h-full object-cover rounded-md hover:opacity-75 transition-opacity duration-300" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Crucial P3 1TB PCIe 3.0 3D NAND NVMe M.2 SSD, up to 3500MB/s - CT1000P3SSD8</h3>
        <Link target="_blank" href={`https://amzn.to/3BWWSAX`}><button className="flex  ml-4 text-white bg-orange-500 border-0 disabled:bg-orange-300 py-2 px-2 md:px-6 focus:outline-none hover:bg-orange-600 rounded"
								>
									<BsFillCartPlusFill className="mr-1 mt-1 text-center" />
									Buy Now
								</button></Link>
      </div> 

      <div key="103" className="bg-white p-4 rounded-md shadow-2xl flex flex-col transition-transform transform hover:scale-105">
        <div className="mb-4 relative overflow-hidden rounded-md">
          <div className=" cursor-pointer absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-75 transition-opacity duration-300"></div>
        <img src={`https://m.media-amazon.com/images/I/41ETl9FwP8L._AC_AA180_.jpg`} alt={`Not found`} className=" max-w-full max-h-full object-cover rounded-md hover:opacity-75 transition-opacity duration-300" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">TP-Link Archer T2Ub Nano Ac600 USB 2.0 Wi-Fi Bluetooth 4.2 Desktop USB Adapter|Dual Band Wireless 600 Mbps|Plug and Play|Supports Windows 11/10/8.1/8/7 for WiFi,Windows 11/10/8.1/7 for Bluetooth</h3>
        <Link target="_blank" href={`https://amzn.to/4h4WD5Z`}><button className="flex  ml-4 text-white bg-orange-500 border-0 disabled:bg-orange-300 py-2 px-2 md:px-6 focus:outline-none hover:bg-orange-600 rounded"
								>
									<BsFillCartPlusFill className="mr-1 mt-1 text-center" />
									Buy Now
								</button></Link>
      </div>
  </div>
  <br></br>
  <h2 className="text-3xl font-bold mb-4">Featured T-shirts</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {tshirts.map((tshirt) => (
		
      <div key={tshirt._id} className="bg-white p-4 rounded-md shadow-2xl flex flex-col transition-transform transform hover:scale-105">
        <div className="mb-4 relative overflow-hidden rounded-md">
          <div className=" cursor-pointer absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-75 transition-opacity duration-300"></div>
        <Link href={`/tshirts`}>  <img src={tshirt.img} alt={tshirt.name} className=" max-w-full max-h-full object-cover rounded-md hover:opacity-75 transition-opacity duration-300" /></Link>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{tshirt.title}</h3>
        <p className="text-gray-600">₹{tshirt.price.toFixed(2)}</p>
        <button disabled={tshirt.availableQty<=0}
									onClick={() => {
										addToCart(tshirt.slug, 1, tshirt.price, tshirt.title, tshirt.size, tshirt.color);
									}}
									className="flex  ml-4 text-white bg-orange-500 border-0 disabled:bg-orange-300 py-2 px-2 md:px-6 focus:outline-none hover:bg-orange-600 rounded"
								>
									<BsFillCartPlusFill className="mr-1 mt-1 text-center" />
									Add To Cart
								</button>
      </div>
    ))}
  </div>
</section>

<section className="container mx-auto my-8">
  <h2 className="text-3xl font-bold mb-4">Featured Hoodies</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {hoodies.map((hoodie) => (
		
      <div key={hoodie._id} className="bg-white p-4 rounded-md shadow-2xl flex flex-col transition-transform transform hover:scale-105">
        <div className="mb-4 relative overflow-hidden rounded-md">
        <Link href={`/hoodies`}> <img src={hoodie.img} alt={hoodie.title} className="max-w-full max-h-full object-cover rounded-md hover:opacity-75 transition-opacity duration-300" /> </Link>
          <div className="cursor-pointer absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-75 transition-opacity duration-300"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{hoodie.title}</h3>
        <p className="text-gray-600">₹{hoodie.price.toFixed(2)}</p>
        <button disabled={hoodie.availableQty<=0}
									onClick={() => {
										addToCart(hoodie.slug, 1, hoodie.price, hoodie.title, hoodie.size, hoodie.color);
									}}
									className="flex  ml-4 text-white bg-orange-500 border-0 disabled:bg-orange-300 py-2 px-2 md:px-6 focus:outline-none hover:bg-orange-600 rounded"
								>
									<BsFillCartPlusFill className="mr-1 mt-1 text-center" />
									Add To Cart
								</button>
      </div>
    ))}
  </div>
</section>

      </div>
    </>
  );
}

export async function getServerSideProps(context) {
	if (!mongoose.connections[0].readyState) {
	  // If no connection is available, connect to the server and return
	  await mongoose.connect(process.env.MONGO_URI);
	}
  
	// Fetch t-shirts and hoodies separately
	const tshirts = await Product.find({ category: "tshirt" });
	const hoodies = await Product.find({ category: "hoodies" });
  
	return {
	  props: {
		tshirts: JSON.parse(JSON.stringify(tshirts)),
		hoodies: JSON.parse(JSON.stringify(hoodies)),
	  },
	};
  }

export default Home;
