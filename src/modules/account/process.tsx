"use client";
import React, { useState } from "react";

type Option = {
    label: string;
    value: string;
    priceModifier: number;
    imageUrl: string;
};

const materials: Option[] = [
    { label: "Giấy", value: "paper", priceModifier: 50000, imageUrl: "/images/material-paper.jpg" },
    { label: "Nhựa", value: "plastic", priceModifier: 100000, imageUrl: "/images/material-plastic.jpg" },
];

const colors: Option[] = [
    { label: "Đen", value: "black", priceModifier: 20000, imageUrl: "/images/color-black.jpg" },
    { label: "Trắng", value: "white", priceModifier: 15000, imageUrl: "/images/color-white.jpg" },
];

const sizes: Option[] = [
    { label: "Nhỏ", value: "small", priceModifier: 30000, imageUrl: "/images/size-small.jpg" },
    { label: "Lớn", value: "large", priceModifier: 60000, imageUrl: "/images/size-large.jpg" },
];

export default function ProcessTab() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [material, setMaterial] = useState<Option | null>(null);
    const [color, setColor] = useState<Option | null>(null);
    const [size, setSize] = useState<Option | null>(null);
    const [price, setPrice] = useState(0);
    const [address, setAddress] = useState("");
    const [distance, setDistance] = useState<number | null>(null);
    const [shippingCost, setShippingCost] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");

    const basePrice = 200000;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const calculatePrice = () => {
        let totalPrice = basePrice;
        if (material) totalPrice += material.priceModifier;
        if (color) totalPrice += color.priceModifier;
        if (size) totalPrice += size.priceModifier;
        setPrice(totalPrice);
    };

    const handleOptionChange = (setter: React.Dispatch<React.SetStateAction<Option | null>>, option: Option) => {
        setter(option);
        calculatePrice();
    };

    const calculateDistance = async () => {
        const calculatedDistance = Math.random() * 20 + 5;
        setDistance(calculatedDistance);
        setShippingCost(calculatedDistance * 5000);
    };

    const handlePayment = () => {
        if (paymentMethod === "COD") {
            alert("Bạn đã chọn thanh toán khi nhận hàng.");
        } else if (paymentMethod === "QR") {
            alert("Hiện mã QR để thanh toán.");
        } else if (paymentMethod === "Momo") {
            alert("Kết nối thanh toán với Momo.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Tạo đơn hàng</h2>

            {/* Tải lên file và xem trước */}
            <div className="mb-4">
                <label className="block font-semibold">Tải lên file của bạn</label>
                <input type="file" onChange={handleFileChange} className="mt-2" />
                {previewUrl && (
                    <div className="mt-4">
                        <p>Xem trước:</p>
                        <img src={previewUrl} alt="Preview" className="w-40 h-40 object-cover mt-2 border" />
                    </div>
                )}
            </div>

            {/* Tùy chọn sản phẩm */}
            <div className="mb-4">
                <label className="block font-semibold">Chất liệu</label>
                <select onChange={(e) => handleOptionChange(setMaterial, materials.find(m => m.value === e.target.value)!)} className="mt-2">
                    <option value="">Chọn chất liệu</option>
                    {materials.map((m) => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                </select>
                {material && (
                    <div className="mt-2">
                        <p>Chất liệu:</p>
                        <img src={material.imageUrl} alt={material.label} className="w-40 h-40 object-cover border" />
                    </div>
                )}
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Màu sắc</label>
                <select onChange={(e) => handleOptionChange(setColor, colors.find(c => c.value === e.target.value)!)} className="mt-2">
                    <option value="">Chọn màu sắc</option>
                    {colors.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                </select>
                {color && (
                    <div className="mt-2">
                        <p>Màu sắc:</p>
                        <img src={color.imageUrl} alt={color.label} className="w-40 h-40 object-cover border" />
                    </div>
                )}
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Kích thước</label>
                <select onChange={(e) => handleOptionChange(setSize, sizes.find(s => s.value === e.target.value)!)} className="mt-2">
                    <option value="">Chọn kích thước</option>
                    {sizes.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                </select>
                {size && (
                    <div className="mt-2">
                        <p>Kích thước:</p>
                        <img src={size.imageUrl} alt={size.label} className="w-40 h-40 object-cover border" />
                    </div>
                )}
            </div>

            {/* Hiển thị giá */}
            <div className="mb-4">
                <p><strong>Tổng giá:</strong> {price.toLocaleString()} VND</p>
            </div>

            {/* Địa chỉ và tính tiền ship */}
            <div className="mb-4">
                <label className="block font-semibold">Địa chỉ của bạn</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                />
                <button onClick={calculateDistance} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Tính khoảng cách và phí vận chuyển
                </button>
                {distance && (
                    <p className="mt-2">
                        Khoảng cách: {distance.toFixed(2)} km - Phí vận chuyển: {shippingCost.toLocaleString()} VND
                    </p>
                )}
            </div>

            {/* Lựa chọn phương thức thanh toán */}
            <div className="mb-4">
                <label className="block font-semibold">Phương thức thanh toán</label>
                <select onChange={(e) => setPaymentMethod(e.target.value)} className="mt-2">
                    <option value="">Chọn phương thức thanh toán</option>
                    <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                    <option value="QR">Thanh toán qua mã QR</option>
                    <option value="Momo">Thanh toán qua Momo</option>
                </select>
            </div>

            <button onClick={handlePayment} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                Thanh toán
            </button>
        </div>
    );
}
