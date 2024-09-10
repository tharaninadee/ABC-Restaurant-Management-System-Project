import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Import the Slider component from react-slick
import 'slick-carousel/slick/slick.css'; // Import the slick carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import the slick carousel theme CSS
import { motion, useAnimation } from 'framer-motion';
import './Home.css'; // Ensure this path is correct

const carouselImages = [
  { id: 1, imageURL: '/src/assets/home1.jpg', title: 'Image 1' },
  { id: 2, imageURL: '/src/assets/home2.jpg', title: 'Image 2' },
  { id: 3, imageURL: '/src/assets/home3.jpg', title: 'Image 3' },
];

const categories = [
  { title: 'Appetizers', image: '/src/assets/Hfood1.jpg' },
  { title: 'Mains', image: '/src/assets/Hfood2.jpg' },
  { title: 'Chinese', image: '/src/assets/Hfood3.jpg' },
  { title: 'Indian', image: '/src/assets/Hfood4.jpg' },
  { title: 'Italian', image: '/src/assets/Hfood5.jpg' },
  { title: 'Desserts', image: '/src/assets/Hfood6.jpg' },
  { title: 'Short Eats', image: '/src/assets/Hfood7.jpg' },
  { title: 'Cakes', image: '/src/assets/Hfood8.jpg' },
];

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000, // Adjust autoplay speed as needed
};

const restaurants = [
  {
    name: "ABC Dine-In",
    image: "/src/assets/rest1.jpg",
    description: "Experience fine dining in the heart of Colombo with our exquisite dishes.",
  },
  {
    name: "Luxe Lounge",
    image: "/src/assets/rest2.jpg",
    description: "Savor the flavors of Sri Lanka with a modern twist in our Kandy branch.",
  },
  {
    name: "Ocean's Delight",
    image: "/src/assets/rest3.jpg",
    description: "Enjoy fresh seafood with a stunning ocean view, a perfect escape for food lovers.",
  },
];


const FAQSection = () => {
  const [visibleFaqIndex, setVisibleFaqIndex] = useState(null);

  const faqs = [
    {
      question: "What is the standard delivery time?",
      answer: "- Standard delivery time may vary depending on the location.",
    },
    {
      question: "How can I cancel an online reservation?",
      answer: "- You must inform the restaurant prior to your reservation time to cancel.",
    },
    {
      question: "Is online payment available?",
      answer: "- Yes, online payment is available through PayHere.",
    },
    {
      question: "Do you operate on Poya days and other holidays?",
      answer: "- Yes, we operate on Poya days and other holidays.",
    },
  ];

  const toggleAnswer = (index) => {
    setVisibleFaqIndex(visibleFaqIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="faq-content-container">
        <div className="faq-image">
          <img src="/src/assets/faq.jpg" alt="FAQ" />
        </div>
        <div className="faq-content">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faqs">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item" onClick={() => toggleAnswer(index)}>
                <div className="faq-question">{faq.question}</div>
                {visibleFaqIndex === index && <div className="faq-answer">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);

  const handleScroll = () => {
    const section = document.querySelector('.about-container');
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.8) {
      setIsInView(true);
    } else {
      setIsInView(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [isInView, controls]);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-container">
        <div className="carousel-container">
          <Slider {...carouselSettings}>
            {carouselImages.map((image) => (
              <div key={image.id}>
                <img src={image.imageURL} alt={image.title} />
              </div>
            ))}
          </Slider>
        </div>

        {/* Hero Text */}
        <div className="hero-content">
          <div className="hero-text">
            <h1>An Ambient Dining Experience</h1>
            <p>We serve delicious food from all around Sri Lanka</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-container">
        <div className="about-content">
          <div className="about-images">
            <motion.img 
              src="/src/assets/b9.jpg" 
              alt="Large Dish" 
              className="large-image"
              initial={{ opacity: 0, y: -50 }}
              animate={controls}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <motion.img 
              src="/src/assets/FoodH1.png" 
              alt="Dish 1"
              className="small-image-left"
              initial={{ opacity: 0, y: -50 }}
              animate={controls}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <motion.img 
              src="/src/assets/FoodH3.png" 
              alt="Dish 2"
              className="small-image-right"
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>
          <div className="about-text">
            <h2>About Us</h2>
            <p>Our restaurant offers a unique dining experience with delicious dishes crafted from the finest ingredients. We are passionate about delivering an authentic taste of Sri Lanka with a modern twist.</p>
            <p>Established in 2024, our restaurant has been dedicated to bringing exceptional dining experiences to our guests. We pride ourselves on providing excellent service and a warm, inviting atmosphere. </p>
            <div className="button-container">
              <a href="#order" className="button">Order Now</a>
              <a href="./reservations" className="button">View Our Restaurants</a>
            </div>
          </div>
        </div>
      </div>

    
      {/* Restaurant Section */}
      <div className="restaurant-section">
      <h2 className="restaurant-title">Explore Our Restaurants</h2>
        <div className="restaurant-cards">
        {restaurants.map((restaurant, index) => (
        <div key={index} className="restaurant-card">
        <img src={restaurant.image} alt={restaurant.name} />
        <div className="restaurant-card-content">
          <h3 className="restaurant-card-title">{restaurant.name}</h3>
          <p className="restaurant-card-description">{restaurant.description}</p>
          <a href="/restaurants" className="view-more"> Learn More</a>
        </div>
        </div>
        ))}
       </div>
       
      </div>
 

      {/* Food Categories Section */}
      <div className="food-categories-container">
        <h2 className="category_title">Order From Our Restaurant</h2>
        <div className="category-cards">
          {categories.map((category, index) => (
            <div key={index} className="card">
              <img src={category.image} alt={category.title} />
              <div className="card-overlay">
                <div className="card-title">{category.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="video-section">
        <h2 className="video-title">Discover Our Culinary Delights</h2>
        <div className="video-container">
          <video controls height="660px">
            <source src="/src/assets/video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
};

export default Home;