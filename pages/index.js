import Head from "next/head";
import { useEffect } from "react";
import dynamic from 'next/dynamic';
import Product from "@/models/Product";
import mongoose from "mongoose";
import Link from "next/link";


const DynamicCarousel = dynamic(() => import('@/components/Carousel'), { ssr: false });

const Home = ({tshirts, hoodies}) => {
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
  <h2 className="text-3xl font-bold mb-4">Featured T-shirts</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {tshirts.map((tshirt) => (
		<Link href={`/tshirts`}>
      <div key={tshirt._id} className="bg-white p-4 rounded-md shadow-2xl flex flex-col transition-transform transform hover:scale-105">
        <div className="mb-4 relative overflow-hidden rounded-md">
          <img src={tshirt.img} alt={tshirt.name} className="max-w-full max-h-full object-cover rounded-md hover:opacity-75 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-75 transition-opacity duration-300"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{tshirt.title}</h3>
        <p className="text-gray-600">₹{tshirt.price.toFixed(2)}</p>
        {/* Add a "View Details" or "Add to Cart" button as needed */}
      </div>
		</Link>
    ))}
  </div>
</section>

<section className="container mx-auto my-8">
  <h2 className="text-3xl font-bold mb-4">Featured Hoodies</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {hoodies.map((hoodie) => (
		<Link href={`/hoodies`}>
      <div key={hoodie._id} className="bg-white p-4 rounded-md shadow-2xl flex flex-col transition-transform transform hover:scale-105">
        <div className="mb-4 relative overflow-hidden rounded-md">
          <img src={hoodie.img} alt={hoodie.title} className="max-w-full max-h-full object-cover rounded-md hover:opacity-75 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-75 transition-opacity duration-300"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{hoodie.title}</h3>
        <p className="text-gray-600">₹{hoodie.price.toFixed(2)}</p>
        {/* Add a "View Details" or "Add to Cart" button as needed */}
      </div>
		</Link>
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
