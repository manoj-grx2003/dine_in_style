document.addEventListener('DOMContentLoaded', function() {
  // Testimonial slider functionality
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentIndex = 0;

  function showTestimonial(index) {
    if (!testimonials.length) return;
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonials[index].classList.add('active');
    currentIndex = index;
  }

  function nextTestimonial() {
    if (!testimonials.length) return;
    let nextIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(nextIndex);
  }

  function prevTestimonial() {
    if (!testimonials.length) return;
    let prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prevIndex);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
  if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

  // Auto-rotate testimonials every 5 seconds
  if (testimonials.length) setInterval(nextTestimonial, 5000);

  // Initialize cart count
  updateCartCount();
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }
  // Theme toggle handled globally in script.js
}