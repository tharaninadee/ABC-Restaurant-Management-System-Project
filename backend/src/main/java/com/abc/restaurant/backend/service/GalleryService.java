package com.abc.restaurant.backend.service;

import com.abc.restaurant.backend.model.Gallery;
import com.abc.restaurant.backend.repository.GalleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;

    public List<Gallery> getAllGalleries() {
        return galleryRepository.findAll();
    }

    public Optional<Gallery> getGalleryById(String id) {
        return galleryRepository.findById(id);
    }

    public Gallery addGallery(Gallery gallery) {
        return galleryRepository.save(gallery);
    }

    public Gallery updateGallery(String id, Gallery galleryDetails) {
        if (galleryRepository.existsById(id)) {
            galleryDetails.setId(id);
            return galleryRepository.save(galleryDetails);
        } else {
            return null;
        }
    }

    public void deleteGallery(String id) {
        galleryRepository.deleteById(id);
    }
}
