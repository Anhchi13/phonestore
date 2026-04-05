const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // =====================================================
    // 👤 USER ĐẶT HÀNG
    // =====================================================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // 🔥 FIX: bắt buộc phải có user
    },

    // =====================================================
    // 🛒 DANH SÁCH SẢN PHẨM
    // =====================================================
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true, // 🔥 FIX
        },

        quantity: {
          type: Number,
          required: true, // 🔥 FIX
          min: 1,
        },

        // 🔥 LƯU GIÁ TẠI THỜI ĐIỂM MUA (KHÔNG LẤY LẠI TỪ PRODUCT)
        price: {
          type: Number,
          required: true, // 🔥 FIX
        },
      },
    ],

    // =====================================================
    // 💰 TỔNG TIỀN
    // =====================================================
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // =====================================================
    // 🚚 THÔNG TIN GIAO HÀNG (🔥 THÊM MỚI)
    // =====================================================
    shippingInfo: {
      fullName: String,
      phone: String,
      address: String,
      note: String,
    },

    // =====================================================
    // 💳 PHƯƠNG THỨC THANH TOÁN (🔥 THÊM MỚI)
    // =====================================================
    paymentMethod: {
      type: String,
      enum: ["COD", "BANKING"],
      default: "COD",
    },

    // =====================================================
    // 📦 TRẠNG THÁI ĐƠN
    // =====================================================
    status: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "SHIPPING",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PENDING",
      index: true, // 🔥 FIX: tăng tốc query dashboard
    },

    // =====================================================
    // 📜 LỊCH SỬ TRẠNG THÁI
    // =====================================================
    statusHistory: [
      {
        status: String,

        changedAt: {
          type: Date,
          default: Date.now,
        },

        changedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);


// =====================================================
// 🔥 AUTO PUSH HISTORY KHI TẠO ĐƠN
// =====================================================
orderSchema.pre("save", function (next) {

  if (this.isNew) {
    this.statusHistory.push({
      status: "PENDING",
      changedBy: this.user,
    });
  }

  next();
});

module.exports = mongoose.model("Order", orderSchema);