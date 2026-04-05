import { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get(
            "http://localhost:5000/api/orders/my-orders",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(res => {
                setOrders(res.data);
            });

    }, []);

    const steps = ["PENDING", "CONFIRMED", "SHIPPING", "DELIVERED"];

    // 🔥 HÀM HỦY ĐƠN
    const cancelOrder = async (orderId) => {
        try {
            const confirmCancel = window.confirm("Bạn chắc chắn muốn hủy đơn?");
            if (!confirmCancel) return;

            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/orders/${orderId}/cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // cập nhật UI
            setOrders(prev =>
                prev.map(o =>
                    o._id === orderId ? { ...o, status: "CANCELLED" } : o
                )
            );

        } catch (err) {
            console.error(err);
            alert("Hủy đơn thất bại");
        }
    };

    return (

        <div className="orders-page">

            <h2>Đơn hàng của tôi</h2>

            {orders.map(order => {

                const currentStep = steps.indexOf(order.status);

                return (

                    <div className="order-card" key={order._id}>

                        <div className="order-header">

                            <div>
                                <b>Mã đơn:</b> {order._id}
                            </div>

                            <div className="status">
                                {order.status}
                            </div>

                        </div>

                        {/* PRODUCTS */}

                        {order.items.map(item => (
                            <div className="order-item" key={item._id}>

                                <img src={item.product?.image} alt="" />

                                <div>

                                    <div className="product-name">
                                        {item.product?.name}
                                    </div>

                                    <div className="product-price">
                                        {item.quantity} x {item.price.toLocaleString()} đ
                                    </div>

                                </div>

                            </div>
                        ))}

                        {/* TIMELINE */}
<div className="timeline">

                            {steps.map((step, index) => {

                                const active = index <= currentStep;

                                return (

                                    <div className="timeline-step" key={step}>

                                        <div className={`circle ${active ? "active" : ""}`}>
                                            {index + 1}
                                        </div>

                                        <div className={`label ${active ? "active" : ""}`}>
                                            {step}
                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                        <div className="order-total">
                            Tổng tiền: {order.totalAmount.toLocaleString()} đ
                        </div>

                        {/* 🔥 NÚT HỦY ĐƠN */}
                        {order.status === "PENDING" && (
                            <button
                                className="cancel-btn"
                                onClick={() => cancelOrder(order._id)}
                            >
                                Hủy đơn
                            </button>
                        )}

                        {/* hiển thị nếu đã hủy */}
                        {order.status === "CANCELLED" && (
                            <div className="cancelled-text">
                                Đơn hàng đã bị hủy
                            </div>
                        )}

                    </div>

                )

            })}

            {orders.length === 0 && (
                <div className="no-orders">
                    Bạn chưa có đơn hàng nào
                </div>
            )}

        </div>

    )

}

export default Orders;