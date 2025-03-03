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
document.addEventListener('DOMContentLoaded', function () {
    const timelineItems = document.querySelectorAll('.timeline-list li');

    timelineItems.forEach(item => {
        // Add mouseenter event
        item.addEventListener('mouseenter', function () {
            // Add slight elevation with box shadow
            this.style.textShadow = '0 1px 2px rgba(187, 134, 252, 0.3)';

            // No longer changing opacity of other items
            // We'll focus only on the hovered item
        });

        // Add mouseleave event
        item.addEventListener('mouseleave', function () {
            // Remove elevation
            this.style.textShadow = 'none';

            // No need to restore opacity since we're not changing it
        });

        // Add click effect for better interaction feedback
        item.addEventListener('click', function (e) {
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


// Smart Header - Hide on scroll down, show on scroll up
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    let scrollThreshold = 10; // Minimum scroll amount before triggering header visibility change

    // Add necessary CSS for smooth transitions
    header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

    // First, let's create a wrapper function to handle the scroll
    function handleHeaderVisibility() {
        let currentScrollTop = window.scrollY || document.documentElement.scrollTop;

        // Don't hide header at the very top of the page
        if (currentScrollTop <= 0) {
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = 'var(--md-elevation-2)';
            lastScrollTop = 0;
            return;
        }

        // Determine scroll direction and meet threshold
        if (Math.abs(lastScrollTop - currentScrollTop) <= scrollThreshold) {
            return; // Not enough scrolling to trigger an action
        }

        // Scrolling down
        if (currentScrollTop > lastScrollTop) {
            header.style.transform = 'translateY(-100%)'; // Hide header
        }
        // Scrolling up
        else {
            header.style.transform = 'translateY(0)'; // Show header
            header.style.boxShadow = 'var(--md-elevation-3)'; // Add slightly stronger shadow when reappearing
        }

        lastScrollTop = currentScrollTop;
    }

    // Setup the scroll event with throttling for better performance
    let scrollTimeout;

    window.addEventListener('scroll', function () {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function () {
                handleHeaderVisibility();
                scrollTimeout = null;
            }, 10); // Small throttle to improve performance
        }
    });

    // Show header when user hovers near the top of the screen
    // This improves UX by making the header easier to access
    const topSensor = document.createElement('div');
    topSensor.style.position = 'fixed';
    topSensor.style.top = '0';
    topSensor.style.left = '0';
    topSensor.style.width = '100%';
    topSensor.style.height = '20px';
    topSensor.style.zIndex = '99';
    topSensor.style.pointerEvents = 'none'; // Don't interfere with other interactions

    topSensor.addEventListener('mouseenter', function () {
        if (window.scrollY > 50) { // Only trigger if we've scrolled down a bit
            header.style.transform = 'translateY(0)';
        }
    });

    document.body.appendChild(topSensor);
});


// Timeline dots progress indicator functionality
document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineDots = document.querySelectorAll('.timeline-dot');

    if (!timeline || !timelineItems.length || !timelineDots.length) {
        return; // Exit if timeline elements don't exist
    }

    // Function to update the timeline progress with smoothing
    let lastScrollPercentage = 0; // Track the last percentage for smooth transitions
    const smoothFactor = 0.1; // Lower value = smoother/slower transitions (0.1 = 10% movement toward target per frame)
    let animationFrameId;

    function updateTimelineProgress() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;

        // Calculate the total height of the timeline
        const timelineRect = timeline.getBoundingClientRect();
        const timelineTop = timelineRect.top + scrollPosition;
        const timelineHeight = timelineRect.height;

        // Calculate target percentage (how far we've scrolled through the timeline)
        let targetScrollPercentage = 0;

        if (scrollPosition > timelineTop - windowHeight) {
            // Start progress slightly before the timeline enters viewport
            // and calculate percentage scrolled with offset for visibility
            targetScrollPercentage = Math.min(
                100,
                Math.max(0, ((scrollPosition + windowHeight * 0.7) - timelineTop) / (timelineHeight + windowHeight * 0.3) * 100)
            );
        }

        // Apply smoothing - move partway toward the target percentage
        lastScrollPercentage = lastScrollPercentage + (targetScrollPercentage - lastScrollPercentage) * smoothFactor;

        // Create or update progress line element
        let progressLine = timeline.querySelector('.timeline-progress-line');

        if (!progressLine) {
            // Create the progress line element if it doesn't exist yet
            progressLine = document.createElement('div');
            progressLine.className = 'timeline-progress-line';
            progressLine.style.position = 'absolute';
            progressLine.style.width = '2px';
            progressLine.style.backgroundColor = 'var(--md-primary)';
            progressLine.style.top = '0';
            progressLine.style.left = '50%';
            progressLine.style.marginLeft = '-1px';
            progressLine.style.zIndex = '1';
            // Remove transition property - we're handling animation with JS

            // For mobile view
            const mediaQuery = window.matchMedia('(max-width: 900px)');
            if (mediaQuery.matches) {
                progressLine.style.left = '31px';
            }

            // Add to DOM
            timeline.appendChild(progressLine);
        }

        // Update the height with the smoothed percentage
        progressLine.style.height = `${lastScrollPercentage}%`;

        // Continue smooth animation
        animationFrameId = requestAnimationFrame(smoothUpdateDots);

        // Update each timeline item's dot based on its position - with smoothing
        function smoothUpdateDots() {
            timelineItems.forEach((item, index) => {
                const itemRect = item.getBoundingClientRect();
                const dot = timelineDots[index];

                // Calculate item's position relative to viewport
                const itemMiddle = itemRect.top + itemRect.height / 2;
                const itemPercentInView = 1 - Math.min(1, Math.max(0,
                    Math.abs(itemMiddle - windowHeight * 0.5) / (windowHeight * 0.5)
                ));

                // Determine dot states with smooth transitions
                if (itemPercentInView > 0.6) {  // Item is prominently in view
                    // Add active class if not already there
                    if (!dot.classList.contains('active')) {
                        dot.classList.add('active');
                    }
                    dot.classList.remove('past');

                    // Scale dot based on how centered the item is
                    const scale = 1 + (itemPercentInView * 0.5); // Max 1.5x scale
                    dot.style.transform = `scale(${scale})`;
                }
                else if (itemRect.bottom < windowHeight * 0.5) {
                    // Item is above viewport center (scrolled past)
                    dot.classList.remove('active');
                    dot.classList.add('past');
                    dot.style.transform = '';
                }
                else {
                    // Item is below viewport center (not yet reached)
                    dot.classList.remove('active');
                    dot.classList.remove('past');
                    dot.style.transform = '';
                }
            });
        }
    }

    // Initial update
    updateTimelineProgress();

    // Use requestAnimationFrame for smoother animation
    let isScrolling = false;

    // Debounced scroll handler to minimize performance impact
    window.addEventListener('scroll', function() {
        isScrolling = true;

        // Cancel previous animation frame if a new scroll event happens
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        // Trigger an immediate update then continue smooth animation
        updateTimelineProgress();
    });

    // Keep animating for a short time after scrolling stops
    function checkScrollingEnded() {
        if (isScrolling) {
            isScrolling = false;

            // Continue animating for 500ms after scrolling stops
            const continueAnimation = () => {
                updateTimelineProgress();
                setTimeout(() => {
                    if (!isScrolling) {
                        updateTimelineProgress();
                    }
                }, 500);
            };

            continueAnimation();
        }
    }

    // Check if scrolling has ended every 100ms
    setInterval(checkScrollingEnded, 100);

    // Update on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateTimelineProgress, 100);
    });
});