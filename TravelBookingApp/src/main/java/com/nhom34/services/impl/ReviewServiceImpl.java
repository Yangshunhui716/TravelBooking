package com.nhom34.services.impl;

import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Reviews;
import com.nhom34.repositories.ReviewRepository;
import com.nhom34.services.HotelService;
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
    @Autowired
    private HotelService hotelService;
    
    @Override
    public List<Reviews> getReviewsByServiceId(Long serviceId) {
        return this.reviewRepo.getReviewsByServiceId(serviceId);
    }
    
    @Override
    public Reviews addReview(Reviews review) {
        Reviews savedReview = reviewRepo.addReview(review);
    
        if (savedReview.getServiceId() != null) {
            Long serviceId = savedReview.getServiceId().getId();
            HotelRoomServices hotel = hotelService.getDetailServiceById(serviceId);

            if (hotel != null) {
                Double avgRating = reviewRepo.getAverageRatingByServiceId(serviceId);
                double roundedRate = Math.round(avgRating * 10.0) / 10.0;
                hotel.setRate(roundedRate);
                hotelService.updateHotelRate(hotel);
            }
        }

        return savedReview;
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