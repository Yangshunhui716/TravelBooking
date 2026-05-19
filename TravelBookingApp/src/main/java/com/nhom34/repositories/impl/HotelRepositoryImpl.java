package com.nhom34.repositories.impl;

import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.repositories.HotelRepository;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Root;
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
    public List<HotelRoomServices> getHotelRoomServices( Map<String, String> params) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<HotelRoomServices> q =b.createQuery(HotelRoomServices.class);
        Root<HotelRoomServices> root = q.from(HotelRoomServices.class);
        Join reviewJoin = root.join("services").join("reviewsCollection");
        q.select(root);
        List<Order> orders = new ArrayList<>();
        if (params != null) {
            String price = params.get("price");
            if (price != null && !price.isEmpty()) {
                if (price.equals("asc"))orders.add( b.asc(root.get("services").get("price")) );
                else orders.add(b.desc(root.get("services").get("price")));
            }
            String rate = params.get("rate");
            if (rate != null && !rate.isEmpty()) {
                if (rate.equals("asc"))orders.add(b.asc(b.avg(reviewJoin.get("rating"))));
                else orders.add( b.desc(b.avg( reviewJoin.get("rating"))));
            }
        }
        q.groupBy(root.get("id"));
        if (!orders.isEmpty())q.orderBy(orders);
        Query query = s.createQuery(q);
        return query.getResultList();
    }
    
    @Override
    public HotelRoomServices getHotelRoomServiceById(Long id) {
       Session s = this.factory.getObject().getCurrentSession();
        return s.get(HotelRoomServices.class, id);
    }
}