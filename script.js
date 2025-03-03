// Android animation mouse movement effect
const androidAnimation = document.querySelector('.android-animation');
const androidIcon = document.querySelector('.android-icon');
const particles = document.querySelectorAll('.code-particle, .android-item');

document.addEventListener('mousemove', (e) => {
    if (!androidAnimation) return;

    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    // Move the gradient background slightly
    if (androidIcon) {
        androidIcon.style.background = `radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, rgba(187, 134, 252, 0.15) 0%, transparent 70%)`;
    }

    // Move each particle based on mouse position
    particles.forEach(particle => {
        const x = parseFloat(getComputedStyle(particle).getPropertyValue('--x'));
        const y = parseFloat(getComputedStyle(particle).getPropertyValue('--y'));

        const moveX = (mouseX - 0.5) * 5;
        const moveY = (mouseY - 0.5) * 5;

        particle.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;

        // Add subtle rotation based on mouse movement
        const rotation = (mouseX - 0.5) * 10 + (mouseY - 0.5) * 10;
        particle.style.transform += ` rotate(${rotation}deg)`;

        // Add subtle scale effect
        const distance = Math.sqrt(Math.pow(mouseX - x / 100, 2) + Math.pow(mouseY - y / 100, 2));
        const scale = 1 - distance * 0.1;
        particle.style.transform += ` scale(${0.8 + scale * 0.4})`;
    });
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function () {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Ripple Effect for Buttons
const buttons = document.querySelectorAll('.md-btn');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

const revealElements = document.querySelectorAll('.section');

function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Add initial style for fade-in animation
window.addEventListener('DOMContentLoaded', () => {
    // Remove the initial opacity setting that's causing the issue
    document.querySelectorAll('.section').forEach(section => {
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        // Set sections to be visible by default
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    });
});

window.addEventListener('scroll', checkScroll);

// Scroll indicator visibility control
const scrollIndicator = document.querySelector('.scroll-indicator');

// scrolling guide
window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
        // User has scrolled down, fade out the indicator
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        // User is near the top, show the indicator
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
});


// Add material design ripple effect to timeline bullet points
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-list li');

    timelineItems.forEach(item => {
        // Add mouseenter event
        item.addEventListener('mouseenter', function() {
            // Add slight elevation with box shadow
            this.style.textShadow = '0 1px 2px rgba(187, 134, 252, 0.3)';

            // No longer changing opacity of other items
            // We'll focus only on the hovered item
        });

        // Add mouseleave event
        item.addEventListener('mouseleave', function() {
            // Remove elevation
            this.style.textShadow = 'none';

            // No need to restore opacity since we're not changing it
        });

        // Add click effect for better interaction feedback
        item.addEventListener('click', function(e) {
            // Create and append ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('timeline-ripple');

            // Position the ripple where clicked
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add these styles to your stylesheet or inline for the ripple effect
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .timeline-ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(187, 134, 252, 0.3);
            transform: scale(0);
            animation: timelineRipple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes timelineRipple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .timeline-list li {
            position: relative;
            overflow: hidden;
        }
    </style>
`);