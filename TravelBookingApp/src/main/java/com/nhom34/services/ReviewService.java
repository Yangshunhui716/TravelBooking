package com.nhom34.services;

import com.nhom34.pojo.Reviews;
import java.util.List;



public interface ReviewService {
    List<Reviews> getReviewsByServiceId(Long serviceId);
    Reviews addReview(Reviews review);
    Reviews updateReview(Reviews review);
    Reviews getReviewById(Long id);
}
