// Profile Page JavaScript

// Tab switching
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Show corresponding tab content
        const tabId = this.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    });
});

// Initialize
updateCartCount();

