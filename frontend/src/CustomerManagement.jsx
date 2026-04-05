import { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerManagement.css";

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const role = localStorage.getItem("adminRole");

  const token = localStorage.getItem("adminToken");

  // 🔥 load customer
  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/customers?status=${statusFilter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  

  // 🔥 update status
  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/customers/${id}/status`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    fetchCustomers();
  };
  const [staffs, setStaffs] = useState([]);
const fetchStaffs = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/users/all",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // 🔥 chỉ lấy STAFF
    const staffList = res.data.filter(u => u.role === "STAFF");
    setStaffs(staffList);

  } catch (err) {
    console.error(err);
  }
};
// load customers theo filter
useEffect(() => {
  fetchCustomers();
}, [statusFilter]);

// load staff chỉ 1 lần
useEffect(() => {
  if (role === "ADMIN") {
    fetchStaffs();
  }
}, []);

const assignCustomer = async (customerId, staffId) => {
  await axios.put(
    `http://localhost:5000/api/customers/assign/${customerId}`,
    { staffId },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  fetchCustomers();
};
  return (
    <div className="crm-container">
      <h2>📊 Customer Management</h2>

      {/* FILTER */}
      <div className="filter-box">
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="NEW">NEW</option>
          <option value="CARE">CARE</option>
          <option value="VIP">VIP</option>
          <option value="BLOCK">BLOCK</option>
        </select>
      </div>

      {/* TABLE */}
      <table className="crm-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            {role === "ADMIN" && <th>Staff</th>}
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c._id}>
              <td>{c.fullName}</td>
              <td>{c.email}</td>

              <td>
                <span className={`status ${c.status}`}>
                  {c.status}
                </span>
              </td>

              {role === "ADMIN" && (
  <td>
    <select
      value={c.assignedTo?._id || ""}
      onChange={(e) => assignCustomer(c._id, e.target.value)}
    >
      <option value="">Chưa có</option>
      {staffs.map((s) => (
        <option key={s._id} value={s._id}>
          {s.fullName}
        </option>
      ))}
    </select>
  </td>
)}

<td>
  {role === "STAFF" && (
    <>
      <button onClick={() => updateStatus(c._id, "CARE")}>CARE</button>
      <button onClick={() => updateStatus(c._id, "VIP")}>VIP</button>
      <button onClick={() => updateStatus(c._id, "BLOCK")}>BLOCK</button>
    </>
  )}
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerManagement;