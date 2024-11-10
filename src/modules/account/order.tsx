"use client";
import React, { useState } from "react";

type Order = {
    id: string;
    date: string;
    status: string;
    total: number;
    items: {
        name: string;
        quantity: number;
        price: number;
    }[];
};

const sampleOrders: Order[] = [
    {
        id: "ORD12345",
        date: "2024-11-01",
        status: "Delivered",
        total: 250000,
        items: [
            { name: "Product A", quantity: 2, price: 100000 },
            { name: "Product B", quantity: 1, price: 50000 },
        ],
    },
    {
        id: "ORD12346",
        date: "2024-10-25",
        status: "Pending",
        total: 150000,
        items: [
            { name: "Product C", quantity: 1, price: 150000 },
        ],
    },
];

export default function OrderTab() {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
    };

    const handleBackToList = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="p-4">
            {!selectedOrder ? (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Danh sách đơn hàng</h2>
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border-b p-2">Mã đơn hàng</th>
                                <th className="border-b p-2">Ngày đặt</th>
                                <th className="border-b p-2">Trạng thái</th>
                                <th className="border-b p-2">Tổng tiền</th>
                                <th className="border-b p-2">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sampleOrders.map((order) => (
                                <tr key={order.id} className="text-center">
                                    <td className="border-b p-2">{order.id}</td>
                                    <td className="border-b p-2">{order.date}</td>
                                    <td className="border-b p-2">{order.status}</td>
                                    <td className="border-b p-2">{order.total.toLocaleString()} VND</td>
                                    <td className="border-b p-2">
                                        <button
                                            onClick={() => handleViewDetails(order)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <button onClick={handleBackToList} className="text-blue-500 hover:underline mb-4">
                        &larr; Quay lại danh sách
                    </button>
                    <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng {selectedOrder.id}</h2>
                    <div className="mb-4">
                        <p><strong>Ngày đặt:</strong> {selectedOrder.date}</p>
                        <p><strong>Trạng thái:</strong> {selectedOrder.status}</p>
                        <p><strong>Tổng tiền:</strong> {selectedOrder.total.toLocaleString()} VND</p>
                    </div>
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border-b p-2">Sản phẩm</th>
                                <th className="border-b p-2">Số lượng</th>
                                <th className="border-b p-2">Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedOrder.items.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border-b p-2">{item.name}</td>
                                    <td className="border-b p-2">{item.quantity}</td>
                                    <td className="border-b p-2">{item.price.toLocaleString()} VND</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
