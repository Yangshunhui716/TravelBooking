package com.nhom34.controllers;

import com.nhom34.dto.ProviderStatistic;
import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.TourServices;
import com.nhom34.pojo.TransportServices;
import com.nhom34.pojo.Users;
import com.nhom34.services.BookingService;
import com.nhom34.services.ProviderService;
import com.nhom34.services.TourService;
import com.nhom34.services.TransportService;
import com.nhom34.services.HotelService;
import com.nhom34.services.ServiceService;
import com.nhom34.services.StatisticService;
import com.nhom34.services.UserService;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/secure/provider")
@CrossOrigin
public class ApiProviderController {
    @Autowired
    private ServiceService servService;
    @Autowired
    private ProviderService provService;
    @Autowired
    private TourService tourService;
    @Autowired
    private TransportService transportService;
    @Autowired
    private HotelService hotelRoomService;
    @Autowired
    private UserService userService;
    @Autowired
    private BookingService bookingService;
    @Autowired
    private StatisticService statisticService;
    
    @GetMapping("/tour-services")
    public ResponseEntity<List<TourServices>> getTourServices(Principal principal) {
        Users user = this.userService.getUserByUsername(principal.getName());
        return new ResponseEntity<>(this.provService.getTourServices(user.getId()),HttpStatus.OK);
    }
    
    @GetMapping("/transport-services")
    public ResponseEntity<List<TransportServices>> getTransportServices(Principal principal) {
        Users user = this.userService.getUserByUsername(principal.getName());
        return new ResponseEntity<>(this.provService.getTransportServices(user.getId()),HttpStatus.OK);
    } 
    
    @GetMapping("/hotel-room-services")
    public ResponseEntity<List<HotelRoomServices>> getHotelRoomServices(Principal principal) {
        Users user = this.userService.getUserByUsername(principal.getName());
        return new ResponseEntity<>(this.provService.getHotelRoomServices(user.getId()),HttpStatus.OK);
    }
    
    @PostMapping("/tour-services")
    public ResponseEntity<?> addTourService(@RequestBody Map<String, String> info, Principal principal) {
        Providers provider = this.provService.getProvByUsername(principal.getName());
        if(!provider.getUsers().getIsActive()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nhà cung cấp chưa được phê duyệt để đăng tải dịch vụ");
        }
        return new ResponseEntity<>(this.tourService.addDetailService(info, provider),HttpStatus.CREATED);
    }
    
    @PostMapping("/transport-services")
    public ResponseEntity<?> addTransportService(@RequestBody Map<String, String> info, Principal principal) {
        Providers provider = this.provService.getProvByUsername(principal.getName());
        if(!provider.getUsers().getIsActive()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nhà cung cấp chưa được phê duyệt để đăng tải dịch vụ");
        }
        return new ResponseEntity<>(this.transportService.addDetailService(info, provider),HttpStatus.CREATED);
    } 
    
    @PostMapping("/hotel-room-services")
    public ResponseEntity<?> addHotelRoomService(@RequestBody Map<String, String> info, Principal principal) {
        Providers provider = this.provService.getProvByUsername(principal.getName());
        if(!provider.getUsers().getIsActive()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nhà cung cấp chưa được phê duyệt để đăng tải dịch vụ");
        }
        return new ResponseEntity<>(this.hotelRoomService.addDetailService(info, provider),HttpStatus.CREATED);
    }
    
    @PatchMapping("/tour-services/{serviceId}")
    public ResponseEntity<?> updateTourService(@PathVariable(value = "serviceId") Long servId, @RequestBody Map<String, String> params,
            Principal principal){
        if (params==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không tồn tại các giá trị và tham số yêu cầu cập nhật");
        }
        Providers provider = this.provService.getProvByUsername(principal.getName());
        if(!provider.getUsers().getIsActive()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nhà cung cấp chưa được phê duyệt để đăng tải dịch vụ");
        }
        if(this.servService.checkOwner(provider.getId(),servId)){
            return new ResponseEntity<>(this.tourService.updatePartial(params, servId),HttpStatus.OK);
        }else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Dịch vụ không thuộc nhà cung cấp");
        }
    }
    
    @PatchMapping("/transport-services/{serviceId}")
    public ResponseEntity<?> updateTransportService(@PathVariable(value = "serviceId") Long servId, @RequestBody Map<String, String> params,
            Principal principal){
        if (params==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không tồn tại các giá trị và tham số yêu cầu cập nhật");
        }
        Providers provider = this.provService.getProvByUsername(principal.getName());
        if(!provider.getUsers().getIsActive()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nhà cung cấp chưa được phê duyệt để đăng tải dịch vụ");
        }
        if(this.servService.checkOwner(provider.getId(),servId)){
            return new ResponseEntity<>(this.transportService.updatePartial(params, servId),HttpStatus.OK);
        }else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Dịch vụ không thuộc nhà cung cấp");
        }
    }
    
    @PatchMapping("/hotel-room-services/{serviceId}")
    public ResponseEntity<?> updateHotelRoomService(@PathVariable(value = "serviceId") Long servId, @RequestBody Map<String, String> params,
            Principal principal){
        if (params==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không tồn tại các giá trị và tham số yêu cầu cập nhật");
        }
        Providers provider = this.provService.getProvByUsername(principal.getName());
        if(!provider.getUsers().getIsActive()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nhà cung cấp chưa được phê duyệt để đăng tải dịch vụ");
        }
        if(this.servService.checkOwner(provider.getId(),servId)){
            return new ResponseEntity<>(this.hotelRoomService.updatePartial(params, servId),HttpStatus.OK);
        }else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Dịch vụ không thuộc nhà cung cấp");
        }
    }
    
    @GetMapping("/services/{serviceId}/customers")
    public ResponseEntity<?> getServiceCustomer(@PathVariable(value = "serviceId") Long servId ,Principal principal){
        Providers provider = this.provService.getProvByUsername(principal.getName());
        if(this.servService.checkOwner(provider.getId(),servId)){
            return new ResponseEntity<>(this.bookingService.getCustomerByServiceId(servId),HttpStatus.OK);
        }else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Dịch vụ không thuộc nhà cung cấp");
        }
    }
    
    @PatchMapping("/services/{serviceId}/image")
    public void updateImage(@PathVariable(value = "serviceId") Long servId ,@RequestParam(value = "img") MultipartFile img, Principal principal){
        Providers provider = this.provService.getProvByUsername(principal.getName());
        if(this.servService.checkOwner(provider.getId(),servId)){
            this.servService.updateImg(img, servId);
        }
    }
    
    @GetMapping("/profile")
    public ResponseEntity<Providers> getProfile(Principal principal) {
        Providers provider = this.provService.getProvByUsername(principal.getName());
        return new ResponseEntity<>(provider, HttpStatus.OK);
    }
    
    @PatchMapping("/profile")
    public ResponseEntity<Providers> updateProfile(@RequestBody Map<String, String> params, Principal principal) {
        Users user = this.userService.getUserByUsername(principal.getName());
        Providers provider = this.provService.updateProfile(params, user.getId());
        return new ResponseEntity<>(provider, HttpStatus.OK);
    }
    
    @GetMapping("/statistic/{metric}")
    public ResponseEntity<List<ProviderStatistic>> getStatistic(@PathVariable(value = "metric") String metric, @RequestParam Map<String, String> params, Principal principal){
        Providers provider = this.provService.getProvByUsername(principal.getName());
        return new ResponseEntity<>(this.statisticService.providerStatistic(params, provider, metric), HttpStatus.OK);
    }
}
