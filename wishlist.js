// Wishlist Page JavaScript

let wishlist = [];

// Load wishlist from localStorage
function loadWishlist() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
    displayWishlist();
}

// Display wishlist items
function displayWishlist() {
    const wishlistItems = document.getElementById('wishlistItems');
    const emptyWishlist = document.getElementById('emptyWishlist');
    
    if (wishlist.length === 0) {
        wishlistItems.style.display = 'none';
        emptyWishlist.style.display = 'block';
        return;
    }

    wishlistItems.style.display = 'grid';
    emptyWishlist.style.display = 'none';
    
    // Load products data
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            wishlistItems.innerHTML = '';
            
            wishlist.forEach(productId => {
                const product = data.products.find(p => p.id === productId);
                if (!product) return;

                const wishlistItem = document.createElement('div');
                wishlistItem.className = 'product-card';
                wishlistItem.innerHTML = `
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                    <button class="remove-wishlist-btn" onclick="removeFromWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                    <div class="product-image" onclick="window.location.href='product-detail.html?id=${product.id}'">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info" onclick="window.location.href='product-detail.html?id=${product.id}'">
                        <h3>${product.name}</h3>
                        <p class="brand">${product.brand}</p>
                        <div class="rating">
                            ${generateStars(product.rating)}
                            <span>${product.rating} (${product.reviews})</span>
                        </div>
                        <p class="price">₦${product.price.toLocaleString()}</p>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-bag"></i>
                        Add to Cart
                    </button>
                `;
                wishlistItems.appendChild(wishlistItem);
            });
        });
}

// Remove from wishlist
function removeFromWishlist(productId) {
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlist();
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Initialize
loadWishlist();
updateCartCount();

