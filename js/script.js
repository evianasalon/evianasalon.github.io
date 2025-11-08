// Force prevent horizontal scroll
function preventHorizontalScroll() {
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
}

// Smooth scrolling for navigation links (if you have anchor links elsewhere)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Run on load
window.addEventListener('load', function() {
    preventHorizontalScroll();
});

window.addEventListener('resize', function() {
    preventHorizontalScroll();
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Wedding Decor Landing Page Loaded');
    preventHorizontalScroll();
});