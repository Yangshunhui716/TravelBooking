package com.nhom34.services.impl;

import com.nhom34.pojo.Bookings;
import com.nhom34.pojo.BookingsServiceDetail;
import com.nhom34.pojo.Customers;
import com.nhom34.dto.RequestOrder;
import com.nhom34.dto.OrderServices;
import com.nhom34.repositories.BookingRepository;
import com.nhom34.services.BookingService;
import com.nhom34.services.ServiceService;
import com.nhom34.services.TransferTransactionService;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class BookingServiceImpl implements BookingService{
    @Autowired
    private BookingRepository bookingRepo;
    @Autowired
    private TransferTransactionService ttService;
    @Autowired
    private ServiceService serviceService;

    @Override
    @Transactional
    public Bookings addBooking(RequestOrder requestPayload, Customers customer) {
        List<OrderServices> bookingDetails = requestPayload.getBooking();
        List<BookingsServiceDetail> booking = new ArrayList<>();
        double total = 0;
        for(OrderServices o: bookingDetails){
            if(this.serviceService.updateAvailableSlots(o.getQuantity(), o.getId())){
                BookingsServiceDetail detail = new BookingsServiceDetail();
                detail.setServiceId(this.serviceService.getServiceById(o.getId()));
                detail.setQuantity(o.getQuantity());
                detail.setUnitPrice(o.getUnitPrice());
                detail.setSubtotal(o.getUnitPrice()*o.getQuantity()*o.getServiceDuration());
                detail.setServiceStartDate(o.getServiceStartDate());
                detail.setServiceDuration(o.getServiceDuration());
                total += detail.getSubtotal();

                booking.add(detail);
            }
            else{
                throw new IllegalStateException("Số slot của dịch vụ có ID " + o.getId() + " không đủ đáp ứng yêu cầu"); 
            }
        }
        
        Bookings newBooking = new Bookings();
        newBooking.setBookingStatus("PENDING");
        newBooking.setPaymentStatus("UNPAID");
        newBooking.setPaymentMethod(requestPayload.getPayMethod());
        newBooking.setTotalAmount(total);
        newBooking.setCreatedAt(new Date());
        newBooking.setUpdatedAt(new Date());
        newBooking.setCustomerId(customer);
        newBooking = this.bookingRepo.addBooking(newBooking);
        
        this.bookingRepo.addBookingDetails(booking, newBooking);
        
        return newBooking;
    }

    @Override
    public List<Bookings> getBookingsByCustomerId(Long customerId) {
        return this.bookingRepo.getBookingsByCustomerId(customerId);
    }

    @Override
    public Bookings getBookingById(Long id) {
        return this.bookingRepo.getBookingById(id);
    }

    @Override
    @Transactional
    public void changePaymentStatus(Long id, String paymentStatus) {
        this.bookingRepo.changePaymentStatus(id, paymentStatus);
    }

    @Override
    @Transactional
    public void changeBookingStatus(Long id, String bookingStatus) {
        this.bookingRepo.changeBookingStatus(id, bookingStatus);
    }
    
    @Override
    @Transactional
    public void changeBookingPayMethod(Long id, String payMethod) {
        this.bookingRepo.changeBookingPayMethod(id, payMethod);
    }

    @Override
    @Transactional
    public void bookingPaySuccess(String transactionCode, Long id) {
        this.ttService.addTransferTransaction(transactionCode, "SUCCESS", id);
        this.bookingRepo.changePaymentStatus(id, "PAID");
        this.bookingRepo.changeBookingStatus(id, "CONFIRM");
    }

    @Override
    public List<Object[]> getCustomerByServiceId(Long serviceId) {
        return this.bookingRepo.getCustomerByServiceId(serviceId);
    }
    
    @Override
    public boolean checkCustomerPaidService(Long customerId, Long serviceId) {
        return this.bookingRepo.checkCustomerPaidService(customerId, serviceId);
    }
    
}
