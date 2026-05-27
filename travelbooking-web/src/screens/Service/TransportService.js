import React from 'react';
import DynamicFilter from '../../components/DynamicFilter';
import ServiceList from '../../components/ServiceList';

const TransportService = () => {
    const mockTours = [
    {
      id: 1,
      badgeText: "3 Ngày 2 Đêm",
      title: "Tour Đà Lạt - Săn mây",
      details: ["Điểm đến: Đà Lạt", "Ngày kh: 15/07/2026"],
      price: "2.500.000đ"
    },
    {
      id: 2,
      badgeText: "2 Ngày 1 Đêm",
      title: "Tour Vũng Tàu - Tắm biển",
      details: ["Điểm đến: Vũng Tàu", "Ngày kh: 20/07/2026"],
      price: "1.200.000đ"
    },
    {
      id: 3,
      badgeText: "4 Ngày 3 Đêm",
      title: "Tour Phú Quốc - Lặn ngắm san hô",
      details: ["Điểm đến: Phú Quốc", "Ngày kh: 01/08/2026"],
      price: "5.500.000đ"
    },
    {
      id: 4,
      badgeText: "5 Ngày 4 Đêm",
      title: "Tour Sapa - Chinh phục Fansipan",
      details: ["Điểm đến: Sapa", "Ngày kh: 10/08/2026"],
      price: "4.800.000đ"
    },
    {
      id: 5,
      badgeText: "1 Ngày",
      title: "Tour Cần Giờ - Rừng ngập mặn",
      details: ["Điểm đến: Cần Giờ", "Ngày kh: Chủ nhật hàng tuần"],
      price: "600.000đ"
    }
  ];
    
    // Cấu hình mảng cho trang Phương tiện
    const transportConfig = [
    { key: 'departure', label: 'Điểm khởi hành', type: 'text' },
    { key: 'destination', label: 'Điểm đến', type: 'text' },
    { key: 'date', label: 'Ngày khởi hành', type: 'date' },
    { 
        key: 'vehicleType', 
        label: 'Loại phương tiện', 
        type: 'select',
        options: [
        { label: 'Xe khách', value: 'bus' },
        { label: 'Máy bay', value: 'plane' },
        { label: 'Tàu hỏa', value: 'train' }
        ]
    },
    ];

    const handleFilter = (values) => {
    console.log("Lọc phương tiện với:", values);
    };

    return (
    <div className="d-flex p-4">
        <DynamicFilter 
        config={transportConfig} 
        onFilterSubmit={handleFilter} 
        />
        
        <div className="ms-4 flex-grow-1">
            <ServiceList title="Danh sách các TOUR" items={mockTours} />
        </div>
    </div>
    );
};

export default TransportService;