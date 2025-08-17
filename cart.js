document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle handled globally in script.js

  // Cart Module
  const Cart = {
    CART_KEY: 'namaste_restaurant_cart',
    
    getCartFromStorage: function() {
      try {
        const cartData = localStorage.getItem(this.CART_KEY);
        return cartData ? JSON.parse(cartData) : [];
      } catch (error) {
        console.error('Error reading cart from storage:', error);
        return [];
      }
    },
    
    saveCartToStorage: function(cart) {
      try {
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to storage:', error);
      }
    },
    
    getCart: function() {
      return this.getCartFromStorage();
    },
    
    addItem: function(id, name, price, quantity = 1) {
      const cart = this.getCartFromStorage();
      const existingItem = cart.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ id, name, price, quantity });
      }
      
      this.saveCartToStorage(cart);
      return cart;
    },
    
    updateItem: function(id, quantity) {
      const cart = this.getCartFromStorage();
      const item = cart.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          return this.removeItem(id);
        }
        item.quantity = quantity;
        this.saveCartToStorage(cart);
      }
      
      return cart;
    },
    
    removeItem: function(id) {
      const cart = this.getCartFromStorage();
      const updatedCart = cart.filter(item => item.id !== id);
      this.saveCartToStorage(updatedCart);
      return updatedCart;
    },
    
    clearCart: function() {
      this.saveCartToStorage([]);
      return [];
    },
    
    getTotalItems: function() {
      const cart = this.getCartFromStorage();
      return cart.reduce((total, item) => total + item.quantity, 0);
    },
    
    getSubtotal: function() {
      const cart = this.getCartFromStorage();
      return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  };

  // DOM Utilities
  const DOM = {
    formatCurrency: function(amount) {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'
      }).format(amount);
    },
    
    createCartItemElement: function(item) {
      const element = document.createElement('div');
      element.className = 'cart-item';
      element.dataset.id = item.id;
      element.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" loading="lazy">
        <div class="cart-item-details">
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-price">${this.formatCurrency(item.price)} each</p>
        </div>
        <div class="cart-item-controls">
          <input type="number" min="1" value="${item.quantity}" class="cart-item-quantity" aria-label="Quantity">
          <button class="cart-item-remove" aria-label="Remove item">×</button>
        </div>
      `;
      return element;
    },
    
    updateCartCount: function() {
      const count = Cart.getTotalItems();
      document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = count;
      });
    },
    
    renderCartItems: function() {
      const cart = Cart.getCart();
      const cartContainer = document.getElementById('cart-items');
      
      if (cart.length === 0) {
        cartContainer.innerHTML = `
          <div class="empty-cart-message">
            <p>Your cart is empty</p>
            <a href="menu.html" class="cta-button">Browse Menu</a>
          </div>
        `;
        return;
      }
      
      // Clear existing items
      cartContainer.innerHTML = '';
      
      // Add each item to the cart
      cart.forEach(item => {
        const itemElement = this.createCartItemElement(item);
        cartContainer.appendChild(itemElement);
        
        // Add event listeners for quantity changes
        const quantityInput = itemElement.querySelector('.cart-item-quantity');
        quantityInput.addEventListener('change', (e) => {
          const newQuantity = parseInt(e.target.value);
          if (!isNaN(newQuantity)) {
            const updatedCart = Cart.updateItem(item.id, newQuantity);
            this.updateCartDisplay(updatedCart);
          }
        });
        
        // Add event listener for remove button
        const removeBtn = itemElement.querySelector('.cart-item-remove');
        removeBtn.addEventListener('click', () => {
          const updatedCart = Cart.removeItem(item.id);
          this.updateCartDisplay(updatedCart);
          this.showNotification(`${item.name} removed from cart`);
        });
      });
    },
    
    updateCartDisplay: function(cart) {
      this.renderCartItems();
      this.updateCartCount();
      this.updateOrderSummary();
    },
    
    updateOrderSummary: function() {
      const subtotal = Cart.getSubtotal();
      const deliveryFee = 2.50; // Could be dynamic based on order value
      const total = subtotal + deliveryFee;
      
      document.getElementById('subtotal').textContent = this.formatCurrency(subtotal);
      document.getElementById('delivery-fee').textContent = this.formatCurrency(deliveryFee);
      document.getElementById('total').textContent = this.formatCurrency(total);
      
      // Disable checkout button if cart is empty
      const checkoutBtn = document.getElementById('checkout-button');
      checkoutBtn.disabled = subtotal === 0;
    },
    
    showNotification: function(message, type = 'success') {
      // Remove any existing notifications first
      const existingNotif = document.querySelector('.notification');
      if (existingNotif) existingNotif.remove();
      
      const notification = document.createElement('div');
      notification.className = `notification notification-${type}`;
      notification.textContent = message;
      
      document.body.appendChild(notification);
      
      // Auto-remove after 3 seconds
      setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    },
    
    
    initializeCheckoutForm: function() {
      const form = document.getElementById('checkout-form');
      
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const deliveryOption = document.getElementById('delivery-option').value;
        const address = document.getElementById('delivery-address').value;
        
        // Basic validation
        if (deliveryOption === 'delivery' && !address.trim()) {
          this.showNotification('Please enter a delivery address', 'error');
          return;
        }
        
        // Show loading state
        const checkoutBtn = document.getElementById('checkout-button');
        const originalText = checkoutBtn.textContent;
        checkoutBtn.disabled = true;
        checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        // Simulate API call (in a real app, this would be an actual fetch request)
        setTimeout(() => {
          this.showNotification('Order placed successfully!');
          
          // Clear the cart
          Cart.clearCart();
          this.updateCartDisplay(Cart.getCart());
          
          // Reset form
          form.reset();
          
          // Reset button state
          checkoutBtn.disabled = false;
          checkoutBtn.textContent = originalText;
        }, 1500);
      });
      
      // Toggle address field based on delivery option
      document.getElementById('delivery-option').addEventListener('change', (e) => {
        const addressField = document.getElementById('delivery-address');
        addressField.disabled = e.target.value !== 'delivery';
        if (addressField.disabled) {
          addressField.value = '';
        }
      });
    }
  };

  // Initialize the cart functionality
  DOM.updateCartDisplay(Cart.getCart());
  DOM.initializeCheckoutForm();
  
  // Update current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Set initial delivery address state
  document.getElementById('delivery-address').disabled = 
    document.getElementById('delivery-option').value !== 'delivery';
});