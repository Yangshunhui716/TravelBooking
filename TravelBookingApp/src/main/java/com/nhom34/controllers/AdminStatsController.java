package com.nhom34.controllers;

import com.nhom34.services.StatisticService;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/admin")
public class AdminStatsController {
    @Autowired
    private StatisticService statisticService;

    @GetMapping("/stats")
    public String getStatistics(Model model,
                                @RequestParam(value = "filterType", defaultValue = "YEAR") String filterType,
                                @RequestParam(value = "year", required = false) Integer year,
                                @RequestParam(value = "month", required = false) Integer month) {
        if (year == null) {
            year = java.time.Year.now().getValue(); 
        }
        if (month == null) {
            month = java.time.LocalDate.now().getMonthValue(); // Tự động lấy tháng hiện tại nếu rỗng
        }

        // Gọi nghiệp vụ thông qua Tầng Service
        Map<String, Long> serviceStats = this.statisticService.countActiveServices();
        List<Object[]> revenueTimes = this.statisticService.getRevenueByTime(filterType, year, month);
        List<Object[]> topServices = this.statisticService.getTop5Services();

        // --- TÍNH TỔNG SỐ LƯỢNG DỊCH VỤ (MỤC 1) ---
        long totalServices = 0;
        if (serviceStats != null) {
            long tourCount = serviceStats.getOrDefault("Tour", 0L);
            long hotelCount = serviceStats.getOrDefault("Hotel", 0L);
            long transportCount = serviceStats.getOrDefault("Transport", 0L);
            totalServices = tourCount + hotelCount + transportCount;
        }

        // --- TÍNH TỔNG LƯỢT ĐẶT VÀ DOANH THU (MỤC 2) ---
        long totalBookings = 0;
        double totalRevenue = 0.0;

        if (revenueTimes != null) {
            for (Object[] row : revenueTimes) {
                // Cộng thẳng trực tiếp bằng cách ép về kiểu dữ liệu bạn muốn
                totalBookings += (Long) row[1];
                totalRevenue += (Double) row[2];
            }
        }

        // Gắn dữ liệu chuyển giao sang View
        model.addAttribute("serviceStats", serviceStats);
        model.addAttribute("revenueTimes", revenueTimes);
        model.addAttribute("topServices", topServices);
        model.addAttribute("selectedFilter", filterType);
        model.addAttribute("selectedYear", year);
        model.addAttribute("selectedMonth", month);
        
        // Gắn thêm các giá trị tổng cộng mới tính toán được
        model.addAttribute("totalServices", totalServices);
        model.addAttribute("totalBookings", totalBookings);
        model.addAttribute("totalRevenue", totalRevenue);

        return "stats";
    }
}