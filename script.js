// Global Shopping Cart and Wishlist Functions

// Load cart from localStorage
function getCart() {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to cart
function addToCart(productId) {
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    
    saveCart(cart);
    updateCartCount();
}

// Load wishlist from localStorage
function getWishlist() {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
}

// Save wishlist to localStorage
function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Add to wishlist
function addToWishlist(productId) {
    let wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        saveWishlist(wishlist);
    }
}

// Remove from wishlist
function removeFromWishlist(productId) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(id => id !== productId);
    saveWishlist(wishlist);
}

// Update cart count
function updateCartCount() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        if (el) el.textContent = total;
    });
}

// Search functionality
if (document.getElementById('searchInput')) {
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
        }
    });
}

if (document.querySelector('.search-btn')) {
    document.querySelector('.search-btn').addEventListener('click', function() {
        const searchValue = document.getElementById('searchInput').value;
        performSearch(searchValue);
    });
}

function performSearch(query) {
    if (query.trim()) {
        showNotification(`Searching for "${query}"...`);
        // Redirect to categories with search
        window.location.href = `categories.html?search=${query}`;
    }
}

// Hero banner rotation (for index page)
const slides = document.querySelectorAll('.hero-slide');
if (slides.length > 0) {
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

// Bottom navigation
document.querySelectorAll('.bottom-nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        // Don't prevent default - let it navigate
        document.querySelectorAll('.bottom-nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--soft-pink);
        color: white;
        padding: 15px 30px;
        border-radius: 30px;
        z-index: 10000;
        box-shadow: 0 5px 20px rgba(255, 158, 201, 0.4);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animation styles if not already added
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize cart count on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateCartCount);
} else {
    updateCartCount();
}
