package com.nhom34.repositories.impl;

import com.nhom34.pojo.BookingsServiceDetail;
import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Reviews;
import com.nhom34.pojo.Services;
import com.nhom34.repositories.HotelRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class HotelRepositoryImpl implements HotelRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    
    @Override
    public List<HotelRoomServices> getHotelRoomServices(Map<String, String> params) {
        Session s = factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<HotelRoomServices> q = b.createQuery(HotelRoomServices.class);
        Root<HotelRoomServices> root = q.from(HotelRoomServices.class);

        Join<HotelRoomServices, Services> services = root.join("services");
        q.select(root);
        
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(b.equal(services.get("status"), true));

        List<Order> orders = new ArrayList<>();

        if (params != null) {
            String destination = params.get("destination");
            if (destination != null && !destination.isEmpty()) {
                predicates.add(b.like(services.get("destination"), "%" + destination + "%"));
            }
            
            String startDateStr = params.get("startDate");
            String endDateStr = params.get("endDate");
            try {
                Date startDate = null;
                Date endDate = null;
                if (startDateStr != null && !startDateStr.isEmpty() && endDateStr != null && !endDateStr.isEmpty()) {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    startDate = sdf.parse(startDateStr);
                    endDate = sdf.parse(endDateStr);
                }else{
                    startDate = new Date();
                    Calendar cal = Calendar.getInstance();
                    cal.add(Calendar.DAY_OF_MONTH, 1);
                    endDate = cal.getTime();
                }
                
                Subquery<Long> bookedSub = q.subquery(Long.class);
                Root<BookingsServiceDetail> bDetail = bookedSub.from(BookingsServiceDetail.class);

                // Dùng coalesce để trả về 0 nếu không có booking nào (tránh lỗi null)
                bookedSub.select(b.coalesce(b.sum(bDetail.get("quantity")), 0L));
                Expression<Date> bookingEndDate = b.function("ADDDATE", Date.class, 
                                                              bDetail.get("serviceStartDate"), 
                                                              bDetail.get("serviceDuration"));
                Predicate startOverlap = b.lessThan(bDetail.get("serviceStartDate"), endDate);
                Predicate endOverlap = b.greaterThan(bookingEndDate, startDate);
                Predicate sameService = b.equal(bDetail.get("serviceId").get("id"), services.get("id"));

                bookedSub.where(b.and(sameService, startOverlap, endOverlap));
                Expression<Integer> bookedSlots = bookedSub.as(Integer.class);
                predicates.add(b.greaterThan(services.get("slots"), bookedSlots));

            } catch (ParseException e) {
                System.out.println("Lỗi ngày nhận // trả phòng: " + e.getMessage());
            }
            
            String price = params.get("price");
            if (price != null && !price.isEmpty()) {
                if (price.equals("asc")) {
                    orders.add(b.asc(services.get("price")));
                } if (price.equals("desc")){
                    orders.add(b.desc(services.get("price")));
                }
            }

            String rate = params.get("rate");
            if (rate != null && !rate.isEmpty()) {

                Subquery<Double> sub = q.subquery(Double.class);
                Root<Reviews> r = sub.from(Reviews.class);

                sub.select(b.avg(r.get("rating")));
                sub.where(
                    b.equal(r.get("serviceId").get("id"), services.get("id"))
                );

                if (rate.equals("asc")) {
                    orders.add(b.asc(sub));
                } if (rate.equals("desc")) {
                    orders.add(b.desc(sub));
                }
            }
        }
        
        q.where(predicates.toArray(new Predicate[0]));

        if (!orders.isEmpty()) q.orderBy(orders);

        return s.createQuery(q).getResultList();
    }
    
    @Override
    public HotelRoomServices getHotelRoomServiceById(Long id) {
       Session s = this.factory.getObject().getCurrentSession();
        return s.get(HotelRoomServices.class, id);
    }

    @Override
    public HotelRoomServices addHotelRoomService(HotelRoomServices hotelRoom) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(hotelRoom);
        
        return hotelRoom;
    }

    @Override
    public HotelRoomServices updatePartial(Map<String, String> params, Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        HotelRoomServices serv = this.getHotelRoomServiceById(id);
        
        if(params.containsKey("price")){
            serv.getServices().setPrice(Double.parseDouble(params.get("price")));
        }
        if(params.containsKey("slot")){
            serv.getServices().setAvailableSlots(Integer.parseInt(params.get("slot")));
        }
        if(params.containsKey("description")){
            serv.getServices().setDescription(params.get("description"));
        }
        
        s.merge(serv);
        return serv;
    }
}