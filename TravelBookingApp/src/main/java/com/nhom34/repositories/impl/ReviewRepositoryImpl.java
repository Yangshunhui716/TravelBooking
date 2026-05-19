/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories.impl;

import com.nhom34.pojo.Reviews;
import com.nhom34.repositories.ReviewRepository;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author QUANG AN
 */
@Repository
@Transactional
public class ReviewRepositoryImpl implements ReviewRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public List<Reviews> getReviewsByServiceId(Long serviceId) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Reviews> q = b.createQuery(Reviews.class);
        Root<Reviews> root = q.from(Reviews.class);
        q.select(root);
        //Predicate loc dieu kien nhu where
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(b.equal(root.get("serviceId").get("id"), serviceId));
        q.where(predicates.toArray(Predicate[]::new));

        Query query = s.createQuery(q);
        return query.getResultList();
    }
    @Override
    public Reviews addReview(Reviews review) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(review);
        return review;
    }
    
    @Override
    public Reviews updateReview(Reviews review) {
        Session s = this.factory.getObject().getCurrentSession();
        s.merge(review);
        return review;
    }
    
    @Override
    public Reviews getReviewById(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Reviews.class, id);
    }
}
