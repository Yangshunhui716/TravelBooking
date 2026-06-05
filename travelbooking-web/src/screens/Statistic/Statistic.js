import { useEffect, useState, useCallback } from "react";
import { 
    ComposedChart, Area, Bar, CartesianGrid, Legend, 
    ResponsiveContainer, Tooltip, XAxis, YAxis 
} from "recharts";
import { authApis, endpoints } from "../../configs/Api"; 
import { Container } from "react-bootstrap";
import StaticStyle from "../StaticStyle";

const Statistic = () => {
    const [chartData, setChartData] = useState([]);
    const [metric, setMetric] = useState('customers');
    const [timePeriod, setTimePeriod] = useState('month');
    const [serviceType, setServiceType] = useState('all');
    const [periodValue, setPeriodValue] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const fillMissingData = useCallback((apiData, currentPeriodType, currentPeriodValue, currentYear) => {
        let expectedPeriods = [];
        let prefix = "";

        if (currentPeriodType === 'month') {
            const daysInMonth = new Date(currentYear, currentPeriodValue, 0).getDate();
            expectedPeriods = Array.from({ length: daysInMonth }, (_, i) => i + 1);
            prefix = "Ngày ";
        } else if (currentPeriodType === 'quarter') {
            const startMonth = (currentPeriodValue - 1) * 3 + 1;
            expectedPeriods = [startMonth, startMonth + 1, startMonth + 2];
            prefix = "T";
        } else if (currentPeriodType === 'year') {

            expectedPeriods = Array.from({ length: 12 }, (_, i) => i + 1);
            prefix = "T";
        }


        return expectedPeriods.map(p => {

            const record = apiData.find(d => Number(d.period) === p);
            
            const total = record ? record.totalCustomers : 0;
            const newCus = record ? record.newCustomers : 0;

            const oldCus = Math.max(0, total - newCus); 

            return {
                periodDisplay: `${prefix}${p}`,
                revenue: record ? record.revenue : 0,
                totalCustomers: total,
                newCustomers: newCus,
                oldCustomers: oldCus
            };
        });
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const res = await authApis().get(endpoints['provider-statistics'](metric), {
                params: {
                    "timePeriod": timePeriod,
                    "serviceType": serviceType,
                    "periodValue": periodValue,
                    "year": year
                }
            });
            
            const processedData = fillMissingData(res.data, timePeriod, periodValue, year);
            setChartData(processedData);
            
        } catch (ex) {
            console.error("Lỗi khi tải dữ liệu thống kê:", ex);
            setChartData(fillMissingData([], timePeriod, periodValue, year));
        }
    }, [metric, timePeriod, serviceType, periodValue, year, fillMissingData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const handleTimePeriodChange = (e) => {
        const newPeriod = e.target.value;
        setTimePeriod(newPeriod);
        
        if (newPeriod === 'year') {
            setPeriodValue(null);
        } else if (newPeriod === 'quarter') {
            setPeriodValue(1);
        } else {
            setPeriodValue(new Date().getMonth() + 1);
        }
    };


    const formatYAxis = (value) => {
        if (metric === 'revenue') {
            return value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : value;
        }
        return value;
    };

    return (
        <Container className="mt-5" style={StaticStyle.baseHeight}>
            <div className="bg-white border rounded-4 p-4 shadow-sm">
                <h3 className="fw-bold text-dark text-center text-sm-start text-uppercase mb-3">Thống kê</h3>
                
                <div className="row">
                    <div className="col-md-3 border-end pe-4">
                        <div className="mb-3">
                            <label className="form-label text-secondary fw-semibold small">Chỉ số báo cáo</label>
                            <select className="form-select border-dark shadow-none" value={metric} onChange={(e) => setMetric(e.target.value)}>
                                <option value="revenue">Doanh thu</option>
                                <option value="customers">Số lượng khách hàng</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-secondary fw-semibold small">Loại hình dịch vụ</label>
                            <select className="form-select border-dark shadow-none" value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                                <option value="all">Tất cả</option>
                                <option value="tour">Tour</option>
                                <option value="hotelRoom">Phòng khách sạn</option>
                                <option value="transport">Phương tiện</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-secondary fw-semibold small">Năm thống kê</label>
                            <input 
                                type="number" 
                                className="form-control border-dark shadow-none" 
                                value={year} 
                                onChange={(e) => setYear(e.target.value)} 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-secondary fw-semibold small">Chu kỳ thời gian</label>
                            <select className="form-select border-dark shadow-none" value={timePeriod} onChange={handleTimePeriodChange}>
                                <option value="month">Ngày trong tháng</option>
                                <option value="quarter">Các tháng trong quý</option>
                                <option value="year">Các tháng trong năm</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-secondary fw-semibold small">Thời điểm cụ thể</label>
                            <select 
                                className="form-select border-dark shadow-none" 
                                value={periodValue} 
                                onChange={(e) => setPeriodValue(e.target.value)}
                                disabled={timePeriod === 'year'}
                            >
                                {timePeriod === 'month' && (
                                    Array.from({ length: 12 }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
                                    ))
                                )}
                                {timePeriod === 'quarter' && (
                                    Array.from({ length: 4 }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>Quý {i + 1}</option>
                                    ))
                                )}
                                {timePeriod === 'year' && (
                                    <option value="all">Cả năm</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-9 ps-4 d-flex flex-column">
                        <h5 className="text-center mb-4 text-secondary">
                            {metric === 'revenue' ? "Biểu đồ Doanh thu" : "Biểu đồ Phân bổ Khách hàng"}
                        </h5>
                        <div className="flex-grow-1" style={{ minHeight: '400px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart
                                    data={chartData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
                                    <XAxis 
                                        dataKey="periodDisplay" 
                                        tick={{fill: '#6c757d', fontSize: 12}} 
                                        tickLine={false} 
                                        axisLine={false} 
                                    />
                                    <YAxis 
                                        tickFormatter={formatYAxis}
                                        tick={{fill: '#6c757d', fontSize: 12}} 
                                        tickLine={false} 
                                        axisLine={false} 
                                    />
                                    <Tooltip 
                                        formatter={(value, name) => {
                                            if (metric === 'revenue') return [`${value.toLocaleString()} VNĐ`, 'Doanh thu'];
                                            return [value, name];
                                        }}
                                        cursor={{fill: 'rgba(200, 200, 200, 0.1)'}}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                    

                                    {metric === 'revenue' && timePeriod === 'year' && (
                                        <Area 
                                            type="monotone" 
                                            dataKey="revenue" 
                                            name="Doanh thu" 
                                            fill="#f6c23e" 
                                            stroke="#f6c23e" 
                                            fillOpacity={0.3} 
                                            strokeWidth={3}
                                            activeDot={{ r: 6 }} 
                                        />
                                    )}
                                    {metric === 'revenue' && timePeriod !== 'year' && (
                                        <Bar 
                                            dataKey="revenue" 
                                            name="Doanh thu" 
                                            fill="#f6c23e" 
                                            radius={[4, 4, 0, 0]} 
                                            maxBarSize={50} 
                                        />
                                    )}

                                    {metric === 'customers' && (
                                        <>
                                            <Bar 
                                                dataKey="oldCustomers" 
                                                stackId="a" 
                                                name="Khách hàng cũ" 
                                                fill="#4e73df" 
                                                maxBarSize={40} 
                                            />
                                            <Bar 
                                                dataKey="newCustomers" 
                                                stackId="a" 
                                                name="Khách hàng mới" 
                                                fill="#1cc88a" 
                                                radius={[4, 4, 0, 0]} 
                                                maxBarSize={40} 
                                            />
                                        </>
                                    )}
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Statistic;