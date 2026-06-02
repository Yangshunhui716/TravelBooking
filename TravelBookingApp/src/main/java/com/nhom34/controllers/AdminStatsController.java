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

    // TUÂN THỦ TUYỆT ĐỐI: Chỉ tiêm và gọi qua tầng Service
    @Autowired
    private StatisticService statisticService;

    @GetMapping("/stats")
    public String getStatistics(Model model,
                                @RequestParam(value = "filterType", defaultValue = "YEAR") String filterType,
                                @RequestParam(value = "year", required = false) Integer year) {
        
        if (year == null) {
            year = Calendar.getInstance().get(Calendar.YEAR);
        }

        // Gọi nghiệp vụ thông qua Tầng Service
        Map<String, Long> serviceStats = this.statisticService.countActiveServices();
        List<Object[]> revenueTimes = this.statisticService.getRevenueByTime(filterType, year);
        List<Object[]> topServices = this.statisticService.getTop5Services();

        // Gắn dữ liệu chuyển giao sang View
        model.addAttribute("serviceStats", serviceStats);
        model.addAttribute("revenueTimes", revenueTimes);
        model.addAttribute("topServices", topServices);
        model.addAttribute("selectedFilter", filterType);
        model.addAttribute("selectedYear", year);

        return "stats";
    }
}