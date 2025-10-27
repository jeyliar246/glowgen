// Stores Page JavaScript

let allProducts = [];
let allStores = [];
let currentStore = null;
let viewMode = 'grid'; // 'grid' or 'list'

// Load stores and products
async function loadStores() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        allStores = data.stores;
        allProducts = data.products;
        
        displayStores();
        updateCartCount();
    } catch (error) {
        console.error('Error loading stores:', error);
    }
}

// Display all stores
function displayStores() {
    const storesGrid = document.getElementById('storesGrid');
    storesGrid.innerHTML = '';
    
    allStores.forEach(store => {
        const storeCard = document.createElement('div');
        storeCard.className = 'store-card';
        storeCard.onclick = () => showStoreProducts(store.id, store.name);
        
        storeCard.innerHTML = `
            <div class="store-logo">${store.logo}</div>
            <h3>${store.name}</h3>
            <p class="store-description">${store.description}</p>
            <div class="store-rating">
                <div class="rating">
                    ${generateStars(store.rating)}
                </div>
                <span class="store-products-count">${store.productsCount} Products</span>
            </div>
        `;
        
        storesGrid.appendChild(storeCard);
    });
}

// Show products from a specific store
function showStoreProducts(storeId, storeName) {
    const filteredProducts = allProducts.filter(p => p.storeId === storeId);
    
    // Hide stores section
    document.querySelector('.stores-section').style.display = 'none';
    
    // Show store products section
    const storeProductsSection = document.getElementById('storeProductsSection');
    storeProductsSection.style.display = 'block';
    
    document.getElementById('selectedStoreName').textContent = storeName;
    
    displayStoreProducts(filteredProducts);
}

// Display products in grid or list view
function displayStoreProducts(products) {
    const grid = document.getElementById('storeProductsGrid');
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
            <div class="store-label">
                <i class="fas fa-store"></i>
                <span>${product.store}</span>
            </div>
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

// Switch between grid and list view
function switchView(mode) {
    viewMode = mode;
    const grid = document.getElementById('storeProductsGrid');
    grid.className = `products-grid ${mode}-view`;
    
    // Update button states
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === mode) {
            btn.classList.add('active');
        }
    });
}

// Show all stores again
function showAllStores() {
    document.querySelector('.stores-section').style.display = 'block';
    document.getElementById('storeProductsSection').style.display = 'none';
}

// Initialize
loadStores();

