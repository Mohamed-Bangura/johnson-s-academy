/* ========================================
   Johnson's Academy - JavaScript Functionality
   Phase 6: JavaScript Functionality & Interactive Features
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================
       1. MOBILE NAVIGATION
       ======================================== */
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Toggle mobile menu
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(5px, -5px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const spans = mobileMenuToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = '';
                        span.style.opacity = '';
                    });
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(event.target) && 
                !mobileMenuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }
    
    /* ========================================
       2. ACTIVE NAVIGATION LINKS
       ======================================== */
    
    // Set active class based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    /* ========================================
       3. SCROLL EFFECTS (Debounced + Passive)
       ======================================== */
    
    // Add scrolled class to navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', debounce(function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 100), { passive: true });
    }
    
    /* ========================================
       4. SMOOTH SCROLLING
       ======================================== */
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    /* ========================================
       5. SCROLL-TO-TOP BUTTON
       ======================================== */
    
    // Create scroll-to-top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '&uarr;';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll button (passive, debounced)
    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, 100), { passive: true });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    /* ========================================
       6. FAQ ACCORDION
       ======================================== */
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const currentlyActive = document.querySelector('.faq-item[open]');
            const parentItem = this.closest('.faq-item');
            
            // Close other open FAQ items
            if (currentlyActive && currentlyActive !== parentItem) {
                currentlyActive.removeAttribute('open');
            }
        });
    });
    
    /* ========================================
       7. INTERSECTION OBSERVER ANIMATIONS
       ======================================== */
    
    // Check motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    entry.target.classList.remove('hidden');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe sections and cards
        document.querySelectorAll('.hero-content, .service-card, .reason-card, .portfolio-item, .gallery-item, .faq-item').forEach(el => {
            el.classList.add('hidden');
            observer.observe(el);
        });
    }
    
    /* ========================================
       8. CONTACT FORM VALIDATION
       ======================================== */
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Clear previous errors
            clearErrors();
            
            // Name validation
            if (!fullName.value.trim()) {
                showError(fullName, 'Full Name is required');
                isValid = false;
            } else if (fullName.value.trim().length < 2) {
                showError(fullName, 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError(email, 'Email Address is required');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Phone validation
            if (!phone.value.trim()) {
                showError(phone, 'Phone Number is required');
                isValid = false;
            }
            
            // Message validation
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters');
                isValid = false;
            }
            
            if (isValid) {
                submitForm();
            }
        });
    }
    
    function showError(input, message) {
        const error = document.createElement('span');
        error.className = 'error-message';
        error.style.color = '#f87171';
        error.style.fontSize = '0.875rem';
        error.style.display = 'block';
        error.style.marginTop = '0.25rem';
        error.textContent = message;
        input.parentNode.appendChild(error);
        input.style.borderColor = '#f87171';
    }
    
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
            el.style.borderColor = '';
        });
    }
    
    function submitForm() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Prepare form data
        const formData = new FormData(contactForm);
        
        // Submit to Web3Forms API
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccessMessage();
                contactForm.reset();
            } else {
                showErrorMessage(data.message || 'Something went wrong. Please try again.');
            }
        })
        .catch(() => {
            showErrorMessage('Network error. Please check your connection and try again.');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }
    
    function showSuccessMessage() {
        const success = document.createElement('div');
        success.className = 'success-message';
        success.style.backgroundColor = 'var(--secondary-color, #38BDF8)';
        success.style.color = 'var(--primary-color, #081B33)';
        success.style.padding = '1rem';
        success.style.borderRadius = '0.5rem';
        success.style.marginTop = '1rem';
        success.style.textAlign = 'center';
        success.innerHTML = '<strong>Thank you!</strong> Your message has been sent successfully. We will contact you soon.';
        contactForm.parentNode.insertBefore(success, contactForm.nextSibling);
        
        // Remove after 5 seconds
        setTimeout(() => {
            success.remove();
        }, 5000);
    }
    
    function showErrorMessage(message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.backgroundColor = '#f87171';
        error.style.color = '#fff';
        error.style.padding = '1rem';
        error.style.borderRadius = '0.5rem';
        error.style.marginTop = '1rem';
        error.style.textAlign = 'center';
        error.innerHTML = '<strong>Something went wrong.</strong> ' + message;
        contactForm.parentNode.insertBefore(error, contactForm.nextSibling);
        
        // Remove after 5 seconds
        setTimeout(() => {
            error.remove();
        }, 5000);
    }
    
});

/* ========================================
   Utility Functions
   ======================================== */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}