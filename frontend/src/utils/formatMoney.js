// utils/formatMoney.js

// 🔥 Format tiền Việt Nam chuẩn
export const formatMoney = (amount) => {
  if (!amount) return "0";
  return new Intl.NumberFormat("vi-VN").format(amount);
};