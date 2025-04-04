import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import { 
  FaArrowDown, 
  FaRegCalendarAlt, 
  FaUtensils,
  FaWineGlassAlt,
  FaStar,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import hero1 from '../../assets/images/hero1.jpg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const [scrollRef, scrollInView] = useInView({ threshold: 0.1 });

  const slides = [
    {
      id: 1,
      image: hero1,
      title: 'Where Night Owls Dine',
      subtitle: 'Artisanal cuisine served until the early hours',
      highlight: 'Open until 2AM',
      ctaPrimary: {
        text: 'Reserve Your Table',
        icon: <FaRegCalendarAlt className="btn-icon" />,
        link: '#reservations'
      },
      ctaSecondary: {
        text: 'View Menu',
        icon: <FaUtensils className="btn-icon" />,
        link: '#menu'
      }
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      alt: 'Elegant dining setting',
      title: 'Culinary Excellence',
      subtitle: 'Award-winning dishes in an intimate setting',
      highlight: 'Michelin Guide 2024',
      ctaPrimary: {
        text: 'Our Story',
        icon: <FaStar className="btn-icon" />,
        link: '#about'
      },
      ctaSecondary: {
        text: 'Wine Pairings',
        icon: <FaWineGlassAlt className="btn-icon" />,
        link: '#wine'
      }
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      alt: 'Chef preparing food',
      title: 'Chef\'s Special Creations',
      subtitle: 'Seasonal ingredients, masterful techniques',
      highlight: 'Daily specials',
      ctaPrimary: {
        text: 'Chef\'s Table',
        icon: <FaUtensils className="btn-icon" />,
        link: '#chefs-table'
      },
      ctaSecondary: {
        text: 'Tasting Menu',
        icon: <FaRegCalendarAlt className="btn-icon" />,
        link: '#tasting-menu'
      }
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
      alt: 'Outdoor dining',
      title: 'Al Fresco Experience',
      subtitle: 'Enjoy our seasonal outdoor seating',
      highlight: 'Garden Terrace',
      ctaPrimary: {
        text: 'Book Outside',
        icon: <FaRegCalendarAlt className="btn-icon" />,
        link: '#reservations'
      },
      ctaSecondary: {
        text: 'Cocktail Menu',
        icon: <FaWineGlassAlt className="btn-icon" />,
        link: '#cocktails'
      }
    }
  ];

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      setMousePosition({
        x: (x - centerX) / centerX * 10,
        y: (y - centerY) / centerY * 10
      });
    }
  };

  // Auto-play slideshow
  useEffect(() => {
    let interval;
    if (isAutoPlaying && !isHovering) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [slides.length, isHovering, isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Animation variants with valid easing
  const slideVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 1.5, 
        ease: [0.43, 0.13, 0.23, 0.96] 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const badgeVariants = {
    hidden: { 
      opacity: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  return (
    <section 
      className="hero" 
      id="main-content"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="hero-slider">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={slide.id}
                className="slide"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`
                }}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                aria-hidden={index !== currentSlide}
              >
                <div className="slide-overlay"></div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        <motion.button 
          className="slider-nav prev" 
          onClick={handlePrev} 
          aria-label="Previous slide"
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 0 25px rgba(212, 175, 55, 0.8)'
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <FaChevronLeft />
        </motion.button>
        
        <motion.button 
          className="slider-nav next" 
          onClick={handleNext} 
          aria-label="Next slide"
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 0 25px rgba(212, 175, 55, 0.8)'
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <FaChevronRight />
        </motion.button>
        
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            />
          ))}
        </div>
      </div>
      
      <div className="hero-content">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={slide.id}
                className="content-wrapper"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.div
                  className="highlight-badge"
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {slide.highlight}
                </motion.div>
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <div className="hero-buttons">
                  <motion.a 
                    href={slide.ctaPrimary.link} 
                    className="btn btn-gold"
                    whileHover={{ 
                      y: -3,
                      boxShadow: '0 10px 30px rgba(212, 175, 55, 0.8)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    {slide.ctaPrimary.icon}
                    {slide.ctaPrimary.text}
                  </motion.a>
                  <motion.a 
                    href={slide.ctaSecondary.link} 
                    className="btn btn-outline"
                    whileHover={{ 
                      y: -3,
                      boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    {slide.ctaSecondary.icon}
                    {slide.ctaSecondary.text}
                  </motion.a>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Floating particles effect */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 30 + 30}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.2,
              top: '100vh'
            }}
          />
        ))}
      </div>
      
      <div 
        className={`scroll-indicator ${!scrollInView ? 'visible' : 'hidden'}`}
        ref={scrollRef}
      >
        <div className="mouse">
          <div className="scroller"></div>
        </div>
        <p>Scroll to explore</p>
        <FaArrowDown className="arrow-icon" />
      </div>
    </section>
  );
};

export default Hero;