import { createContext, useEffect, useState } from 'react';
import axios from 'axios';


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url="https://food-delivery-app-4-backend-kkou.onrender.com"
    const [token,setToken]=useState("");

    const [food_list,setFoodList]=useState([]);

    const addToCart =async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    };

    const removeFromCart = async(itemId) => {
       setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
       if (token) {
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
       }
    };
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id ===item);
                console.log("item ",item); 
                console.log("item info ",itemInfo); 
                console.log("cartitem is ",cartItems[item]);
                
                if (itemInfo) {
                    totalAmount += Number(itemInfo.price) * cartItems[item];
                }
            }
        }
        return totalAmount;
    };
    
    const fetchFoodList=async()=>{
        const response=await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }

    const loadCartData=async(token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
      
        async function loadData() {
            await fetchFoodList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        addToCart,
        removeFromCart,
        setCartItems,
        cartItems,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
