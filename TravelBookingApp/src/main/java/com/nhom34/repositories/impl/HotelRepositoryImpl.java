package com.nhom34.repositories.impl;

import com.nhom34.pojo.BookingsServiceDetail;
import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Services;
import com.nhom34.repositories.HotelRepository;
import jakarta.persistence.Query;
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
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@PropertySource("classpath:configs.properties")
@Transactional
public class HotelRepositoryImpl implements HotelRepository {
    @Autowired
    private Environment env;
    @Autowired
    private LocalSessionFactoryBean factory;
    
    @Override
    public List<HotelRoomServices> getDetailServices(Map<String, String> params) {
        Session s = factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<HotelRoomServices> q = b.createQuery(HotelRoomServices.class);
        Root<HotelRoomServices> root = q.from(HotelRoomServices.class);

        Join<HotelRoomServices, Services> services = root.join("services");
        q.select(root);
        
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(b.equal(services.get("status"), true));

        List<Order> orders = new ArrayList<>();
        orders.add(b.desc(services.get("createdAt")));

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
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                if (startDateStr != null && !startDateStr.isEmpty()) {
                    startDate = sdf.parse(startDateStr);
                }else{
                    startDate = new Date();
                }
                if(endDateStr != null && !endDateStr.isEmpty()){
                    Date temp = sdf.parse(endDateStr);
                    if (startDate.after(temp)) {
                        endDate = startDate;
                        startDate = temp;
                    }else{
                        endDate = temp;
                    }
                }
                else{
                    Calendar cal = Calendar.getInstance();
                    cal.setTime(startDate);
                    cal.add(Calendar.DAY_OF_MONTH, 1);
                    endDate = cal.getTime();
                }
                
                Subquery<Long> bookedSub = q.subquery(Long.class);
                Root<BookingsServiceDetail> bDetail = bookedSub.from(BookingsServiceDetail.class);
      
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
                } 
                if (price.equals("desc")){
                    orders.add(b.desc(services.get("price")));
                }
            }

            String rate = params.get("rate");
            if (rate != null && !rate.isEmpty()) {
                if (rate.equals("asc")) {
                    orders.add(b.asc(root.get("rate")));
                } 
                if (rate.equals("desc")) {
                    orders.add(b.desc(root.get("rate")));
                }
            }
        }
        
        q.where(predicates.toArray(new Predicate[0]));

        if (!orders.isEmpty()) q.orderBy(orders);
        Query query = s.createQuery(q);
        
        if (params != null) {
            int page = Integer.parseInt(params.getOrDefault("page", "1"));
            if(page<=0) page=1;
            int pageSize = this.env.getProperty("service.pageSize", Integer.class);
            
            int start = (page - 1) * pageSize;

            query.setMaxResults(pageSize);
            query.setFirstResult(start);
        }
        return query.getResultList();
    }
    
    @Override
    public HotelRoomServices getDetailServiceById(Long id) {
       Session s = this.factory.getObject().getCurrentSession();
       return s.get(HotelRoomServices.class, id);
    }

    @Override
    public HotelRoomServices addDetailService(HotelRoomServices hotelRoom) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(hotelRoom);
        
        return hotelRoom;
    }

    @Override
    public HotelRoomServices updatePartial(HotelRoomServices serv) {
        Session s = this.factory.getObject().getCurrentSession();
        s.merge(serv);
        return serv;
    }
    
    @Override
    public int getAvailableSlots(Long id, Date startDate, Date endDate){
        if(this.getDetailServiceById(id)==null) return -1;
        
        Session s = this.factory.getObject().getCurrentSession();
        int totalSlots = this.getDetailServiceById(id).getServices().getSlots();
        
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Long> sumQuery = b.createQuery(Long.class);
        Root<BookingsServiceDetail> bDetail = sumQuery.from(BookingsServiceDetail.class);

        Expression<Date> bookingEndDate = b.function("ADDDATE", Date.class, 
                                                      bDetail.get("serviceStartDate"), 
                                                      bDetail.get("serviceDuration"));

        Predicate startOverlap = b.lessThan(bDetail.get("serviceStartDate"), endDate);
        Predicate endOverlap = b.greaterThan(bookingEndDate, startDate);
        Predicate sameService = b.equal(bDetail.get("serviceId").get("id"), id);

        sumQuery.select(b.sumAsLong(bDetail.get("quantity")));
        sumQuery.where(b.and(sameService, startOverlap, endOverlap));

        Long bookedSlots = s.createQuery(sumQuery).uniqueResult();
        int booked = (bookedSlots != null) ? bookedSlots.intValue() : 0;

        return totalSlots - booked;
    }

    @Override
    public void delete(HotelRoomServices serv) {
        Session s = this.factory.getObject().getCurrentSession();
        s.remove(serv);
    }

}