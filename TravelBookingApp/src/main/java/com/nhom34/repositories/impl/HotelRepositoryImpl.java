package com.nhom34.repositories.impl;

import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Reviews;
import com.nhom34.repositories.HotelRepository;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import java.util.ArrayList;
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

        // JOIN NHẸ: chỉ service (KHÔNG join reviews)
        Join services = root.join("services");

        q.select(root);

        List<Order> orders = new ArrayList<>();

        if (params != null) {
            String price = params.get("price");
            if (price != null && !price.isEmpty()) {
                if (price.equals("asc")) {
                    orders.add(b.asc(services.get("price")));
                } else {
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
                } else {
                    orders.add(b.desc(sub));
                }
            }
        }

        if (!orders.isEmpty()) {
            q.orderBy(orders);
        }

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
        
        if(params.containsKey("name")){
            serv.getServices().setName(params.get("name"));
        }
        if(params.containsKey("price")){
            serv.getServices().setPrice(Double.parseDouble(params.get("price")));
        }
        if(params.containsKey("destination")){
            serv.getServices().setDestination(params.get("destination"));
        }
        if(params.containsKey("slot")){
            serv.getServices().setAvailableSlots(Integer.parseInt(params.get("slot")));
        }
        if(params.containsKey("description")){
            serv.getServices().setDescription(params.get("description"));
        }
        if(params.containsKey("hotelName")){
            serv.setHotelName(params.get("hotelName"));
        }
        if(params.containsKey("address")){
            serv.setAddress(params.get("address"));
        }
        
        s.merge(serv);
        return serv;
    }
}