import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)

  useEffect(() => {
    console.log("finding error or working...");
    try {
      if(localStorage.getItem("cart"))
      {
        setCart(JSON.parse(localStorage.getItem("cart"))); // If the cart has already been persisted then update the cart
      }
    } catch (error) {
      console.error(error)
      localStorage.clear()
    }
  },[])
  
  // Saves the cart into local storage so that it can be persisted
  const saveCart = (myCart) => {
    // Save the shopping cart to localStorage
    localStorage.setItem("cart",JSON.stringify(myCart))
    
    let subt = 0;
    let keys = Object.keys(myCart); //This line retrieves an array of keys (item identifiers) from the shopping cart object.
    // console.log(keys);
    // Iterate through the cart keys and calculate the subtotal for each key
    for(let i=0; i < keys.length; i++ )
    {
      // For each item in the cart, it calculates the subtotal by multiplying the item's price with its quantity and adds it to the subt variable.
      subt += myCart[keys[i]].price * myCart[keys[i]].qty; 
    }
    setSubTotal(subt)
  }
  // Function to add items to the cart
  const addToCart = (itemCode, qty, price, name, size, variant ) => {
    let newCart = cart;
    if(itemCode in cart)
    {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    else
    {
      newCart[itemCode] = {qty: 1, price: price, name: name, size:size, variant: variant}
    }
    setCart(newCart)
    saveCart(newCart)
  }

  // Removes items from the cart
  const removeFromCart = (itemCode, qty, price, name, size, variant ) => {
    let newCart = cart;
    if(itemCode in cart)
    {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if(newCart[itemCode]["qty"]<= 0)
    {
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
  }

  //Function to remove items from the cart (clear the cart)
  const clearCart = () =>{
    setCart({})
    saveCart({})
  }

  return (
  <>
    <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
      <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    <Footer />
  </>
  )
}
