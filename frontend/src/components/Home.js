import React from 'react';
// Import lucide-react icons for a clean, modern look
import { CalendarDays, Ticket, Search, CheckCircle, Star, Users, MapPin, Sparkles } from 'lucide-react';
// Import the dedicated CSS file for this component
import './Home.css';

const Home = () => {
  return (
    // Main container for the entire page
    <div className="home-page-container">

      {/* Hero Section: Prominent, eye-catching top section with background animation */}
      <section className="hero-section">
        {/* Decorative blobs for a modern, abstract feel */}
        <div className="hero-blobs-container">
          <div className="hero-blob hero-blob-1"></div>
          <div className="hero-blob hero-blob-2"></div>
          <div className="hero-blob hero-blob-3"></div>
        </div>

        {/* Content of the Hero Section */}
        <div className="container hero-content">
          <h1 className="hero-title">
            Your Next Unforgettable Experience Starts Here
          </h1>
          <p className="hero-subtitle">
            Discover and book tickets for concerts, sports, workshops, and more. Seamlessly find events that match your passion.
          </p>
          {/* Call-to-action button */}
          <button className="primary-button hero-button">
            Explore All Events
          </button>
        </div>
      </section>

      {/* Featured Events Section: Showcasing popular or upcoming events */}
      <section className="featured-events-section">
        <div className="container">
          <h2 className="section-title">
            Popular Events Happening Soon
          </h2>
          {/* Grid layout for event cards, responsive across different screen sizes */}
          <div className="event-cards-grid">
            {/* Event Card 1 */}
            <div className="event-card">
              <img
                src="https://placehold.co/600x400/2c3e50/ffffff?text=Music+Festival"
                alt="Summer Music Festival"
                className="event-card-image"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/000000?text=Image+Error'; }}
              />
              <div className="event-card-content">
                <h3 className="event-card-title">Summer Beats Festival</h3>
                <p className="event-card-meta">
                  <CalendarDays className="event-card-icon" /> July 25-27, 2025
                </p>
                <p className="event-card-meta">
                  <MapPin className="event-card-icon" /> Central Park, NYC
                </p>
                <p className="event-card-description">
                  Three days of non-stop music, delicious food, and vibrant art installations. Featuring top international and local artists.
                </p>
                <button className="secondary-button event-card-button">
                  View Details
                </button>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="event-card">
              <img
                src="https://placehold.co/600x400/34495e/ffffff?text=Tech+Conference"
                alt="Global Tech Summit"
                className="event-card-image"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/000000?text=Image+Error'; }}
              />
              <div className="event-card-content">
                <h3 className="event-card-title">Innovate 2025 Tech Summit</h3>
                <p className="event-card-meta">
                  <CalendarDays className="event-card-icon" /> August 10-12, 2025
                </p>
                <p className="event-card-meta">
                  <MapPin className="event-card-icon" /> Convention Center, SF
                </p>
                <p className="event-card-description">
                  Dive deep into AI, blockchain, and sustainable tech. Network with industry leaders and discover groundbreaking innovations.
                </p>
                <button className="secondary-button event-card-button">
                  View Details
                </button>
              </div>
            </div>

            {/* Event Card 3 */}
            <div className="event-card">
              <img
                src="https://placehold.co/600x400/1abc9c/ffffff?text=Art+Exhibition"
                alt="Modern Art Exhibition"
                className="event-card-image"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/000000?text=Image+Error'; }}
              />
              <div className="event-card-content">
                <h3 className="event-card-title">Vanguard Art Showcase</h3>
                <p className="event-card-meta">
                  <CalendarDays className="event-card-icon" /> September 1-30, 2025
                </p>
                <p className="event-card-meta">
                  <MapPin className="event-card-icon" /> City Art Gallery
                </p>
                <p className="event-card-description">
                  A captivating exhibition featuring cutting-edge works from emerging and established contemporary artists.
                </p>
                <button className="secondary-button event-card-button">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section: Simple steps to guide users */}
      <section className="how-it-works-section">
        <div className="container text-center">
          <h2 className="section-title">
            Booking Your Event Is Easy
          </h2>
          {/* Grid for the three steps */}
          <div className="how-it-works-grid">
            <div className="how-it-works-step">
              <Search className="how-it-works-icon" />
              <h3 className="how-it-works-title">1. Find Your Event</h3>
              <p className="how-it-works-description">Browse thousands of events by category, date, or location with powerful search tools.</p>
            </div>
            <div className="how-it-works-step">
              <Ticket className="how-it-works-icon" />
              <h3 className="how-it-works-title">2. Secure Your Tickets</h3>
              <p className="how-it-works-description">Choose your seats, select your package, and complete your purchase securely.</p>
            </div>
            <div className="how-it-works-step">
              <Sparkles className="how-it-works-icon" /> {/* Changed icon for more 'experience' feel */}
              <h3 className="how-it-works-title">3. Enjoy the Experience</h3>
              <p className="how-it-works-description">Receive instant e-tickets and get ready for an unforgettable time!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/Trust Section: Build confidence with user feedback */}
      <section className="testimonials-section">
        <div className="container text-center">
          <h2 className="section-title">
            What Our Users Are Saying
          </h2>
          <div className="testimonial-card">
            <Users className="testimonial-icon" /> {/* Changed icon to Users for 'community' feel */}
            <p className="testimonial-text">
              "This platform transformed how I discover events! The interface is intuitive, and booking is a breeze. A must-have for event-goers!"
            </p>
            <p className="testimonial-author">- Alex M., Concert Enthusiast</p>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section: Encourage further engagement */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Dive Into Amazing Events?</h2>
          <p className="cta-subtitle">
            Join our community today and unlock exclusive access to the best events near you and worldwide.
          </p>
          <button className="primary-button cta-button">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
