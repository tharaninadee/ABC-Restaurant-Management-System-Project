package com.abc.restaurant.backend.service;

import com.abc.restaurant.backend.model.Category;
import com.abc.restaurant.backend.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@SpringBootTest
public class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    private Category category;
    private Category.Item item;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        item = new Category.Item("item1", "Item 1", "001", 10.0, "Description", "image.png");
        category = new Category("cat1", "Category 1", Arrays.asList(item));
    }

    @Test
    public void testGetAllCategories() {
        when(categoryRepository.findAll()).thenReturn(Arrays.asList(category));

        List<Category> categories = categoryService.getAllCategories();

        assertNotNull(categories);
        assertEquals(1, categories.size());
        assertEquals("Category 1", categories.get(0).getName());
    }

    @Test
    public void testGetCategoryById() {
        when(categoryRepository.findById(anyString())).thenReturn(Optional.of(category));

        Optional<Category> result = categoryService.getCategoryById("cat1");

        assertTrue(result.isPresent());
        assertEquals("Category 1", result.get().getName());
    }

    @Test
    public void testAddCategory() {
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        Category result = categoryService.addCategory(category);

        assertNotNull(result);
        assertEquals("Category 1", result.getName());
    }

    @Test
    public void testUpdateCategory() {
        when(categoryRepository.existsById(anyString())).thenReturn(true);
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        Category updatedCategory = new Category("cat1", "Updated Category", Arrays.asList(item));
        Category result = categoryService.updateCategory("cat1", updatedCategory);

        assertNotNull(result);
        assertEquals("Updated Category", result.getName());
    }

    @Test
    public void testUpdateCategoryNotFound() {
        when(categoryRepository.existsById(anyString())).thenReturn(false);

        Category updatedCategory = new Category("cat1", "Updated Category", Arrays.asList(item));
        Category result = categoryService.updateCategory("cat1", updatedCategory);

        assertNull(result);
    }

    @Test
    public void testDeleteCategory() {
        doNothing().when(categoryRepository).deleteById(anyString());

        categoryService.deleteCategory("cat1");

        verify(categoryRepository, times(1)).deleteById("cat1");
    }

    @Test
    public void testAddItemToCategory() {
        when(categoryRepository.findById(anyString())).thenReturn(Optional.of(category));
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        Category.Item newItem = new Category.Item("item2", "Item 2", "002", 15.0, "New Description", "newImage.png");
        Category result = categoryService.addItemToCategory("cat1", newItem);

        assertNotNull(result);
        assertEquals(2, result.getItems().size());
        assertEquals("Item 2", result.getItems().get(1).getName());
    }

    @Test
    public void testUpdateItemInCategory() {
        when(categoryRepository.findById(anyString())).thenReturn(Optional.of(category));
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        Category.Item updatedItem = new Category.Item("item1", "Updated Item 1", "001", 12.0, "Updated Description", "updatedImage.png");
        Category result = categoryService.updateItemInCategory("cat1", "item1", updatedItem);

        assertNotNull(result);
        assertEquals("Updated Item 1", result.getItems().get(0).getName());
    }

    @Test
    public void testUpdateItemInCategoryNotFound() {
        when(categoryRepository.findById(anyString())).thenReturn(Optional.empty());

        Category.Item updatedItem = new Category.Item("item1", "Updated Item 1", "001", 12.0, "Updated Description", "updatedImage.png");

        RuntimeException thrown = assertThrows(RuntimeException.class, () -> {
            categoryService.updateItemInCategory("cat1", "item1", updatedItem);
        });

        assertEquals("Category not found", thrown.getMessage());
    }

    @Test
    public void testDeleteItemFromCategory() {
        when(categoryRepository.findById(anyString())).thenReturn(Optional.of(category));
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        categoryService.deleteItemFromCategory("cat1", "item1");

        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    @Test
    public void testSearchItemsByName() {
        when(categoryRepository.findById(anyString())).thenReturn(Optional.of(category));

        List<Category.Item> items = categoryService.searchItemsByName("cat1", "Item 1");

        assertNotNull(items);
        assertEquals(1, items.size());
        assertEquals("Item 1", items.get(0).getName());
    }

    @Test
    public void testSearchItemsByNameNotFound() {
        when(categoryRepository.findById(anyString())).thenReturn(Optional.empty());

        RuntimeException thrown = assertThrows(RuntimeException.class, () -> {
            categoryService.searchItemsByName("cat1", "Nonexistent Item");
        });

        assertEquals("Category not found", thrown.getMessage());
    }
}
