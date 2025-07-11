document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active'); // for hamburger animation
        });

        // Close nav when a link is clicked (for smooth scroll)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });
    }

    // Smooth Scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset for fixed header
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Basic Form Validation (Client-side only)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                alert('Please fill in all fields.');
                event.preventDefault(); // Stop form submission
            } else if (!isValidEmail(emailInput.value.trim())) {
                alert('Please enter a valid email address.');
                event.preventDefault();
            } else {
                // In a real application, you would send this data to a server
                alert('Thank you for your message, Priya will get back to you soon!');
                this.reset(); // Clear form fields after successful submission
                event.preventDefault(); // Prevent actual form submission for demonstration
            }
        });
    }

    function isValidEmail(email) {
        // Simple email regex validation
        return /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(email);
    }
});
