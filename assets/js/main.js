// Main JavaScript file for TechGuy's Learning Hub

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initSearch();
    initProgressBars();
    initCodeHighlighting();
    initMobileMenu();
    initSmoothScrolling();
    initTypingEffect();
    initDarkModeToggle();
});

// Search functionality
function initSearch() {
    const searchBox = document.querySelector('.search-box');
    if (!searchBox) return;

    searchBox.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const contentSections = document.querySelectorAll('.card, h2, h3, p');
        
        contentSections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(query)) {
                section.style.display = 'block';
                if (query.length > 0) {
                    highlightText(section, query);
                }
            } else if (query.length > 0) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
                removeHighlight(section);
            }
        });
    });
}

// Highlight search terms
function highlightText(element, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    element.innerHTML = element.textContent.replace(regex, '<mark>$1</mark>');
}

// Remove search highlighting
function removeHighlight(element) {
    element.innerHTML = element.textContent;
}

// Progress bars animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width') || '75%';
                progressBar.style.width = width;
                progressBar.style.transition = 'width 1.5s ease-in-out';
            }
        });
    });

    progressBars.forEach(bar => observer.observe(bar));
}

// Code syntax highlighting
function initCodeHighlighting() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        // Add copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '📋 Copy';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #4a5568;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
        `;
        
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent);
            copyBtn.innerHTML = '✅ Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = '📋 Copy';
            }, 2000);
        });
        
        // Make code block container relative for absolute positioning
        const preElement = block.parentElement;
        preElement.style.position = 'relative';
        preElement.appendChild(copyBtn);
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.site-nav');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Typing effect for main headings
function initTypingEffect() {
    const mainHeading = document.querySelector('h1');
    if (!mainHeading) return;
    
    const text = mainHeading.textContent;
    mainHeading.textContent = '';
    mainHeading.style.borderRight = '2px solid #3498db';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            mainHeading.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            mainHeading.style.borderRight = 'none';
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Dark mode toggle
function initDarkModeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (!darkModeToggle) return;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

// Language progress calculator
function calculateProgress(language, currentXP, targetXP) {
    const progress = (currentXP / targetXP) * 100;
    return Math.min(progress, 100);
}

// Streak counter animation
function animateStreak(streakElement) {
    if (!streakElement) return;
    
    streakElement.style.transform = 'scale(1.2)';
    streakElement.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        streakElement.style.transform = 'scale(1)';
    }, 300);
}

// Add loading animation for content
function showLoading(element) {
    element.innerHTML = '<div class="loading-spinner">🔄 Loading...</div>';
}

function hideLoading(element) {
    const spinner = element.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

// Interactive algorithm visualization
function initAlgorithmVisualization() {
    const algorithmButtons = document.querySelectorAll('.algorithm-btn');
    
    algorithmButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const algorithm = btn.getAttribute('data-algorithm');
            visualizeAlgorithm(algorithm);
        });
    });
}

function visualizeAlgorithm(algorithm) {
    // This would contain the actual algorithm visualization logic
    console.log(`Visualizing ${algorithm} algorithm...`);
    // You can implement step-by-step visualization here
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            searchBox.focus();
        }
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        const nav = document.querySelector('.site-nav');
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    }
});

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Add tooltips for interactive elements
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        element.addEventListener('mouseenter', () => {
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - 30) + 'px';
            tooltip.style.opacity = '1';
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });
}

// Initialize tooltips
initTooltips();
