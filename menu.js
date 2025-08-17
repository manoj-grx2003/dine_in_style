document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle handled globally in script.js
  
  // Menu Filtering with Animation
  const categoryButtons = document.querySelectorAll('.category-btn');
  const menuItems = document.querySelectorAll('.menu-item');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Animate button click
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
      
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const category = this.dataset.category;
      
      // Animate menu items
      menuItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'flex';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 50);
          }, 300);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Enhanced Cart Functionality with Notification
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  // Add to cart functionality
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const menuItem = this.closest('.menu-item');
      const itemId = menuItem.querySelector('img').src.split('/').pop().split('.')[0].replace(/%20/g, '-').toLowerCase();
      const itemName = menuItem.querySelector('h3').textContent.split('£')[0].trim();
      const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('£', ''));
      const itemImage = menuItem.querySelector('img').src;
      const itemCategory = menuItem.dataset.category;
      
      // Button animation
      this.innerHTML = '<i class="fas fa-check"></i> Added!';
      this.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
      
      // Create and show notification
      showCartNotification(itemName);
      
      // Add to cart
      addItemToCart({
        id: itemId,
        name: itemName,
        price: itemPrice,
        image: itemImage,
        category: itemCategory,
        quantity: 1
      });
      
      // Reset button after animation
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
        this.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
      }, 2000);
    });
  });
  
  // Cart functions
  function getCart() {
    return JSON.parse(localStorage.getItem('namaste_restaurant_cart')) || [];
  }
  
  function saveCart(cart) {
    localStorage.setItem('namaste_restaurant_cart', JSON.stringify(cart));
    updateCartCount();
  }
  
  function addItemToCart(item) {
    const cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(item);
    }
    
    saveCart(cart);
  }
  
  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
      el.textContent = count;
      el.classList.add('cart-pulse');
      setTimeout(() => el.classList.remove('cart-pulse'), 500);
    });
  }
  
  // Show cart notification
  function showCartNotification(itemName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>${itemName} added to cart</span>
    `;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 3000);
  }
  
  // Image hover zoom effect
  document.querySelectorAll('.menu-item').forEach(item => {
    const imgContainer = item.querySelector('.menu-item-img-container');
    const img = item.querySelector('img');
    
    imgContainer.addEventListener('mousemove', (e) => {
      const rect = imgContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      img.style.transformOrigin = `${x}px ${y}px`;
    });
    
    imgContainer.addEventListener('mouseleave', () => {
      img.style.transformOrigin = 'center center';
      img.style.transform = 'scale(1)';
    });
  });
  
  // Initialize cart count
  updateCartCount();
});