import "./Warranty.css";

function Warranty() {
  return (
    <div className="warranty-page">
      <div className="warranty-container">
        <h1>Chính sách bảo hành</h1>

        <h3>1. Thời gian bảo hành</h3>
        <p>
          BaoPhone cam kết bảo hành chính hãng 12 tháng đối với tất cả sản phẩm.
          Lỗi kỹ thuật từ nhà sản xuất sẽ được hỗ trợ nhanh chóng.
        </p>

        <h3>2. Điều kiện bảo hành</h3>
        <ul>
          <li>Sản phẩm còn nguyên tem bảo hành</li>
          <li>Không rơi vỡ, vào nước, tác động vật lý</li>
          <li>Có hóa đơn mua hàng</li>
        </ul>

        <h3>3. Hỗ trợ kỹ thuật</h3>
        <p>
          Hotline: 0384 078 353 <br />
          Email: support@baophone.vn
        </p>
      </div>
    </div>
  );
}

export default Warranty;