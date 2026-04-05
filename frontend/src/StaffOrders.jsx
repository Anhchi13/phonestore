import { useEffect, useState } from "react";
import axios from "axios";
import "./StaffOrders.css";

function StaffOrders() {

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const token = localStorage.getItem("adminToken");

  // ===== FETCH ORDERS =====
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setOrders(res.data);

    } catch (err) {

      console.log("Lỗi lấy orders:", err);

    }

  };

  // ===== UPDATE STATUS =====
  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchOrders();

    } catch (err) {

      console.log("Lỗi update status:", err);

    }

  };

  // ===== FILTER =====
  const filteredOrders =
    filter === "ALL"
      ? orders
      : orders.filter((o) => o.status === filter);

  return (

    <div className="orders-container">

      {/* HEADER */}
      <div className="orders-header">
        <h2>Quản lý đơn hàng</h2>
      </div>

      {/* FILTER */}
      <div className="orders-filter">

        <button
          className={filter === "ALL" ? "active" : ""}
          onClick={() => setFilter("ALL")}
        >
          Tất cả
        </button>

        <button
          className={filter === "PENDING" ? "active pending" : ""}
          onClick={() => setFilter("PENDING")}
        >
          PENDING
        </button>

        <button
          className={filter === "SHIPPING" ? "active shipping" : ""}
          onClick={() => setFilter("SHIPPING")}
        >
          SHIPPING
        </button>

        <button
          className={filter === "DELIVERED" ? "active delivered" : ""}
          onClick={() => setFilter("DELIVERED")}
        >
          DELIVERED
        </button>

        <button
          className={filter === "CANCELLED" ? "active cancelled" : ""}
          onClick={() => setFilter("CANCELLED")}
        >
          CANCELLED
        </button>

      </div>

      {/* TABLE */}
      <div className="orders-card">

        <table className="orders-table">

          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Cập nhật</th>
              <th>Lịch sử</th>
            </tr>
          </thead>

          <tbody>

            {filteredOrders.map((order) => (

              <tr key={order._id}>

                <td>#{order._id.slice(-6)}</td>

                <td>{order.user?.fullName}</td>

                <td>{order.totalAmount.toLocaleString()} ₫</td>

                <td>
                  <span
                    className={`status-badge ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                  >

                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="SHIPPING">SHIPPING</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>

                  </select>

                </td>

                <td>

                  <div className="timeline">

                    {order.statusHistory?.map((h, index) => (

                      <div key={index} className="timeline-item">

                        <strong>{h.status}</strong>

                        <br />

                        <small>
                          {new Date(h.changedAt).toLocaleString()}
                        </small>

                      </div>

                    ))}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {filteredOrders.length === 0 && (
          <p className="no-data">Không có đơn hàng</p>
        )}

      </div>

    </div>

  );

}

export default StaffOrders;