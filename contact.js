document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart count
  updateCartCount();

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }

  // Reservation form submission
  const reservationForm = document.getElementById('reservation-form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Your reservation has been submitted! We will confirm shortly.');
      reservationForm.reset();
    });
  }
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }
  // Theme toggle handled globally in script.js
}