// charity: water Landing Page JavaScript
// This file contains interactive features for the landing page

// Wait for the page to load completely before running JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('charity: water landing page loaded successfully!');
    
    // Smooth scroll animations - fade in elements as user scrolls
    function setupScrollAnimations() {
        // Create an intersection observer to watch for elements entering the viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is visible, add the fade-in class
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Start animation 50px before element enters view
        });
        
        // Find all elements that should animate on scroll (excluding container)
        const animatedElements = document.querySelectorAll('.main-headline, .subheadline, .impact-photo, .header');
        
        // Set initial styles for elements (hidden state)
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            // Start observing each element
            observer.observe(element);
        });
        
        // Handle wave background separately - fade in immediately when page loads
        const container = document.querySelector('.container');
        if (container) {
            container.style.opacity = '0';
            container.style.transition = 'opacity 1s ease';
            
            // Fade in the wave background after a short delay
            setTimeout(() => {
                container.style.opacity = '1';
            }, 200);
        }
        
        // Add CSS class for fade-in animation
        const style = document.createElement('style');
        style.textContent = `
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize scroll animations
    setupScrollAnimations();
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add click effect to CTA button
    const ctaButton = document.querySelector('.header-cta');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            console.log('CTA button clicked!');
            // Add your action here (e.g., open modal, redirect, etc.)
        });
    }
    
    // Add hover effect to impact photo
    const impactPhoto = document.querySelector('.impact-photo');
    if (impactPhoto) {
        impactPhoto.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        impactPhoto.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Touch-friendly dropdown menu handling
    function setupTouchDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('a');
            
            // Handle touch devices
            if ('ontouchstart' in window) {
                dropdownLink.addEventListener('click', function(e) {
                    e.preventDefault(); // Prevent default link behavior
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                });
                
                // Close dropdown when clicking outside
                document.addEventListener('click', function(e) {
                    if (!dropdown.contains(e.target)) {
                        dropdown.classList.remove('active');
                    }
                });
            }
        });
    }
    
    // Call the touch dropdown setup
    setupTouchDropdowns();

    // Simple animation for headlines when page loads - now handled by scroll animations
    // The scroll animation system will handle the initial fade-in effects
    
    // Mobile menu functionality
    function setupMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        // Function to open mobile menu
        function openMobileMenu() {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Add hamburger animation (rotate lines to X)
            const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
            lines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        }
        
        // Function to close mobile menu
        function closeMobileMenu() {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore background scrolling
            
            // Reset hamburger animation
            const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
            lines[0].style.transform = '';
            lines[1].style.opacity = '1';
            lines[2].style.transform = '';
        }
        
        // Open menu when hamburger is clicked
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openMobileMenu();
            });
        }
        
        // Close menu when close button is clicked
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMobileMenu();
            });
        }
        
        // Close menu when overlay (background) is clicked
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', function(e) {
                // Only close if clicking the overlay itself, not the menu content
                if (e.target === mobileMenuOverlay) {
                    closeMobileMenu();
                }
            });
        }
        
        // Close menu when any menu link is clicked
        const menuLinks = document.querySelectorAll('.mobile-menu-item, .mobile-submenu-item, .mobile-cta-button');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Close menu when Escape key is pressed
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Handle window resize - close menu if switching to desktop view
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenuOverlay.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    
    // Call the mobile menu setup
    setupMobileMenu();
});
