import React, { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL;

function Kitchen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${API}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  const updateOrderStatus = async (id, status) => {
    await fetch(`${API}/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    // refresh orders
    setOrders(
      orders.map(order =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const deleteOrder = async (id) => {
    await fetch(`${API}/orders/${id}`, {
      method: "DELETE",
    });

    setOrders(orders.filter(order => order.id !== id));
  };

  return (
    <div className="container py-4">
      <h2 className="text-center text-danger">Kitchen Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center mt-3">No orders yet.</p>
      ) : (
        <div className="row g-3 mt-3">
          {orders.map(order => (
            <div className="col-12" key={order.id}>
              <div className="card p-3 shadow-sm">
                <h5>Order ID: {order.id}</h5>
                <p>Status: <strong>{order.status}</strong></p>

                <ul>
                  {order.items.map((i, idx) => (
                    <li key={idx}>
                      {i.item_name} × {i.quantity}
                    </li>
                  ))}
                </ul>

                <div className="mt-3 d-flex gap-2">
                  <button
                    className="btn btn-success"
                    onClick={() => updateOrderStatus(order.id, "In Progress")}
                  >
                    In Progress
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={() => updateOrderStatus(order.id, "Completed")}
                  >
                    Completed
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteOrder(order.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Kitchen;
