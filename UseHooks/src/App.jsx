import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import Home from "./component/Pages/Home";
import Cart from "./component/Cart";
import Login from "./component/registration/Login";
import SignUp from "./component/registration/SignUp";
import ForgotPassword from "./component/registration/ForgotPassword";
import ProductPage from "./component/Pages/ProductPage";
import Categories from "./component/Pages/Categories";
import { ToastContainer } from "./component/Toast";


function App() {
    const [cart,setCart]= useState([])
    const [notifications, setNotifications] = useState([])
    

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }

    //product add karne ke liye function
    const addToCart= (product)=>{
        setCart((prev)=>{
            const exist = prev.find((item)=>item.id===product.id)
            if(exist){
                return prev.map((item)=>
                    item.id=== product.id ?{...item,quantity:item.quantity+1} : item
            )
            } else {
                return[...prev , {...product,quantity:1}]
            }
        })
        useEffect(() => {
      alert ("product added")
    
    }, [addToCart])
    

        // Trigger toast notification
        const id = Date.now();
        setNotifications((prev) => [
            ...prev,
            {
                id,
                productName: product.name,
                productImage: product.image
            }
        ]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            removeNotification(id);
        }, 3000);
    }
    //quantity kam jyada karne ke liye
    const updateQty = (id,type)=> {
        setCart(prev =>prev.map(item=>{
            if (item.id===id){
            if(type==="inc") return {...item,quantity:item.quantity+1}
            if(type==="dec" && item.quantity>1) return {...item,quantity:item.quantity-1}

            }
            return item

        }))
    }
    const removeFromCart= (id)=>{
        setCart(prev=>prev.filter(item=>item.id !==id))
    }

    return (


        <>
        <BrowserRouter>
        <Navbar />
         <Routes>
            
             <Route path="/" element={<Home addToCart={addToCart} />} />
             <Route path="/productpage" element={<ProductPage addToCart={addToCart} />} />
             <Route path="/categories" element={<Categories />} />
             <Route path="/cart" element={<Cart cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} />} />
             <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        </BrowserRouter>
        <ToastContainer notifications={notifications} removeNotification={removeNotification} />
        </>

    );
}

export default App;