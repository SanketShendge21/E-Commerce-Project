import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({value:null})
  const [key, setKey] = useState()
  const [progress, setProgress] = useState(0)

  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart',()=>{
      setProgress(40);
    })
    router.events.on('routeChangeComplete',()=>{
      setProgress(100);
    })
    console.log("Use effect in _app.js");
    try {
      if(localStorage.getItem("cart"))
      {
        setCart(JSON.parse(localStorage.getItem("cart"))); // If the cart has already been persisted then update the cart
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error)
      localStorage.clear()
    }
    const token = localStorage.getItem("authtoken");
    if(token){
      setUser({value: token});
      setKey(Math.random())
    }
    else{

    }
  },[router.query])
  
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

  const buyNow = (itemCode, qty, price, name, size, variant ) => {
    saveCart({})
    let newCart = {itemCode : {qty: 1,  price,  name, size,  variant}};
    setCart(newCart)
    saveCart(newCart)
		router.push('/checkout');
	}

  const logout = () =>{
    localStorage.removeItem('authtoken');
    setKey(Math.random());
    setUser({value: null});
    router.push('/');
  }

  return (
  <>
    <LoadingBar
      color='#F97316'
      progress={progress}
      waitingTime={400}
      onLoaderFinished={() => setProgress(0)}
    />
    {/* Subtotal key to re-render navbar whenever subtotal changes */}
    <Navbar user={user} logout={logout} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
      <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} buyNow={buyNow} subTotal={subTotal} {...pageProps} />
    <Footer />
  </>
  )
}
