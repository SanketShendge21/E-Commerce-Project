import React from 'react';
import Head from "next/head";
const Contact = () => {
  return (
    <>
    	<Head>
				<title>Contact - ThreadsUnveiled</title>
			</Head>
    <div className="container mx-auto mt-8 p-4 min-h-screen">

      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-6">
        Have questions or feedback? Reach out to us. We're here to help!
      </p>
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="John Doe"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="john@example.com"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-600">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Type your message here..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Send Message
        </button>
      </form>
    </div>
    </>
  );
};

export default Contact;
