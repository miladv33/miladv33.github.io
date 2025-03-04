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

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    // Create gradient overlay for hover effect
    const overlay = document.createElement('div');
    overlay.classList.add('project-card-overlay');
    card.appendChild(overlay);

    // Add morph animation on hover
    card.addEventListener('mouseenter', function() {
      this.classList.add('project-card-hover');

      // Animate project tech items
      const techItems = this.querySelectorAll('.project-tech-item');
      techItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 50}ms`;
        item.classList.add('project-tech-item-hover');
      });
    });

    card.addEventListener('mouseleave', function() {
      this.classList.remove('project-card-hover');

      // Reset tech items
      const techItems = this.querySelectorAll('.project-tech-item');
      techItems.forEach(item => {
        item.classList.remove('project-tech-item-hover');
        // Remove delay on leave to avoid staggered fade out
        item.style.transitionDelay = '0ms';
      });
    });
  });

  // Add necessary styles
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .project-card {
        position: relative;
        overflow: hidden;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .project-card-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--md-primary-transparent), rgba(3, 218, 198, 0.05));
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;
        pointer-events: none;
      }
      
      .project-card-hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: var(--md-elevation-4);
      }
      
      .project-card-hover .project-card-overlay {
        opacity: 0.1;
      }
      
      .project-card-hover .project-header {
        transform: scale(1.05);
      }
      
      .project-header {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: center;
      }
      
      .project-tech-item {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    background-color 0.3s ease,
                    color 0.3s ease;
      }
      
      .project-tech-item-hover {
        transform: translateY(-3px);
        background-color: var(--md-secondary);
        color: var(--md-on-secondary);
      }
    </style>
  `);
});

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
  // First, modify your HTML to add a typing container
  const heroSubtitle = document.querySelector('.hero-subtitle');

  if (heroSubtitle) {
    // Save original text
    const originalText = heroSubtitle.innerHTML;

    // Create typed text element
    const typedTextEl = document.createElement('div');
    typedTextEl.classList.add('typed-text');

    // Insert after the hero subtitle
    heroSubtitle.insertAdjacentElement('afterend', typedTextEl);

    // Define typing text phrases
    const phrases = [
      "Building innovative Android apps",
      "Specializing in Kotlin and MVVM",
      "Implementing Clean Architecture",
      "Creating seamless user experiences",
      "Developing with Jetpack Compose"
    ];

    // Initialize variables
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    // Function to type text
    function typeText() {
      // Current phrase to work with
      const currentPhrase = phrases[phraseIndex];

      // Speed control based on state
      const typingSpeed = isDeleting ? 30 : 80;

      if (!isWaiting) {
        // If typing
        if (!isDeleting && charIndex <= currentPhrase.length) {
          typedTextEl.innerHTML = `<span class="primary-text">${currentPhrase.substring(0, charIndex)}</span><span class="cursor">|</span>`;
          charIndex++;

          // Start deleting after full phrase is typed with a pause
          if (charIndex > currentPhrase.length) {
            isWaiting = true;
            setTimeout(() => {
              isWaiting = false;
              isDeleting = true;
            }, 1500);
          }
        }
        // If deleting
        else if (isDeleting && charIndex >= 0) {
          typedTextEl.innerHTML = `<span class="primary-text">${currentPhrase.substring(0, charIndex)}</span><span class="cursor">|</span>`;
          charIndex--;

          // Move to next phrase after fully deleted
          if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
          }
        }
      }

      // Call function again after delay
      setTimeout(typeText, typingSpeed);
    }

    // Start the typing animation
    typeText();
  }

  // Add necessary styles
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .typed-text {
        min-height: 28px;
        margin-bottom: calc(var(--md-spacing-unit) * 4);
        color: var(--md-secondary);
      }
      
      .primary-text {
        color: var(--md-secondary);
        font-weight: 500;
      }
      
      .cursor {
        color: var(--md-primary);
        font-weight: bold;
        animation: cursor-blink 1s infinite;
      }
      
      @keyframes cursor-blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
    </style>
  `);
});

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
  // Create progress container
  const progressContainer = document.createElement('div');
  progressContainer.classList.add('scroll-progress-container');

  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress-bar');

  // Append to DOM
  progressContainer.appendChild(progressBar);
  document.body.appendChild(progressContainer);

  // Update progress on scroll
  window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = (scrollPosition / windowHeight) * 100;

    progressBar.style.width = `${scrollPercentage}%`;

    // Add pulsing effect at milestones
    if (scrollPercentage >= 25 && scrollPercentage < 26 ||
        scrollPercentage >= 50 && scrollPercentage < 51 ||
        scrollPercentage >= 75 && scrollPercentage < 76 ||
        scrollPercentage >= 99 && scrollPercentage <= 100) {
      progressBar.classList.add('progress-milestone');

      setTimeout(() => {
        progressBar.classList.remove('progress-milestone');
      }, 1000);
    }
  });

  // Add styles
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .scroll-progress-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: rgba(255, 255, 255, 0.1);
        z-index: 1000;
      }
      
      .scroll-progress-bar {
        height: 100%;
        width: 0;
        background: linear-gradient(to right, var(--md-primary), var(--md-secondary));
        transition: width 0.1s ease;
      }
      
      .progress-milestone {
        animation: progress-pulse 1s ease;
      }
      
      @keyframes progress-pulse {
        0%, 100% {
          opacity: 1;
          height: 3px;
        }
        50% {
          opacity: 0.7;
          height: 5px;
        }
      }
    </style>
  `);
});

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
  const hero = document.querySelector('.hero');

  if (hero) {
    // Create canvas for particles
    const particleCanvas = document.createElement('canvas');
    particleCanvas.classList.add('particle-canvas');
    particleCanvas.style.position = 'absolute';
    particleCanvas.style.top = '0';
    particleCanvas.style.left = '0';
    particleCanvas.style.width = '100%';
    particleCanvas.style.height = '100%';
    particleCanvas.style.pointerEvents = 'none';
    particleCanvas.style.zIndex = '0';

    // Insert canvas as first child of hero
    hero.style.position = 'relative';
    hero.insertBefore(particleCanvas, hero.firstChild);

    // Particle system
    const ParticleNetwork = {
      ctx: null,
      canvas: null,
      particles: [],
      connections: [],
      mouseX: null,
      mouseY: null,
      animationFrame: null,

      init: function() {
        this.canvas = particleCanvas;
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        this.bindEvents();
      },

      bindEvents: function() {
        window.addEventListener('resize', this.resizeCanvas.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
      },

      onMouseMove: function(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
      },

      resizeCanvas: function() {
        const rect = hero.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;

        // Recreate particles when canvas resizes
        if (this.particles.length > 0) {
          this.particles = [];
          this.createParticles();
        }
      },

      createParticles: function() {
        const particleCount = Math.floor(this.canvas.width * this.canvas.height / 10000);

        for (let i = 0; i < particleCount; i++) {
          this.particles.push({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: Math.random() * 0.2 - 0.1,
            vy: Math.random() * 0.2 - 0.1,
            radius: Math.random() * 2 + 1,
            color: this.getRandomColor()
          });
        }
      },

      getRandomColor: function() {
        const colors = [
          'rgba(187, 134, 252, ',
          'rgba(3, 218, 198, ',
          'rgba(255, 255, 255, '
        ];
        const opacity = Math.random() * 0.5 + 0.1;
        return colors[Math.floor(Math.random() * colors.length)] + opacity + ')';
      },

      animate: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.updateParticles();
        this.drawParticles();

        // Request next frame
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
      },

      updateParticles: function() {
        this.particles.forEach(particle => {
          // Move particles
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Bounce off edges
          if (particle.x < 0 || particle.x > this.canvas.width) {
            particle.vx = -particle.vx;
          }

          if (particle.y < 0 || particle.y > this.canvas.height) {
            particle.vy = -particle.vy;
          }

          // Mouse interaction
          if (this.mouseX && this.mouseY) {
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Repel particles from mouse
            if (dist < 100) {
              const angle = Math.atan2(dy, dx);
              const force = (100 - dist) / 100;

              particle.vx -= Math.cos(angle) * force * 0.02;
              particle.vy -= Math.sin(angle) * force * 0.02;
            }
          }
        });
      },

      drawParticles: function() {
        const ctx = this.ctx;

        // Draw particles
        this.particles.forEach(particle => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        });

        // Draw connections
        this.particles.forEach((particle, i) => {
          for (let j = i + 1; j < this.particles.length; j++) {
            const p2 = this.particles[j];
            const dx = particle.x - p2.x;
            const dy = particle.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Only connect particles within a certain distance
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(p2.x, p2.y);

              // Opacity based on distance
              const opacity = 1 - dist / 100;
              ctx.strokeStyle = `rgba(187, 134, 252, ${opacity * 0.2})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      }
    };

    // Initialize the particle network
    ParticleNetwork.init();
  }
});

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.md-card, .project-card, .contact-card');

  // Set initial state
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });

  // Function to check if element is in viewport with offset
  function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight - offset) &&
      rect.bottom >= offset
    );
  }

  // Function to animate elements when they come into view
  function animateOnScroll() {
    cards.forEach((card, index) => {
      if (isInViewport(card, 50) && card.style.opacity === '0') {
        // Stagger animation based on index
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100 * (index % 3)); // Stagger by row
      }
    });
  }

  // Run on load and scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
});