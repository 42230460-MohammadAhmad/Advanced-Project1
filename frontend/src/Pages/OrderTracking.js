import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";

function OrderTracking() {
  const { orders } = useContext(CartContext);

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
                  {order.items.map((i) => (
                    <li key={i.id}>{i.name} × {i.quantity}</li>
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
