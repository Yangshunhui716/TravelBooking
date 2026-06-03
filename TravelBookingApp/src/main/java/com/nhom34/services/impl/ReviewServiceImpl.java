package com.nhom34.services.impl;

import com.nhom34.pojo.Reviews;
import com.nhom34.repositories.ReviewRepository;
import com.nhom34.services.ReviewService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepo;
    
    @Override
    public List<Reviews> getReviewsByServiceId(Long serviceId) {
        return this.reviewRepo.getReviewsByServiceId(serviceId);
    }
    
    @Override
    public Reviews addReview(Reviews review) {
        return this.reviewRepo.addReview(review);
    }
    
    @Override
    public Reviews updateReview(Reviews review) {
        return this.reviewRepo.updateReview(review);
    }

    @Override
    public Reviews getReviewById(Long id) {
        return this.reviewRepo.getReviewById(id);
    }
}