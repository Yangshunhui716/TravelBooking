package com.nhom34.repositories;

import com.nhom34.pojo.Reviews;
import java.util.List;

public interface ReviewRepository {
    List<Reviews> getReviewsByServiceId(Long serviceId);
    Reviews addReview(Reviews review);
    Reviews updateReview(Reviews review);
    Reviews getReviewById(Long id);
    Double getAverageRatingByServiceId(Long serviceId);
}
