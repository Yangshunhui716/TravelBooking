import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminStatsController {

    @GetMapping("/stats")
    public String getStatistics(Model model) {
        // Giả lập dữ liệu tương đương với Flask trả về
        // Trong thực tế, bạn sẽ gọi từ Service: statsService.getRevenueByProduct()
        List<Object[]> revenueProducts = List.of(
            new Object[]{1, "Tour Đà Nẵng", 5000000},
            new Object[]{2, "Khách sạn Rex", 12000000}
        );

        List<Object[]> revenueTimes = List.of(
            new Object[]{5, 17000000}, // Tháng 5
            new Object[]{6, 25000000}  // Tháng 6
        );

        // Đẩy dữ liệu sang giao diện Thymeleaf
        model.addAttribute("revenueProducts", revenueProducts);
        model.addAttribute("revenueTimes", revenueTimes);

        return "stats"; // Trả về file stats.html trong thư mục templates/admin/
    }
}