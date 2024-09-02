package com.abc.restaurant.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abc.restaurant.backend.model.Fooditem;
import com.abc.restaurant.backend.repository.FooditemRepository;

@Service
public class FooditemService {

    @Autowired
    private FooditemRepository fooditemRepository;

    public List<Fooditem> getAllFooditems() {
        return fooditemRepository.findAll();
    }

    public Optional<Fooditem> getFooditemById(String id) {
        return fooditemRepository.findById(id);
    }

    public Fooditem createFooditem(Fooditem fooditem) {
        fooditem.setCreatedAt(LocalDateTime.now());
        fooditem.setUpdatedAt(LocalDateTime.now());
        return fooditemRepository.save(fooditem);
    }

    public Fooditem updateFooditem(String id, Fooditem fooditem) {
        if (fooditemRepository.existsById(id)) {
            fooditem.setId(id);
            fooditem.setUpdatedAt(LocalDateTime.now());
            return fooditemRepository.save(fooditem);
        }
        return null;
    }

    public void deleteFooditem(String id) {
        fooditemRepository.deleteById(id);
    }
}
