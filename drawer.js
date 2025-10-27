// Mobile Drawer Menu JavaScript

function openDrawer() {
    document.getElementById('mobileDrawer').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeDrawer() {
    document.getElementById('mobileDrawer').classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Add event listeners if elements exist
if (document.getElementById('mobileMenuBtn')) {
    document.getElementById('mobileMenuBtn').addEventListener('click', openDrawer);
}

// Close drawer when clicking outside
if (document.querySelector('.drawer-overlay')) {
    document.querySelector('.drawer-overlay').addEventListener('click', closeDrawer);
}

