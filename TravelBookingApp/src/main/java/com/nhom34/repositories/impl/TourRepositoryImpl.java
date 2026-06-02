package com.nhom34.repositories.impl;

import com.nhom34.pojo.Services;
import com.nhom34.pojo.TourServices;
import com.nhom34.repositories.TourRepository;
import java.util.List;
import java.util.Map;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.CriteriaUpdate;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
@PropertySource("classpath:configs.properties")
@Transactional
public class TourRepositoryImpl implements TourRepository {
    @Autowired
    private Environment env;
    @Autowired
    private LocalSessionFactoryBean factory;
    
    @Override
    public List<TourServices> getDetailServices(Map<String, String> params) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b= s.getCriteriaBuilder();
        CriteriaQuery<TourServices> q = b.createQuery(TourServices.class);
        Root root = q.from(TourServices.class);
        
        Join<TourServices, Services> services = root.join("services");
        q.select(root);
        
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(b.equal(services.get("status"), true));
        predicates.add(b.greaterThan(services.get("availableSlots"), 0));
        
        List<Order> orders = new ArrayList<>();
        if(params != null){
            String destination = params.get("destination");
            if (destination != null && !destination.isEmpty()) {
                predicates.add(b.like(services.get("destination"), "%" + destination + "%"));
            }
            
            String departureDateStr = params.get("departureTime");
            if (departureDateStr != null && !departureDateStr.isEmpty()) {
                try {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    Date parsedDate = sdf.parse(departureDateStr);

                    Calendar calStart = Calendar.getInstance();
                    calStart.setTime(parsedDate);
                    calStart.set(Calendar.HOUR_OF_DAY, 0);
                    calStart.set(Calendar.MINUTE, 0);
                    calStart.set(Calendar.SECOND, 0);

                    Calendar calEnd = Calendar.getInstance();
                    calEnd.setTime(parsedDate);
                    calEnd.set(Calendar.HOUR_OF_DAY, 23);
                    calEnd.set(Calendar.MINUTE, 59);
                    calEnd.set(Calendar.SECOND, 59);

                    predicates.add(b.between(root.get("departureTime"), calStart.getTime(), calEnd.getTime()));

                } catch (ParseException e) {
                    System.out.println("Lỗi ngày khởi hành: " + e.getMessage());
                }
            }
            
            String slot = params.get("slot");
            if(slot !=null && !slot.isEmpty()){
                if(slot.equals("asc")){orders.add(b.asc(root.get("services").get("availableSlots")));}
                if (slot.equals("desc")) {
                    orders.add(b.desc(root.get("services").get("availableSlots")));
                }
            }
            String price = params.get("price");
            if(price!=null &&!price.isEmpty()){
                if(price.equals("asc")){orders.add(b.asc(root.get("services").get("price"))); }
                if (price.equals("desc"))
                {
                    orders.add(b.desc(root.get("services").get("price")));
                }
            }
        }
        
        q.where(predicates.toArray(new Predicate[0]));
        
        if(!orders.isEmpty()) q.orderBy(orders);
        
        Query query = s.createQuery(q);
        if (params != null) {
            int page = Integer.parseInt(params.getOrDefault("page", "1"));
            
            int pageSize = this.env.getProperty("service.pageSize", Integer.class);
            
            int start = (page - 1) * pageSize;

            query.setMaxResults(pageSize);
            query.setFirstResult(start);
        }
        return query.getResultList();
    }
    
    @Override
    public TourServices getDetailServiceById(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(TourServices.class, id);
    }   

    @Override
    public TourServices addDetailService(TourServices tour) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(tour);
        
        return tour;
    }

    @Override
    public TourServices updatePartial(Map<String, String> params, Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        TourServices serv = this.getDetailServiceById(id);
        
        if(params.containsKey("price")){
            serv.getServices().setPrice(Double.parseDouble(params.get("price")));
        }
        if(params.containsKey("slots")){
            int preSlots = serv.getServices().getSlots();
            int afterSlots = Integer.parseInt(params.get("slots"));
            int addSlots = afterSlots-preSlots;
            int availableSlots = serv.getServices().getAvailableSlots();
            if(addSlots>0)
                serv.getServices().setSlots(afterSlots);
                serv.getServices().setAvailableSlots(availableSlots+addSlots);
        }
        if(params.containsKey("description")){
            serv.getServices().setDescription(params.get("description"));
        }
        if(params.containsKey("departureTime")){
            long newTimeInMillis = Long.parseLong(params.get("departureTime"));
            Date oldDepartureTime = serv.getDepartureTime();
            if (newTimeInMillis > System.currentTimeMillis() && newTimeInMillis > oldDepartureTime.getTime()) {
                serv.setDepartureTime(new Timestamp(newTimeInMillis));
            }
        }
        s.merge(serv);
        return serv;
    }

    @Override
    public void autoUpdateStatusByCheckDate() {
        try {
            Session s = this.factory.getObject().getCurrentSession();
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.HOUR, 12);
            Date closingDate = cal.getTime();
            

            CriteriaBuilder cb = s.getCriteriaBuilder();
            CriteriaUpdate<Services> update = cb.createCriteriaUpdate(Services.class);
            Root root = update.from(Services.class);
            update.set(root.get("status"), false);
            update.set(root.get("updatedAt"), new Date());

            Subquery<Long> subquery = update.subquery(Long.class);
            Root<TourServices> tourRoot = subquery.from(TourServices.class);
            subquery.select(tourRoot.get("services").get("id")); 
            subquery.where(cb.lessThanOrEqualTo(tourRoot.get("departureTime"), closingDate));

            update.where(
                cb.and(root.get("id").in(subquery),cb.equal(root.get("status"), true))
            );

            int rowCount = s.createMutationQuery(update).executeUpdate();

            System.out.println("Đã cập nhật thành công " + rowCount + " Tour Services.");

        } catch (Exception e) {
            System.out.println("Xảy ra lỗi khi chạy Auto Update TourServices: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
