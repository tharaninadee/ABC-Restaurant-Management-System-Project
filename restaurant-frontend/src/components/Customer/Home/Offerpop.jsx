// src/components/OfferPopup.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './Home.css'; // Optional for custom styling

Modal.setAppElement('#root'); // Accessibility improvement

const OfferPopup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    // Fetch the offer when the component mounts
    const fetchOffer = async () => {
      try {
        const response = await axios.get('/api/offers'); // Assuming single offer
        const offer = response.data[0];
        setImage(offer.imagePath);
      } catch (error) {
        console.error('Error fetching offer:', error);
      }
    };

    fetchOffer();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <button onClick={openModal} className="view-offer-btn">View Offer</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="offer-modal"
        overlayClassName="offer-overlay"
      >
        <button onClick={closeModal} className="close-btn">✖</button>
        <div className="modal-content">
          <img src={image} alt="Offer" className="offer-image" />
        </div>
      </Modal>
    </>
  );
};

export default OfferPopup;
