package com.abc.restaurant.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abc.restaurant.backend.model.Fooditem;
import com.abc.restaurant.backend.service.FooditemService;

@RestController
@RequestMapping("/api/fooditems")
public class FooditemController {

    @Autowired
    private FooditemService fooditemService;

    @GetMapping
    public ResponseEntity<List<Fooditem>> getAllFooditems() {
        List<Fooditem> fooditems = fooditemService.getAllFooditems();
        return new ResponseEntity<>(fooditems, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fooditem> getFooditemById(@PathVariable String id) {
        Optional<Fooditem> fooditem = fooditemService.getFooditemById(id);
        return fooditem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Fooditem> createFooditem(@RequestBody Fooditem fooditem) {
        Fooditem createdFooditem = fooditemService.createFooditem(fooditem);
        return new ResponseEntity<>(createdFooditem, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fooditem> updateFooditem(@PathVariable String id, @RequestBody Fooditem fooditem) {
        Fooditem updatedFooditem = fooditemService.updateFooditem(id, fooditem);
        return updatedFooditem != null ? new ResponseEntity<>(updatedFooditem, HttpStatus.OK) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFooditem(@PathVariable String id) {
        fooditemService.deleteFooditem(id);
        return ResponseEntity.noContent().build();
    }
}
