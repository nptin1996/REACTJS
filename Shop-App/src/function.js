// hàm format Price
export function formatPrice(price) {
  // Chuyển đổi giá trị số thành chuỗi
  let priceString = String(price);

  // Tạo mảng để lưu các ký tự
  let formattedPrice = [];

  // Đếm biến đếm số ký tự đã được thêm vào mảng
  let count = 0;

  // Duyệt qua từng ký tự của chuỗi giá
  for (let i = priceString.length - 1; i >= 0; i--) {
    // Thêm ký tự vào mảng
    formattedPrice.unshift(priceString[i]);

    // Tăng biến đếm
    count++;

    // Nếu biến đếm đạt 3 và vị trí ký tự hiện tại không phải là ký tự đầu tiên của chuỗi
    if (count % 3 === 0 && i !== 0) {
      // Thêm dấu chấm vào mảng
      formattedPrice.unshift(".");
    }
  }
  // Kết hợp các phần tử của mảng thành một chuỗi
  return formattedPrice.join("") + " VND";
}

// Hàm format string
export function splitString(str) {
  // Sử dụng biểu thức chính quy để tách chuỗi bởi ký tự '-' hoặc '•'
  const regex = /[-•]/;
  // Sử dụng hàm split() để tách chuỗi thành mảng các phần tử
  const result = str.split(regex);
  return result;
}

// Hàm localStorage
export function setLocalStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function getLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}
