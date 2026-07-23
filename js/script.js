/* ========================================
   Johnson's Academy - JavaScript Functionality
   Production-Ready, Accessible, Cross-Browser
   ======================================== */

(function() {
    'use strict';

    // Mark JS as loaded for progressive enhancement
    document.documentElement.classList.add('js-loaded');

    /* ========================================
       Utility Functions
       ======================================== */

    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this;
            var args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }

    /* ========================================
       1. MOBILE NAVIGATION
       ======================================== */

    var mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    var navMenu = document.querySelector('.nav-menu');
    var navLinks = document.querySelectorAll('.nav-menu a');

    function closeMobileMenu() {
        if (navMenu && mobileMenuToggle) {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    function toggleMobileMenu() {
        if (!navMenu || !mobileMenuToggle) return;
        
        var isOpen = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        mobileMenuToggle.setAttribute('aria-expanded', String(!isOpen));
    }

    if (mobileMenuToggle && navMenu) {
        // Click handler
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);

        // Keyboard support (Enter and Space)
        mobileMenuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });

        // Close menu when clicking a nav link
        navLinks.forEach(function(link) {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(event.target) &&
                !mobileMenuToggle.contains(event.target)) {
                closeMobileMenu();
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
                mobileMenuToggle.focus();
            }
        });
    }

    /* ========================================
       2. ACTIVE NAVIGATION LINKS
       ======================================== */

    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === '' || currentPage === '/') {
        currentPage = 'index.html';
    }

    navLinks.forEach(function(link) {
        var linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    /* ========================================
       3. SCROLL EFFECTS (Debounced + Passive)
       ======================================== */

    var navbar = document.querySelector('.navbar');
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

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var navbarHeight = navbar ? navbar.offsetHeight : 0;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Set focus to target for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

    /* ========================================
       5. SCROLL-TO-TOP BUTTON
       ======================================== */

    var scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '&#8593;';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.setAttribute('type', 'button');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, 100), { passive: true });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ========================================
       6. FAQ ACCORDION
       ======================================== */

    var faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            var parentItem = this.closest('.faq-item');
            if (!parentItem) return;

            var currentlyActive = document.querySelector('.faq-item[open]');

            // Close other open FAQ items
            if (currentlyActive && currentlyActive !== parentItem) {
                currentlyActive.removeAttribute('open');
            }
        });
    });

    /* ========================================
       7. INTERSECTION OBSERVER ANIMATIONS
       ======================================== */

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        var observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    entry.target.classList.remove('hidden');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe cards and items for scroll animations
        document.querySelectorAll('.service-card, .reason-card, .portfolio-item, .gallery-item, .faq-item, .value-card, .benefit-item, .mv-card, .process-step').forEach(function(el) {
            el.classList.add('hidden');
            observer.observe(el);
        });
    }

    /* ========================================
       8. CONTACT FORM VALIDATION & SUBMISSION
       ======================================== */

    var contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var fullName = document.getElementById('fullName');
            var email = document.getElementById('email');
            var phone = document.getElementById('phone');
            var message = document.getElementById('message');

            var isValid = true;

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
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
            } else {
                // Focus first error field
                var firstError = contactForm.querySelector('[aria-invalid="true"]');
                if (firstError) firstError.focus();
            }
        });
    }

    function showError(input, message) {
        // Remove existing error for this input
        var existingError = input.parentNode.querySelector('.error-message');
        if (existingError) existingError.remove();

        var error = document.createElement('span');
        error.className = 'error-message';
        error.id = input.id + '-error';
        error.textContent = message;
        error.setAttribute('role', 'alert');
        input.parentNode.appendChild(error);

        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', error.id);
        input.style.borderColor = '#f87171';
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(function(el) {
            el.remove();
        });
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(function(el) {
            el.style.borderColor = '';
            el.removeAttribute('aria-invalid');
            el.removeAttribute('aria-describedby');
        });
    }

    function submitForm() {
        var submitBtn = contactForm.querySelector('button[type="submit"]');
        var originalText = submitBtn.textContent;

        // Loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');

        // Prepare form data
        var formData = new FormData(contactForm);

        // Submit to Web3Forms API
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(function(data) {
            if (data.success) {
                showSuccessMessage();
                contactForm.reset();
            } else {
                showErrorMessage(data.message || 'Something went wrong. Please try again.');
            }
        })
        .catch(function() {
            showErrorMessage('Network error. Please check your connection and try again.');
        })
        .finally(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.removeAttribute('aria-busy');
        });
    }

    function showSuccessMessage() {
        var success = document.createElement('div');
        success.className = 'success-message';
        success.setAttribute('role', 'status');
        success.innerHTML = '<strong>Thank you!</strong> Your message has been sent successfully. We will contact you soon.';
        contactForm.parentNode.insertBefore(success, contactForm.nextSibling);

        success.focus();

        setTimeout(function() {
            success.remove();
        }, 8000);
    }

    function showErrorMessage(message) {
        var error = document.createElement('div');
        error.className = 'error-message';
        error.setAttribute('role', 'alert');
        error.style.backgroundColor = '#f87171';
        error.style.color = '#fff';
        error.style.padding = '1rem';
        error.style.borderRadius = '0.5rem';
        error.style.marginTop = '1rem';
        error.style.textAlign = 'center';
        error.innerHTML = '<strong>Something went wrong.</strong> ' + message;
        contactForm.parentNode.insertBefore(error, contactForm.nextSibling);

        error.focus();

        setTimeout(function() {
            error.remove();
        }, 8000);
    }

})();
