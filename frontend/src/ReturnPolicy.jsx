import "./ReturnPolicy.css";

function ReturnPolicy() {
  return (
    <div className="return-page">
      <div className="return-container">
        <h1>Chính sách đổi trả</h1>

        <h3>1. Thời gian đổi trả</h3>
        <p>
          Hỗ trợ đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.
        </p>

        <h3>2. Điều kiện đổi trả</h3>
        <ul>
          <li>Sản phẩm còn nguyên hộp, phụ kiện đầy đủ</li>
          <li>Không trầy xước, móp méo</li>
          <li>Không kích hoạt bảo hành</li>
        </ul>

        <h3>3. Quy trình</h3>
        <p>
          Liên hệ hotline để được hướng dẫn xử lý nhanh chóng.
        </p>
      </div>
    </div>
  );
}

export default ReturnPolicy;