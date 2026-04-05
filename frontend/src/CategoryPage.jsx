import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // ✅ thêm Link
import axios from "axios";
import "./CategoryPage.css";
import { formatMoney } from "./utils/formatMoney";


function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("new");

  // ================= FETCH PRODUCTS BY CATEGORY =================
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/category/${slug}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [slug]);

  // ================= SORT LOGIC =================
  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "price-asc") return a.price - b.price;
    if (sortType === "price-desc") return b.price - a.price;

    // Mặc định: mới nhất
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="category-page">

      {/* ===== BANNER ===== */}
      <div className="category-banner">
        <h1>{slug.toUpperCase()}</h1>
      </div>

      {/* ===== FILTER & SORT BAR ===== */}
      <div className="category-toolbar">
        <div className="filter-btn">Lọc</div>

        <div className="sort-group">
          <span>Sắp xếp theo:</span>

          <button onClick={() => setSortType("new")}>
            Mới nhất
          </button>

          <button onClick={() => setSortType("price-asc")}>
            Giá tăng
          </button>

          <button onClick={() => setSortType("price-desc")}>
            Giá giảm
          </button>
        </div>
      </div>

      {/* ===== PRODUCT GRID ===== */}
      <div className="category-grid">
        {sortedProducts.map((p) => (

          // ✅ Bọc toàn bộ card bằng Link
          <Link
            key={p._id}
            to={`/product/${p._id}`}
            className="category-card"
          >

            {/* ===== SALE BADGE ===== */}
            {p.discount > 0 && (
              <span className="sale-badge">
                -{p.discount}%
              </span>
            )}

            <img
            src={p.image}
            alt={p.name}
          />
            <h3>{p.name}</h3>

            {/* ===== PRICE BOX ===== */}
            <div className="price-box">

              {/* Giá sau giảm */}
              <span className="new-price">
                {formatMoney(p.price)} đ
              </span>

              {/* Nếu có giảm giá thì hiển thị giá gốc + % */}
              {p.discount > 0 && (
                <>
                  <span className="old-price">
                    {p.originalPrice?.toLocaleString()} đ
                  </span>

                  <span className="discount">
                    -{p.discount}%
                  </span>


                </>
              )}

            </div>

          </Link>
        ))}
      </div>

    </div>
  );
}

export default CategoryPage;