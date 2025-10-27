// Homepage JavaScript

let viewMode = 'grid'; // 'grid' or 'list'

// Load products with store information
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        const products = data.products;
        
        // Update product cards with store information
        updateProductCards(products);
        updateCartCount();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Update product cards to show store information
function updateProductCards(products) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        const productId = index + 1; // Products are 1-6
        const product = products.find(p => p.id === productId);
        
        if (product && product.store) {
            // Find the product-info div and add store label before h3
            const productInfo = card.querySelector('.product-info');
            if (productInfo) {
                // Check if store label already exists
                if (!productInfo.querySelector('.store-label')) {
                    const storeLabel = document.createElement('div');
                    storeLabel.className = 'store-label';
                    storeLabel.innerHTML = `<i class="fas fa-store"></i><span>${product.store}</span>`;
                    
                    // Insert before the first h3
                    const firstChild = productInfo.querySelector('h3');
                    if (firstChild) {
                        productInfo.insertBefore(storeLabel, firstChild);
                    } else {
                        productInfo.prepend(storeLabel);
                    }
                }
            }
        }
    });
}

// Switch view between grid and list
function switchView(mode) {
    viewMode = mode;
    const grid = document.getElementById('productsGrid');
    grid.className = `products-grid ${mode}-view`;
    
    // Update button states
    document.querySelectorAll('.home-view-toggle .view-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === mode) {
            btn.classList.add('active');
        }
    });
}

// Initialize
loadProducts();

