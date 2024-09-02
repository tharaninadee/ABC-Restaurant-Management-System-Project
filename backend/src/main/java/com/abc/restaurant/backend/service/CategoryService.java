package com.abc.restaurant.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abc.restaurant.backend.model.Category;
import com.abc.restaurant.backend.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Create or Update Category
    public Category saveCategory(Category category) {
        // Ensure that all necessary fields are set
        if (category.getName() == null || category.getDescription() == null) {
            throw new IllegalArgumentException("Name and description are required");
        }
        return categoryRepository.save(category);
    }

    // Get All Categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Get Category by ID
    public Optional<Category> getCategoryById(String id) {
        return categoryRepository.findById(id);
    }

    // Delete Category by ID
    public void deleteCategory(String id) {
        if (!categoryRepository.existsById(id)) {
            throw new IllegalArgumentException("Category with ID " + id + " does not exist");
        }
        categoryRepository.deleteById(id);
    }
}
