import React from "react";
import "./Orders.css";
import Header from "../header";

const OrdersPage = () => {
  const orders = [
    {
      id: 1,
      item: "RELIANCE",
      type: "Equity - Delivery",
      time: "2025-02-12 09:15:23",
      strategy: "Covered Call",
    },
    {
      id: 2,
      item: "NIFTY 18000 CE",
      type: "Derivative - Intraday",
      time: "2025-02-12 10:30:45",
      strategy: "Iron Condor",
    },
    {
      id: 3,
      item: "TCS",
      type: "Equity - Intraday",
      time: "2025-02-12 11:45:10",
      strategy: "Momentum Trading",
    },
    {
      id: 4,
      item: "BANKNIFTY 42000 PE",
      type: "Derivative - Delivery",
      time: "2025-02-12 13:20:05",
      strategy: "Straddle",
    },
  ];

  return (<div>
    <Header></Header>
    <div className="orders-container">
      <h2>Order History</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Ordered Item</th>
            <th>Order Type</th>
            <th>Time of Order</th>
            <th>Strategy</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.item}</td>
              <td>{order.type}</td>
              <td>{order.time}</td>
              <td>{order.strategy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default OrdersPage;
