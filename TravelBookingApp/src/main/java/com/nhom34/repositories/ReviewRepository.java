/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nhom34.repositories;

import com.nhom34.pojo.Reviews;
import java.util.List;

/**
 *
 * @author QUANG AN
 */
public interface ReviewRepository {
    List<Reviews> getReviewsByServiceId(Long serviceId);
    Reviews addReview(Reviews review);
    Reviews updateReview(Reviews review);
    Reviews getReviewById(Long id);
}
