// ===== DOM ELEMENTS =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

// ===== MOBILE NAVIGATION =====
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.course-card, .experience-card, .portfolio-item, .testimonial-card, .feature, .about-card, .hero-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        counter.dataset.target = target;
        counter.textContent = '0';
        counterObserver.observe(counter);
    });
});

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target;
            const width = skillBar.style.width;
            skillBar.style.width = '0%';
            
            setTimeout(() => {
                skillBar.style.width = width;
            }, 200);
            
            skillObserver.unobserve(skillBar);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
});

// ===== CONTACT FORM HANDLING =====
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Խնդրում ենք լրացնել բոլոր պարտադիր դաշտերը', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Խնդրում ենք մուտքագրել վավեր էլ. փոստի հասցե', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Ուղարկվում է...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Ձեր հաղորդագրությունը հաջողությամբ ուղարկվեց!', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===== EMAIL VALIDATION =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// ===== LAZY LOADING FOR IMAGES =====
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// ===== SCROLL TO TOP BUTTON =====
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    button.addEventListener('mouseenter', () => {
        button.style.background = 'var(--secondary-color)';
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = 'var(--primary-color)';
        button.style.transform = 'scale(1)';
    });
}

// ===== FAQ FUNCTIONALITY =====
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// ===== ENHANCED SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('tutor-card') || 
                    entry.target.classList.contains('course-card')) {
                    const cards = entry.target.parentElement.querySelectorAll('.tutor-card, .course-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.course-card, .tutor-card, .faq-item, .feature, .about-card, .hero-card, .pricing-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== PARALLAX EFFECTS =====
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-card, .about-card');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== TYPING EFFECT =====
function initializeTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--accent-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                element.style.borderRight = 'none';
            }
        };
        
        // Start typing effect when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// ===== ELEMENTOR BUILDER INTERACTIONS =====
function initializeElementorBuilder() {
    const elementorBuilder = document.querySelector('.elementor-builder');
    const widgetItems = document.querySelectorAll('.widget-item');
    const droppableArea = document.getElementById('droppable-area');
    const elementContainers = document.querySelectorAll('.element-container');
    const tabs = document.querySelectorAll('.tab');
    const alignButtons = document.querySelectorAll('.align-btn');
    
    if (!elementorBuilder) return;
    
    // Add hover effect to builder
    elementorBuilder.addEventListener('mouseenter', () => {
        elementorBuilder.style.transform = 'scale(1.01)';
        elementorBuilder.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
    });
    
    elementorBuilder.addEventListener('mouseleave', () => {
        elementorBuilder.style.transform = 'scale(1)';
        elementorBuilder.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
    
    // Widget drag and drop functionality
    widgetItems.forEach(widget => {
        widget.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', widget.dataset.widget);
            widget.style.opacity = '0.5';
        });
        
        widget.addEventListener('dragend', (e) => {
            widget.style.opacity = '1';
        });
    });
    
    // Droppable area functionality
    droppableArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        droppableArea.classList.add('drag-over');
    });
    
    droppableArea.addEventListener('dragleave', () => {
        droppableArea.classList.remove('drag-over');
    });
    
    droppableArea.addEventListener('drop', (e) => {
        e.preventDefault();
        droppableArea.classList.remove('drag-over');
        
        const widgetType = e.dataTransfer.getData('text/plain');
        addElementToCanvas(widgetType);
    });
    
    // Element selection functionality
    elementContainers.forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remove selection from all elements
            elementContainers.forEach(el => el.classList.remove('selected'));
            
            // Select clicked element
            element.classList.add('selected');
            
            // Update settings panel
            updateSettingsPanel(element);
        });
    });
    
    // Tab switching functionality
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show device-specific info
            showDeviceInfo(tab.textContent);
        });
    });
    
    // Alignment buttons functionality
    alignButtons.forEach(button => {
        button.addEventListener('click', () => {
            alignButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Apply alignment to selected element
            applyAlignment(button.textContent);
        });
    });
    
    // Element controls functionality
    elementContainers.forEach(element => {
        const controls = element.querySelectorAll('.element-controls i');
        controls.forEach((control, index) => {
            control.addEventListener('click', (e) => {
                e.stopPropagation();
                
                switch(index) {
                    case 0: // Edit
                        editElement(element);
                        break;
                    case 1: // Copy
                        copyElement(element);
                        break;
                    case 2: // Delete
                        deleteElement(element);
                        break;
                }
            });
        });
    });
    
    // Action buttons functionality
    const saveBtn = document.querySelector('.btn-save');
    const previewBtn = document.querySelector('.btn-preview');
    const publishBtn = document.querySelector('.btn-publish');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            showNotification('Page saved successfully!', 'success');
        });
    }
    
    if (previewBtn) {
        previewBtn.addEventListener('click', () => {
            showNotification('Opening preview...', 'info');
        });
    }
    
    if (publishBtn) {
        publishBtn.addEventListener('click', () => {
            showNotification('Page published!', 'success');
        });
    }
}

// ===== ELEMENTOR HELPER FUNCTIONS =====

// Add element to canvas
function addElementToCanvas(widgetType) {
    const droppableArea = document.getElementById('droppable-area');
    const elementTemplates = {
        heading: {
            content: '<h2>New Heading</h2>',
            type: 'heading'
        },
        text: {
            content: '<p>New text content</p>',
            type: 'text'
        },
        button: {
            content: '<button class="elementor-button">New Button</button>',
            type: 'button'
        },
        image: {
            content: '<div class="image-placeholder"><i class="fas fa-image"></i><span>Image</span></div>',
            type: 'image'
        },
        icon: {
            content: '<i class="fas fa-star"></i>',
            type: 'icon'
        },
        spacer: {
            content: '<div class="spacer-element"></div>',
            type: 'spacer'
        }
    };
    
    const template = elementTemplates[widgetType];
    if (!template) return;
    
    const elementContainer = document.createElement('div');
    elementContainer.className = 'element-container';
    elementContainer.setAttribute('data-element', template.type);
    
    elementContainer.innerHTML = `
        <div class="element-content">
            ${template.content}
        </div>
        <div class="element-controls">
            <i class="fas fa-edit"></i>
            <i class="fas fa-copy"></i>
            <i class="fas fa-trash"></i>
        </div>
    `;
    
    // Add event listeners to new element
    addElementListeners(elementContainer);
    
    droppableArea.appendChild(elementContainer);
    
    // Show success message
    showNotification(`${widgetType} element added!`, 'success');
}

// Add event listeners to element
function addElementListeners(element) {
    // Selection
    element.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Remove selection from all elements
        document.querySelectorAll('.element-container').forEach(el => el.classList.remove('selected'));
        
        // Select clicked element
        element.classList.add('selected');
        
        // Update settings panel
        updateSettingsPanel(element);
    });
    
    // Controls
    const controls = element.querySelectorAll('.element-controls i');
    controls.forEach((control, index) => {
        control.addEventListener('click', (e) => {
            e.stopPropagation();
            
            switch(index) {
                case 0: // Edit
                    editElement(element);
                    break;
                case 1: // Copy
                    copyElement(element);
                    break;
                case 2: // Delete
                    deleteElement(element);
                    break;
            }
        });
    });
}

// Update settings panel
function updateSettingsPanel(element) {
    const elementType = element.dataset.element;
    const select = document.querySelector('.setting-group select');
    
    if (select) {
        select.value = elementType.charAt(0).toUpperCase() + elementType.slice(1);
    }
}

// Edit element
function editElement(element) {
    const content = element.querySelector('.element-content');
    const currentText = content.textContent.trim();
    
    const newText = prompt('Edit content:', currentText);
    if (newText !== null) {
        if (element.dataset.element === 'heading') {
            content.innerHTML = `<h2>${newText}</h2>`;
        } else if (element.dataset.element === 'text') {
            content.innerHTML = `<p>${newText}</p>`;
        } else if (element.dataset.element === 'button') {
            content.innerHTML = `<button class="elementor-button">${newText}</button>`;
        } else {
            content.textContent = newText;
        }
        
        showNotification('Element updated!', 'success');
    }
}

// Copy element
function copyElement(element) {
    const clonedElement = element.cloneNode(true);
    clonedElement.classList.remove('selected');
    
    // Add event listeners to cloned element
    addElementListeners(clonedElement);
    
    element.parentNode.insertBefore(clonedElement, element.nextSibling);
    showNotification('Element copied!', 'success');
}

// Delete element
function deleteElement(element) {
    if (confirm('Are you sure you want to delete this element?')) {
        element.remove();
        showNotification('Element deleted!', 'info');
    }
}

// Show device info
function showDeviceInfo(device) {
    const deviceInfo = {
        'Desktop': 'Desktop view - Full width layout',
        'Tablet': 'Tablet view - Responsive layout for tablets',
        'Mobile': 'Mobile view - Mobile-optimized layout'
    };
    
    showNotification(deviceInfo[device] || 'Device view changed', 'info');
}

// Apply alignment
function applyAlignment(alignment) {
    const selectedElement = document.querySelector('.element-container.selected');
    if (!selectedElement) return;
    
    const content = selectedElement.querySelector('.element-content');
    if (!content) return;
    
    // Remove existing alignment classes
    content.classList.remove('text-left', 'text-center', 'text-right');
    
    // Add new alignment class
    switch(alignment.toLowerCase()) {
        case 'left':
            content.classList.add('text-left');
            break;
        case 'center':
            content.classList.add('text-center');
            break;
        case 'right':
            content.classList.add('text-right');
            break;
    }
    
    showNotification(`Alignment set to ${alignment}`, 'success');
}

// ===== TOOL INFO MODAL =====
function showToolInfo(toolName, toolIndex) {
    const toolInfo = [
        {
            title: 'Header Tool',
            description: 'Կայքի վերնագիր և նավիգացիա',
            details: 'Այս գործիքով կարող եք ստեղծել կայքի վերնագիրը, լոգոն և հիմնական նավիգացիոն մենյուն:',
            features: ['Լոգո տեղադրում', 'Նավիգացիոն մենյու', 'Որոնման դաշտ', 'Սոցիալական ցանցերի հղումներ']
        },
        {
            title: 'Content Tool',
            description: 'Բովանդակության բլոկներ',
            details: 'Այս գործիքով կարող եք ավելացնել տեքստ, պատկերներ, վիդեո և այլ բովանդակություն:',
            features: ['Տեքստային բլոկներ', 'Պատկերների գալերեա', 'Վիդեո ներդիր', 'Կոճակներ և հղումներ']
        },
        {
            title: 'Footer Tool',
            description: 'Կայքի ստորագիր',
            details: 'Այս գործիքով կարող եք ստեղծել կայքի ստորագիրը և լրացուցիչ տեղեկություններ:',
            features: ['Կապի տվյալներ', 'Սոցիալական ցանցեր', 'Լրացուցիչ հղումներ', 'Հեղինակային իրավունք']
        }
    ];
    
    const info = toolInfo[toolIndex] || toolInfo[0];
    
    const modal = document.createElement('div');
    modal.className = 'tool-info-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${info.title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>${info.description}</strong></p>
                <p>${info.details}</p>
                <div class="features-list">
                    <h4>Հնարավորություններ:</h4>
                    <ul>
                        ${info.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary">Իմանալ ավելին</button>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const modalContent = modal.querySelector('.modal-content');
    
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    // Modal content styles
    modalContent.style.cssText = `
        background: var(--white);
        color: var(--text-color);
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        transform: scale(0.9);
        transition: transform 0.3s ease;
        border: 2px solid var(--border-color);
    `;
    
    // Style features list
    const featuresList = modal.querySelector('.features-list');
    featuresList.style.cssText = `
        background: var(--light-gray);
        padding: 15px;
        border-radius: 8px;
        margin: 15px 0;
    `;
    
    const featuresUl = modal.querySelector('ul');
    featuresUl.style.cssText = `
        list-style: none;
        padding: 0;
        margin: 10px 0 0 0;
    `;
    
    const featuresLi = modal.querySelectorAll('li');
    featuresLi.forEach(li => {
        li.style.cssText = `
            padding: 5px 0;
            border-bottom: 1px solid var(--border-color);
            position: relative;
            padding-left: 20px;
        `;
        li.innerHTML = `✓ ${li.textContent}`;
    });
    
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
    }, 10);
}

// ===== CARD INFO MODAL =====
function showCardInfo(cardIndex) {
    const cardInfo = [
        { title: 'Service Card', description: 'Ծառայությունների բլոկ' },
        { title: 'Product Card', description: 'Արտադրանքի բլոկ' },
        { title: 'Team Card', description: 'Թիմի անդամների բլոկ' }
    ];
    
    const info = cardInfo[cardIndex] || cardInfo[0];
    
    const modal = document.createElement('div');
    modal.className = 'card-info-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${info.title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${info.description}</p>
                <p>Կարող եք ավելացնել պատկեր, տեքստ և կոճակներ:</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary">Իմանալ ավելին</button>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const modalContent = modal.querySelector('.modal-content');
    
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    // Modal content styles
    modalContent.style.cssText = `
        background: var(--white);
        color: var(--text-color);
        border-radius: 15px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        transform: scale(0.9);
        transition: transform 0.3s ease;
        border: 2px solid var(--border-color);
    `;
    
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
    }, 10);
}

// ===== NAV INFO MODAL =====
function showNavInfo(navIndex) {
    const navInfo = [
        { title: 'Home', description: 'Գլխավոր էջ' },
        { title: 'About', description: 'Մեր մասին' },
        { title: 'Contact', description: 'Կապ' }
    ];
    
    const info = navInfo[navIndex] || navInfo[0];
    
    const modal = document.createElement('div');
    modal.className = 'nav-info-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${info.title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${info.description}</p>
                <p>Նավիգացիոն մենյուի հիմնական էջերից մեկը:</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary">Իմանալ ավելին</button>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const modalContent = modal.querySelector('.modal-content');
    
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    // Modal content styles
    modalContent.style.cssText = `
        background: var(--white);
        color: var(--text-color);
        border-radius: 15px;
        max-width: 350px;
        width: 90%;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        transform: scale(0.9);
        transition: transform 0.3s ease;
        border: 2px solid var(--border-color);
    `;
    
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
    }, 10);
}

// ===== INITIALIZE ALL FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', () => {
    // Create scroll to top button
    createScrollToTopButton();
    
    // Initialize FAQ functionality
    initializeFAQ();
    
    // Initialize enhanced scroll animations
    initializeScrollAnimations();
    
    // Initialize parallax effects
    initializeParallax();
    
    // Initialize typing effects
    initializeTypingEffect();
    
    // Initialize elementor builder interactions
    initializeElementorBuilder();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Initialize tooltips for skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.addEventListener('mouseenter', () => {
            const percent = bar.style.width;
            bar.title = `${percent} փորձ`;
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 1rem;
    }
    
    .scroll-to-top:hover {
        background: var(--secondary-color) !important;
        transform: scale(1.1) !important;
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
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

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Header scroll effect
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
🎉 WordPress Դասընթաց Website
📧 Contact: info@wordpress-course.am
📱 Phone: +374 XX XXX XXX
🌐 Website: https://wordpress-course.am
`);

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        showNotification,
        animateCounter
    };
}
