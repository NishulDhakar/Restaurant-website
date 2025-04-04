import React, { useState } from 'react';
import './About.css';
import { FaMoon, FaSeedling, FaCocktail, FaMusic, FaAward, FaPlay, FaPause } from 'react-icons/fa';
import { GiChefToque, GiMeal, GiWineBottle } from 'react-icons/gi';
import { IoMdTime } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import rajuImg from '../../assets/images/Raju.jpg';
import bhaghaImg from '../../assets/images/Bhagha.jpg';
import sanjuImg from '../../assets/images/sanju.jpg';
import aboutImg from '../../assets/images/aboutImg.jpg';

const About = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const features = React.useMemo(() => [
    {
      icon: <FaMoon size={28} />,
      title: "Open Late",
      description: "Serving until 4am on weekends"
    },
    {
      icon: <FaSeedling size={28} />,
      title: "Local Ingredients",
      description: "Farm-to-table freshness with 90% local sourcing"
    },
    {
      icon: <FaCocktail size={28} />,
      title: "Craft Cocktails",
      description: "20+ signature mixology creations"
    },
    {
      icon: <FaMusic size={28} />,
      title: "Live Music",
      description: "Nightly jazz performances from 9pm"
    }
  ], []);

  const teamMembers = [
    {
      name: "Raju",
      role: "Executive Chef",
      bio: "Trained in Bhopal and Bihar, brings 15 years of culinary excellence",
      img: rajuImg,
    },
    {
      name: "Bhagha",
      role: "Mixologist",
      bio: "Creator of our award-winning cocktail program",
      img: bhaghaImg,
    },
    {
      name: "sanju",
      role: "Sommelier",
      bio: "Curator of our 300+ bottle wine collection",
      img: sanjuImg,
    }
  ];

  const timeline = [
    { year: "2015", event: "Founded as a small bistro with 10 tables" },
    { year: "2017", event: "Expanded to include full bar and lounge" },
    { year: "2019", event: "Awarded 'Best New Restaurant' by City Magazine" },
    { year: "2021", event: "Completed major renovation and expansion" },
    { year: "2023", event: "Featured in Michelin Guide" }
  ];

  const testimonials = [
    { 
      quote: "The midnight tasting menu is an unforgettable experience. Every dish tells a story.", 
      author: "Food & Wine Magazine" 
    },
    { 
      quote: "The ambiance and service make this place truly special. Our go-to for date nights.", 
      author: "Sarah K., Regular Customer" 
    },
    { 
      quote: "Best cocktails in the city. The mixologists are true artists.", 
      author: "City Nightlife Guide" 
    }
  ];

  const awards = [
    { icon: <FaAward />, title: "Best Fine Dining 2023", source: "City Eats" },
    { icon: <GiMeal />, title: "Chef's Choice Award", source: "Gourmet Society" },
    { icon: <GiWineBottle />, title: "Wine Excellence", source: "Vintner's Circle" },
    { icon: <IoMdTime />, title: "Late Night Gem", source: "Night Owl Guide" }
  ];

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text" data-aos="fade-right">
            <h2 className="section-title">
              <span className="title-decorator">Our Story</span>
            </h2>
            <p className="highlight">
              <span className="highlight-text">Established in 2015, Midnight Cafe was born from a passion for nighttime dining experiences.</span>
            </p>
            <p>We believe the magic hours between dusk and dawn deserve exceptional cuisine. Our chefs craft each dish with ingredients sourced from local moonlit markets, creating flavors that shine when the stars come out.</p>
            
            <div className="timeline-container">
              <h3 className="timeline-title">Our Journey</h3>
              <div className="timeline">
                {timeline.map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-event">{item.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="about-image" data-aos="fade-left">
            {/* <div className="image-frame" onClick={toggleVideo}> */}
            <div className="image-frame">
              {isVideoPlaying ? (
                <div className="video-wrapper">
                  {/* <video autoPlay loop muted playsInline>
                    <source src="/videos/restaurant-atmosphere.mp4" type="video/mp4" />
                  </video> */}
                  {/* <button className="video-control" aria-label="Pause video">
                    <FaPause />
                  </button> */}
                </div>
              ) : (
                <>
                  <img 
                    src= {aboutImg}
                    alt="Our Restaurant at night" 
                    loading="lazy" 
                  />
                  {/* <button className="video-control" aria-label="Play video">
                    <FaPlay />
                  </button> */}
                </>
              )}
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-hover-effect"></div>
            </div>
          ))}
        </div>
        
        <div className="team-section">
          <h2 className="section-title centered">
            <span className="title-decorator">Meet The Team</span>
          </h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div className="team-card" key={index} data-aos="fade-up" data-aos-delay={index * 150}>
                <div className="team-image">
                  <img src={member.img} alt={member.name} loading="lazy" />
                  <div className="team-overlay">
                    <p>{member.bio}</p>
                  </div>
                </div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="awards-section">
          <h2 className="section-title centered">
            <span className="title-decorator">Awards & Recognition</span>
          </h2>
          <div className="awards-grid">
            {awards.map((award, index) => (
              <div className="award-card" key={index} data-aos="flip-left" data-aos-delay={index * 100}>
                <div className="award-icon">{award.icon}</div>
                <h3>{award.title}</h3>
                <p>{award.source}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="testimonials-section">
          <h2 className="section-title centered">
            <span className="title-decorator">What People Say</span>
          </h2>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="testimonials-carousel"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-card">
                  <blockquote>"{testimonial.quote}"</blockquote>
                  <cite>- {testimonial.author}</cite>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
