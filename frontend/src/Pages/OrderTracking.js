import React, { useEffect, useState } from "react";

function OrderTracking() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center text-danger">Order Tracking</h2>

      {orders.length === 0 ? (
        <p className="text-center mt-3">No orders placed yet.</p>
      ) : (
        <div className="row g-3 mt-3">
          {orders.map((order) => (
            <div className="col-12" key={order.id}>
              <div className="card p-3 shadow-sm">
                <h5>Order ID: {order.id}</h5>
                <p>Status: <strong>{order.status}</strong></p>
                <ul>
                  {order.items.map((i, idx) => (
                    <li key={idx}>{i.item_name} × {i.quantity}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderTracking;
