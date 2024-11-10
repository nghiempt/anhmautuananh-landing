"use client";
import React, { useState } from "react";

type AccountData = {
    name: string;
    birthdate: string;
    address: {
        details: string;
        district: string;
        city: string;
    };
    phoneNumber: string;
    email: string;
};

export default function AccountTab() {
    const [isEditing, setIsEditing] = useState(false);
    const [accountData, setAccountData] = useState<AccountData>({
        name: "Pham Thanh Nghiem",
        birthdate: "20/01/2002",
        address: {
            details: "332 Phan Van Tri",
            district: "Binh Thanh",
            city: "Ho Chi Minh",
        },
        phoneNumber: "0911558539",
        email: "nghiempt.dev@gmail.com",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.includes("address")) {
            const addressField = name.split(".")[1];
            setAccountData((prevData) => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [addressField]: value,
                },
            }));
        } else {
            setAccountData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleEdit = () => setIsEditing(true);

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="p-4">
            <div className="flex justify-end gap-2">
                {isEditing ? (
                    <button onClick={handleSave} className="px-4 py-2 bg-[#4158A6] text-white rounded-lg">
                        Lưu
                    </button>
                ) : (
                    <button onClick={handleEdit} className="px-4 py-2 bg-[#FF8343] rounded-lg text-white">
                        Chỉnh sửa thông tin
                    </button>
                )}
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Họ và tên</label>
                <input
                    type="text"
                    name="name"
                    value={accountData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-2 border rounded ${isEditing ? "border-gray-300" : "border-transparent"}`}
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Ngày sinh</label>
                <input
                    type="date"
                    name="birthdate"
                    value={accountData.birthdate}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-2 border rounded ${isEditing ? "border-gray-300" : "border-transparent"}`}
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Số điện thoại</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={accountData.phoneNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-2 border rounded ${isEditing ? "border-gray-300" : "border-transparent"}`}
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Email</label>
                <input
                    type="email"
                    name="email"
                    value={accountData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-2 border rounded ${isEditing ? "border-gray-300" : "border-transparent"}`}
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Địa chỉ chi tiết</label>
                <input
                    type="text"
                    name="address.details"
                    value={accountData.address.details}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-2 border rounded ${isEditing ? "border-gray-300" : "border-transparent"}`}
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Quận / Huyện</label>
                <select
                    name="address.district"
                    value={accountData.address.district}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-2 border rounded ${isEditing ? "border-gray-300" : "border-transparent"}`}
                >
                    <option value="">Chọn Quận/Huyện</option>
                    <option value="district1">Quận 1</option>
                    <option value="district2">Quận 2</option>
                </select>
            </div>
            <div className="">
                <label className="block font-semibold">TP / Tỉnh</label>
                <select
                    name="address.city"
                    value={accountData.address.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-2 border rounded ${isEditing ? "border-gray-300" : "border-transparent"}`}
                >
                    <option value="">Chọn Thành phố/Tỉnh</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="hn">Hà Nội</option>
                </select>
            </div>
        </div>
    );
}
