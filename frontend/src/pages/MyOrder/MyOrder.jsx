import React, { useContext, useEffect, useState } from "react";
import "./MyOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";

const MyOrder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    console.log(response.data.data);
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            {data.length > 0 && <img src={assets.parcel_icon} alt="Parcel Icon" className="parcel-icon" />}
            <p>
              {order.items.map((item, idx) => {
                console.log("It is order length" ,order.items.length);
                console.log("It is idx",idx);
                if (idx===order.items.length-1) {
                    return item.name+" X "+item.quantity
                }else{
                    return item.name+" X "+item.quantity

                }
                
                
              })}
            </p>
            <p>${order.amount}.00</p>
            <p>${order.items.length}</p>
            <p><span>&#x25cf;</span><b>{order.status}</b></p>
            <button onClick={fetchOrders()}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
