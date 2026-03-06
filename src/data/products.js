export const products = [
  {
    id: "p1",
    name: "Tai nghe Wireless Pro",
    price: 1290000,
    image:
      "https://plus.unsplash.com/premium_photo-1677838847804-4054143fb91a?auto=format&fit=crop&w=1200&q=80",
    description:
      "Tai nghe không dây chất âm cân bằng, chống ồn chủ động, pin 30 giờ.",
    specs: ["ANC chống ồn", "Pin 30 giờ", "Sạc Type-C", "Bluetooth 5.3"],
  },
  {
    id: "p2",
    name: "Bàn phím Cơ Minimal",
    price: 1590000,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
    description:
      "Bàn phím cơ layout 75%, gõ êm, keycap PBT, thiết kế tối giản hiện đại.",
    specs: ["Layout 75%", "Hot-swap", "Keycap PBT", "LED trắng"],
  },
  {
    id: "p3",
    name: "Chuột Gaming Ultra",
    price: 890000,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80",
    description:
      "Chuột siêu nhẹ, cảm biến chính xác, phù hợp FPS/MOBA, pin bền.",
    specs: ["63g siêu nhẹ", "DPI 26000", "Wireless", "USB-C"],
  },
  {
    id: "p4",
    name: "Màn hình 27” IPS 2K",
    price: 5290000,
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
    description:
      "Màn hình IPS 2K 144Hz, viền mỏng, màu sắc chuẩn, phù hợp làm việc & game.",
    specs: ["27 inch", "2K (2560x1440)", "144Hz", "IPS 99% sRGB"],
  },
];

export const formatVND = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);