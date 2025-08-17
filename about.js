// about.js - Enhanced functionality for Namaste Restaurant About Page

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Team member hover effect enhancement
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.05)';
            this.querySelector('h3').style.color = '#d4a762';
        });
        member.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
            this.querySelector('h3').style.color = '';
        });
    });
    

    // Animate value cards on scroll
    const valueCards = document.querySelectorAll('.value-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    valueCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Himalayan theme toggle
    // Theme toggle handled globally in script.js

    // Animate the hero text
    const heroText = document.querySelector('.about-hero h1');
    if (heroText) {
        setTimeout(() => {
            heroText.style.animation = 'fadeIn 1.5s ease';
        }, 300);
    }

    // Himalayan-inspired scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Parallax effect for hero section
        const hero = document.querySelector('.about-hero');
        if (hero) {
            hero.style.backgroundPositionY = currentScroll * 0.5 + 'px';
        }
        
        // Mountain-like scroll behavior
        if (currentScroll <= 0) {
            document.body.classList.remove('scroll-up');
        }
        
        if (currentScroll > lastScroll && !document.body.classList.contains('scroll-down')) {
            document.body.classList.remove('scroll-up');
            document.body.classList.add('scroll-down');
        }
        
        if (currentScroll < lastScroll && document.body.classList.contains('scroll-down')) {
            document.body.classList.remove('scroll-down');
            document.body.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // Traditional Nepali greeting in console
    console.log('%cनमस्ते! स्वागत छ नमस्ते रेस्टुरेन्टको बारेमा पृष्ठमा!', 
        'color: #d4a762; font-size: 14px; font-weight: bold;');
    console.log('%cThank you for exploring our story and traditions.', 
        'color: #8b3a3a; font-size: 12px;');

    // Initialize any carousels or sliders if added later
    // initTestimonialSlider(); // Example for future expansion

    // Handle reservation button click
    const reserveBtn = document.querySelector('.cta-button');
    if (reserveBtn) {
        reserveBtn.addEventListener('click', function(e) {
            if (!e.target.href) {
                e.preventDefault();
                // Add animation/feedback
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                    window.location.href = 'contact.html#reservation';
                }, 500);
            }
        });
    }
});

// Future expansion: Testimonial slider
function initTestimonialSlider() {
    // Could be implemented later with customer testimonials
    console.log('Testimonial slider ready for implementation');
}

// Utility function for Himalayan-themed alerts
function showNamasteAlert(message, type = 'info') {
    const colors = {
        info: '#d4a762',
        success: '#5a8f7b',
        error: '#8b3a3a'
    };
    
    const alertDiv = document.createElement('div');
    alertDiv.style.position = 'fixed';
    alertDiv.style.bottom = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.padding = '15px 25px';
    alertDiv.style.backgroundColor = colors[type] || colors.info;
    alertDiv.style.color = 'white';
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    alertDiv.style.zIndex = '1000';
    alertDiv.style.transform = 'translateY(100px)';
    alertDiv.style.opacity = '0';
    alertDiv.style.transition = 'all 0.3s ease';
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.transform = 'translateY(0)';
        alertDiv.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        alertDiv.style.transform = 'translateY(100px)';
        alertDiv.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 300);
    }, 3000);
}