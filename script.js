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
document.addEventListener('DOMContentLoaded', function () {
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
                } else if (itemRect.bottom < windowHeight * 0.5) {
                    // Item is above viewport center (scrolled past)
                    dot.classList.remove('active');
                    dot.classList.add('past');
                    dot.style.transform = '';
                } else {
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
    window.addEventListener('scroll', function () {
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
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateTimelineProgress, 100);
    });
});


// Script to automatically identify and bold specific keywords in timeline content
document.addEventListener('DOMContentLoaded', function () {
    // List of technical keywords to highlight based on your resume
    const keywordsToHighlight = [
        // Programming Languages & Core Technologies
        'Kotlin', 'Java', 'Android SDK', 'Python', 'C\\+\\+', 'QML',

        // Architecture & Design Patterns
        'MVVM', 'Clean Architecture', 'MVI', 'SOLID',

        // Android Specific
        'Jetpack Compose', 'Coroutines', 'Flows', 'RxJava',
        'Dagger Hilt', 'Room', 'SQLite', 'Retrofit', 'Glide',

        // Testing
        'JUnit', 'Mockito', 'MockK', 'Robolectric',

        // Process & Tools
        'CI\\/CD', 'Git', 'GitHub', 'pull requests', 'build variant', 'app signing',

        // Project Specific
        'server-driven UI', 'pixel-perfect', 'memory optimization',
        'feature flags', 'collaborating',

        // Other Technical Terms
        'payments', 'terabyte', 'secure client-server architecture'
    ];

    // Create regex pattern with word boundaries to match whole words only
    const pattern = new RegExp('\\b(' + keywordsToHighlight.join('|') + ')\\b', 'gi');

    // Target elements that contain technical content
    const contentElements = document.querySelectorAll('.timeline-list li, .project-description');

    contentElements.forEach(element => {
        // Store the original text
        const originalText = element.innerHTML;

        // Replace keywords with bold version, preserving any existing HTML
        const newText = originalText.replace(pattern, '<strong>$1</strong>');

        // Only update if changes were made
        if (newText !== originalText) {
            element.innerHTML = newText;
        }
    });

    // Add hover effect to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            // Make keywords more prominent on hover
            const boldElements = this.querySelectorAll('strong');
            boldElements.forEach(el => {
                el.style.color = 'var(--md-secondary)';
            });
        });

        item.addEventListener('mouseleave', function () {
            // Reset color
            const boldElements = this.querySelectorAll('strong');
            boldElements.forEach(el => {
                el.style.color = 'var(--md-primary)';
            });
        });
    });
});

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
  const skillChips = document.querySelectorAll('.skill-chip');

  // Set initial state - all invisible
  skillChips.forEach(chip => {
    chip.style.opacity = '0';
    chip.style.transform = 'translateY(20px)';
    chip.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Function to animate skills when in viewport
  function animateSkills() {
    if (!isInViewport(document.querySelector('.skill-chips'))) return;

    skillChips.forEach((chip, index) => {
      setTimeout(() => {
        chip.style.opacity = '1';
        chip.style.transform = 'translateY(0)';
      }, 50 * index); // Stagger each item by 50ms
    });

    // Remove scroll listener once animation is triggered
    window.removeEventListener('scroll', animateSkills);
  }

  // Check on initial load and then on scroll
  animateSkills();
  window.addEventListener('scroll', animateSkills);
});

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
  // Create the FAB container
  const fabContainer = document.createElement('div');
  fabContainer.classList.add('fab-container');

  // Create main FAB button
  const mainFab = document.createElement('button');
  mainFab.classList.add('fab-button', 'main-fab');
  mainFab.innerHTML = '<span class="material-icons">add</span>';

  // Create mini FABs
  const miniFabs = [
    {
      icon: 'email',
      label: 'Email Me',
      action: () => { window.location.href = 'mailto:Miladv33@gmail.com'; }
    },
    {
      icon: 'code',
      label: 'View GitHub',
      action: () => { window.open('https://github.com/miladv33', '_blank'); }
    },
    {
      icon: 'article',
      label: 'Read Articles',
      action: () => { document.getElementById('articles').scrollIntoView({behavior: 'smooth'}); }
    }
  ];

  // Create a wrapper for mini FABs
  const miniFabsWrapper = document.createElement('div');
  miniFabsWrapper.classList.add('mini-fabs-wrapper');

  // Add mini FABs to wrapper
  miniFabs.forEach(fab => {
    const miniFab = document.createElement('button');
    miniFab.classList.add('fab-button', 'mini-fab');
    miniFab.innerHTML = `<span class="material-icons">${fab.icon}</span>`;
    miniFab.setAttribute('data-label', fab.label);
    miniFab.addEventListener('click', fab.action);
    miniFabsWrapper.appendChild(miniFab);
  });

  // Add components to DOM
  fabContainer.appendChild(miniFabsWrapper);
  fabContainer.appendChild(mainFab);
  document.body.appendChild(fabContainer);

  // Toggle FAB menu
  mainFab.addEventListener('click', function() {
    fabContainer.classList.toggle('active');

    // Rotate main FAB button
    this.style.transform = fabContainer.classList.contains('active')
      ? 'rotate(45deg)'
      : 'rotate(0)';
  });

  // Add styles
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .fab-container {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 999;
      }
      
      .fab-button {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: none;
        color: var(--md-on-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--md-elevation-3);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .main-fab {
        background-color: var(--md-primary);
        z-index: 2;
        position: relative;
      }
      
      .main-fab:hover {
        transform: scale(1.1);
      }
      
      .mini-fabs-wrapper {
        position: absolute;
        bottom: 0;
        right: 0;
        height: 56px;
        width: 56px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
      }
      
      .mini-fab {
        background-color: var(--md-secondary);
        position: absolute;
        bottom: 0;
        visibility: hidden;
        opacity: 0;
        font-size: 24px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .mini-fab::before {
        content: attr(data-label);
        position: absolute;
        right: 64px;
        padding: 5px 10px;
        background-color: var(--md-surface);
        color: var(--md-on-surface);
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.2s ease;
        box-shadow: var(--md-elevation-1);
      }
      
      .mini-fab:hover::before {
        opacity: 1;
      }
      
      .fab-container.active .mini-fab {
        visibility: visible;
        opacity: 1;
      }
      
      .fab-container.active .mini-fab:nth-child(1) {
        transform: translateY(-65px);
      }
      
      .fab-container.active .mini-fab:nth-child(2) {
        transform: translateY(-130px);
      }
      
      .fab-container.active .mini-fab:nth-child(3) {
        transform: translateY(-195px);
      }
    </style>
  `);
});

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
  const hero = document.querySelector('.hero');
  const androidItems = document.querySelectorAll('.android-item, .code-particle');
  const heroContent = document.querySelector('.hero-content');

  // Add perspective to hero
  hero.style.perspective = '1000px';
  hero.style.perspectiveOrigin = 'center';

  // Base transform for hero content
  heroContent.style.transform = 'translateZ(0)';
  heroContent.style.transition = 'transform 0.2s ease-out';

  // Initial parallax depth for each item
  androidItems.forEach(item => {
    // Generate random depth
    const depth = Math.random() * 200;
    item.style.transform += ` translateZ(${-depth}px)`;
    item.dataset.depth = depth;
  });

  // Handle scroll parallax
  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    if (scrollY > hero.offsetHeight) return; // Stop when out of view

    // Move hero content based on scroll
    const contentMove = scrollY * 0.15;
    heroContent.style.transform = `translateZ(0) translateY(${contentMove}px)`;

    // Move each android item based on its depth
    androidItems.forEach(item => {
      const depth = parseFloat(item.dataset.depth);
      const itemMove = scrollY * (depth / 1000);
      const currentTransform = item.style.transform.split(' translateZ')[0];
      item.style.transform = `${currentTransform} translateZ(${-depth}px) translateY(${itemMove}px)`;
    });
  });
});

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  // Set initial state
  timelineItems.forEach(item => {
    const isLeft = !item.style.left || item.style.left === '0px';
    const transform = isLeft ? 'translateX(-50px)' : 'translateX(50px)';

    item.style.opacity = '0';
    item.style.transform = transform;
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const offset = 150; // Start animation a bit earlier
    return (
      rect.top <= (window.innerHeight - offset || document.documentElement.clientHeight - offset) &&
      rect.bottom >= offset
    );
  }

  // Function to animate timeline items
  function animateTimeline() {
    timelineItems.forEach(item => {
      if (isInViewport(item) && item.style.opacity === '0') {
        // Animate in
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';

          // Add highlight flash to the timeline dot
          const dot = item.querySelector('.timeline-dot');
          if (dot) {
            dot.classList.add('timeline-dot-flash');
            setTimeout(() => {
              dot.classList.remove('timeline-dot-flash');
            }, 1000);
          }
        }, 200 * Array.from(timelineItems).indexOf(item)); // Sequential delay
      }
    });
  }

  // Add highlight effect style
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .timeline-dot-flash {
        animation: dot-flash 1s ease-out;
      }
      
      @keyframes dot-flash {
        0% {
          box-shadow: 0 0 0 0 rgba(187, 134, 252, 0.7);
        }
        70% {
          box-shadow: 0 0 0 15px rgba(187, 134, 252, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(187, 134, 252, 0);
        }
      }
    </style>
  `);

  // Check on initial load
  setTimeout(animateTimeline, 500);

  // Check on scroll
  window.addEventListener('scroll', animateTimeline);
});