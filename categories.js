// Categories Page JavaScript

let allProducts = [];
let filteredProducts = [];
let viewMode = 'grid'; // 'grid' or 'list'

// Load products and display
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        allProducts = data.products;
        
        // Get category from URL
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('cat');
        
        if (category) {
            filterByCategory(category);
        } else {
            displayProducts(allProducts);
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Filter products by category
function filterByCategory(category) {
    filteredProducts = allProducts.filter(p => p.category === category);
    document.getElementById('pageTitle').textContent = category;
    document.getElementById('pageSubtitle').textContent = `Browse all ${category.toLowerCase()} products`;
    
    // Highlight active category in nav
    document.querySelectorAll('.category-tab').forEach(tab => {
        if (tab.textContent === category) {
            tab.classList.add('active');
        }
    });
    
    displayProducts(filteredProducts);
}

// Display products
function displayProducts(products) {
    const grid = document.getElementById('productsGrid');
    grid.className = `products-grid ${viewMode}-view`;
    grid.innerHTML = '';
    
    products.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => {
        window.location.href = `product-detail.html?id=${product.id}`;
    };
    
    card.innerHTML = `
        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            ${product.store ? `<div class="store-label"><i class="fas fa-store"></i><span>${product.store}</span></div>` : ''}
            <h3>${product.name}</h3>
            <p class="brand">${product.brand}</p>
            <div class="rating">
                ${generateStars(product.rating)}
                <span>${product.rating} (${product.reviews})</span>
            </div>
            <p class="price">₦${product.price.toLocaleString()}</p>
        </div>
        <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
            <i class="fas fa-shopping-bag"></i>
            Add to Cart
        </button>
    `;
    
    return card;
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

// Sort products
document.getElementById('sortSelect').addEventListener('change', function() {
    const sortBy = this.value;
    const products = filteredProducts.length > 0 ? filteredProducts : allProducts;
    
    let sorted = [...products];
    
    switch(sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            sorted.reverse();
            break;
    }
    
    displayProducts(sorted);
});

// View toggle (grid/list)
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const mode = this.dataset.view;
        viewMode = mode;
        
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Redisplay products with new view
        const category = filteredProducts.length > 0 ? filteredProducts : allProducts;
        displayProducts(category);
    });
});

// Initialize
loadProducts();
updateCartCount();

