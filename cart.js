// Cart Page JavaScript

let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    displayCart();
    updateCartCount();
}

// Display cart items
function displayCart() {
    const cartItemsList = document.getElementById('cartItemsList');
    const emptyCart = document.getElementById('emptyCart');
    
    if (cart.length === 0) {
        cartItemsList.style.display = 'none';
        emptyCart.style.display = 'block';
        updateSummary(0);
        return;
    }

    cartItemsList.style.display = 'block';
    emptyCart.style.display = 'none';
    
    // Load products data
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            cartItemsList.innerHTML = '';
            
            cart.forEach(item => {
                const product = data.products.find(p => p.id === item.id);
                if (!product) return;

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3>${product.name}</h3>
                        <p class="brand">${product.brand}</p>
                        <p class="price">₦${product.price.toLocaleString()}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                    <div class="cart-item-total">
                        <span>₦${(product.price * item.quantity).toLocaleString()}</span>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                cartItemsList.appendChild(cartItem);
            });
            
            updateSummary();
        });
}

// Increase quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        saveCart();
        loadCart();
    }
}

// Decrease quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        saveCart();
        loadCart();
    } else if (item && item.quantity === 1) {
        removeFromCart(productId);
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    loadCart();
}

// Update cart summary
async function updateSummary(subtotal = null) {
    if (subtotal !== null) {
        document.getElementById('subtotal').textContent = `₦${subtotal.toLocaleString()}`;
        document.getElementById('tax').textContent = `₦0`;
        document.getElementById('total').textContent = `₦${subtotal.toLocaleString()}`;
        return;
    }

    try {
        const response = await fetch('products.json');
        const data = await response.json();
        
        let subtotal = 0;
        cart.forEach(item => {
            const product = data.products.find(p => p.id === item.id);
            if (product) {
                subtotal += product.price * item.quantity;
            }
        });
        
        const tax = subtotal * 0.075; // 7.5% tax
        const total = subtotal + tax;
        
        document.getElementById('subtotal').textContent = `₦${subtotal.toLocaleString()}`;
        document.getElementById('tax').textContent = `₦${Math.round(tax).toLocaleString()}`;
        document.getElementById('total').textContent = `₦${Math.round(total).toLocaleString()}`;
    } catch (error) {
        console.error('Error updating summary:', error);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Checkout button
document.getElementById('checkoutBtn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Checkout functionality would be implemented here. Redirecting to payment...');
});

// Initialize
loadCart();

