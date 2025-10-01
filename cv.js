(function() {
    'use strict';

    // DOM Elements
    const header = document.getElementById('site-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const yearEl = document.getElementById('year');
    const contactForm = document.getElementById('contact-form');

    // Initialize
    function init() {
        setCurrentYear();
        setupScrollEffects();
        setupNavigation();
        setupFormValidation();
        setupTypingEffect();
        setupScrollAnimations();
    }

    // Set current year in footer
    function setCurrentYear() {
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear().toString();
        }
    }

    // Setup scroll effects for header
    function setupScrollEffects() {
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateHeader() {
            const scrollY = window.scrollY;

            if (scrollY > 100) {
                header.style.background = 'rgba(42, 42, 42, 0.98)';
                header.style.backdropFilter = 'blur(15px)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(42, 42, 42, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = 'none';
            }

            lastScrollY = scrollY;
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Setup navigation with smooth scrolling
    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active navigation highlighting
        if ('IntersectionObserver' in window && sections.length > 0) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const id = entry.target.getAttribute('id');
                            updateActiveNavLink(id);
                        }
                    });
                }, {
                    rootMargin: '-20% 0px -70% 0px',
                    threshold: 0.1
                }
            );

            sections.forEach(section => observer.observe(section));
        }
    }

    // Update active navigation link
    function updateActiveNavLink(activeId) {
        navLinks.forEach(link => {
            const linkId = link.getAttribute('href').substring(1);
            if (linkId === activeId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Setup form validation with programmer theme
    function setupFormValidation() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            let isValid = true;

            // Clear previous errors
            clearFormErrors();

            // Validate name
            if (!name || name.trim().length < 2) {
                showError('name-error', 'Name must be at least 2 characters long');
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                showError('email-error', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate message
            if (!message || message.trim().length < 10) {
                showError('message-error', 'Message must be at least 10 characters long');
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                showSuccessMessage();
                contactForm.reset();
            }
        });
    }

    // Show form error
    function showError(errorId, message) {
        const errorEl = document.getElementById(errorId);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.color = '#ff6b6b';
        }
    }

    // Clear form errors
    function clearFormErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(el => {
            el.textContent = '';
            el.style.color = '';
        });
    }

    // Show success message
    function showSuccessMessage() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = '#4CAF50';
        submitBtn.style.borderColor = '#4CAF50';

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.borderColor = '';
        }, 3000);
    }

    // Setup typing effect for hero section
    function setupTypingEffect() {
        // Disable typing effect to prevent layout issues
        return;
    }

    // Setup scroll animations
    function setupScrollAnimations() {
        // Disable scroll animations to prevent layout issues
        return;
    }

    // Add programmer-style console log
    function logToConsole() {
        console.log('%c🚀 Hamburgem\'s CV loaded successfully!', 'color: #7b5b25; font-size: 16px; font-weight: bold;');
        console.log('%c💻 Ready to .build() something amazing together?', 'color: #ffd700; font-size: 14px;');
        console.log('%c📧 Contact: yassine.bouih@uit.ac.ma', 'color: #cccccc; font-size: 12px;');
        console.log('%c🎯 Try typing "hamburgem.help()" in the console!', 'color: #00ff00; font-size: 12px;');

        // Add interactive console commands
        window.hamburgem = {
            help: () => {
                console.log('%cAvailable commands:', 'color: #7b5b25; font-weight: bold;');
                console.log('hamburgem.about() - Learn more about Hamburgem');
                console.log('hamburgem.skills() - View technical skills');
                console.log('hamburgem.projects() - See project portfolio');
                console.log('hamburgem.contact() - Get contact information');
                console.log('hamburgem.joke() - Get a programming joke');
                console.log('hamburgem.motivate() - Get some motivation');
            },
            about: () => {
                console.log('%cHi! I\'m Hamburgem, a passionate CS student and aspiring AI engineer from Morocco.', 'color: #7b5b25;');
                console.log('I love building intelligent systems and solving real-world problems with code.');
                console.log('Currently in my 4th year, exploring AI, ML, and web development.');
            },
            skills: () => {
                console.log('%cTechnical Skills:', 'color: #7b5b25; font-weight: bold;');
                console.log('Languages: Python (90%), JavaScript (85%), C (75%)');
                console.log('Frameworks: Flask, React, Node.js');
                console.log('AI/ML: NumPy, Pandas, Scikit-learn, NLTK');
                console.log('Tools: Git, GitHub, VS Code, MongoDB');
            },
            projects: () => {
                console.log('%cFeatured Projects:', 'color: #7b5b25; font-weight: bold;');
                console.log('1. AutoMail - Email Automation System');
                console.log('2. Online Multiplayer Chess Game (In Progress)');
                console.log('3. Diabetes Prediction System');
                console.log('4. Personal AI Assistant');
                console.log('5. AI FAQ Chatbot');
            },
            contact: () => {
                console.log('%cGet in Touch:', 'color: #7b5b25; font-weight: bold;');
                console.log('Email: yassine.bouih@uit.ac.ma');
                console.log('LinkedIn: linkedin.com/in/hamburgem');
                console.log('GitHub: github.com/hamburgem');
                console.log('Twitter: @hamburgem');
            },
            joke: () => {
                const jokes = [
                    'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
                    'How many programmers does it take to change a light bulb? None, that\'s a hardware problem! 💡',
                    'Why don\'t programmers like nature? It has too many bugs! 🌿',
                    'What do you call a programmer from Finland? Nerdic! 🇫🇮',
                    'Why did the programmer quit his job? He didn\'t get arrays! 📊'
                ];
                const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
                console.log(`%c${randomJoke}`, 'color: #ffd700; font-style: italic;');
            },
            motivate: () => {
                const motivations = [
                    'Every expert was once a beginner. Keep coding! 💪',
                    'The best time to plant a tree was 20 years ago. The second best time is now. Start coding! 🌱',
                    'Code is like humor. When you have to explain it, it\'s bad. Keep it simple! 😄',
                    'The only way to do great work is to love what you do. Keep building! ❤️',
                    'Success is not final, failure is not fatal: it is the courage to continue that counts. Keep pushing! 🚀'
                ];
                const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
                console.log(`%c${randomMotivation}`, 'color: #00ff00; font-weight: bold;');
            }
        };
    }

    // Add smooth reveal effect for sections
    function addRevealEffect() {
        // Disable reveal effect to prevent layout issues
        return;
    }

    // Add hover effects for interactive elements
    function addHoverEffects() {
        const interactiveElements = document.querySelectorAll('.btn, .nav-link, .tag, .project-card');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.transform = 'translateY(-2px)';
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translateY(0)';
            });
        });
    }

    // Add keyboard navigation support
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key to close any open modals or reset form
            if (e.key === 'Escape') {
                clearFormErrors();
                contactForm?.reset();
            }

            // Enter key on form inputs
            if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
                const form = e.target.closest('form');
                if (form) {
                    form.dispatchEvent(new Event('submit'));
                }
            }
        });
    }

    // Add loading animation
    function addLoadingAnimation() {
        // Remove the loading animation that was causing the flash
        document.body.style.opacity = '1';
    }

    // Initialize everything when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Additional setup
    addRevealEffect();
    addHoverEffects();
    setupKeyboardNavigation();
    addLoadingAnimation();
    logToConsole();

    // Expose some functions globally for debugging
    window.hamburgemCV = {
        updateActiveNavLink,
        showError,
        clearFormErrors
    };

})();