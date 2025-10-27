// Product Detail Page JavaScript

let products = [];
let currentProduct = null;

// Load products data
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        products = data.products;
        loadProductDetail();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Get product ID from URL
function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 1;
}

// Load and display product details
function loadProductDetail() {
    const productId = getProductId();
    currentProduct = products.find(p => p.id === productId);
    
    if (!currentProduct) {
        currentProduct = products[0];
    }

    // Populate product details
    document.getElementById('productTitle').textContent = currentProduct.name;
    document.getElementById('productBrand').textContent = currentProduct.brand;
    document.getElementById('productPrice').textContent = `₦${currentProduct.price.toLocaleString()}`;
    document.getElementById('productDescription').textContent = currentProduct.description;
    document.getElementById('productIngredients').textContent = currentProduct.ingredients;
    document.getElementById('productNameBreadcrumb').textContent = currentProduct.name;
    
    // Category link
    document.getElementById('categoryLink').href = `categories.html?cat=${currentProduct.category}`;
    document.getElementById('categoryLink').textContent = currentProduct.category;

    // Product image
    document.getElementById('mainProductImage').src = currentProduct.image;
    document.getElementById('mainProductImage').alt = currentProduct.name;
    
    // Thumbnails
    document.getElementById('thumb1').src = currentProduct.image;
    document.getElementById('thumb2').src = currentProduct.image;
    document.getElementById('thumb3').src = currentProduct.image;

    // Badge
    if (currentProduct.badge) {
        document.getElementById('productBadge').textContent = currentProduct.badge;
        document.getElementById('productBadge').style.display = 'block';
    } else {
        document.getElementById('productBadge').style.display = 'none';
    }

    // Rating
    displayRating(currentProduct.rating, currentProduct.reviews);

    // Size selector
    if (currentProduct.size) {
        const sizeSelect = document.getElementById('sizeSelect');
        sizeSelect.innerHTML = `<option>${currentProduct.size}</option>`;
    }
}

// Display rating stars
function displayRating(rating, reviews) {
    const ratingStars = document.getElementById('ratingStars');
    const ratingText = document.getElementById('ratingText');
    const totalReviews = document.getElementById('totalReviews');
    
    ratingStars.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        if (i <= Math.floor(rating)) {
            star.className = 'fas fa-star';
        } else if (i - 0.5 <= rating) {
            star.className = 'fas fa-star-half-alt';
        } else {
            star.className = 'far fa-star';
        }
        ratingStars.appendChild(star);
    }
    
    ratingText.textContent = `${rating} (${reviews} reviews)`;
    totalReviews.textContent = `Based on ${reviews} reviews`;
}

// Add to cart
document.getElementById('addToCartBtn').addEventListener('click', function() {
    addToCart(currentProduct.id);
    showNotification(`${currentProduct.name} added to cart!`);
});

// Add to wishlist
document.getElementById('addToWishlistBtn').addEventListener('click', function() {
    addToWishlist(currentProduct.id);
    
    const heartIcon = document.querySelector('#addToWishlistBtn i');
    if (heartIcon.classList.contains('far')) {
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        showNotification('Added to wishlist!');
    } else {
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        showNotification('Removed from wishlist');
    }
});

// Initialize
loadProducts();
updateCartCount();

