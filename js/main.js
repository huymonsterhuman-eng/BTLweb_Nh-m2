
document.addEventListener('DOMContentLoaded', function() {
    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if(name && email && message) {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Property search form handling
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const location = document.getElementById('location').value;
            const propertyType = document.getElementById('property-type').value;
            const priceRange = document.getElementById('price-range').value;
            
            alert('Searching for properties...');
            // Redirect to properties page with filters
            window.location.href = `properties.html?location=${location}&type=${propertyType}&price=${priceRange}`;
        });
    }

    // Filter form handling
    const filterForm = document.querySelector('.filter-form');
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Filters applied!');
        });
    }

    // Newsletter form handling
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
    });

    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation.split('/').pop()) {
            link.classList.add('active');
        }
    });

    // Initialize popup except on specific pages
    const currentPage = currentLocation.split('/').pop().toLowerCase();
    const pagesWithoutPopup = ['about.html', 'agents.html', 'properties.html'];
    if (!pagesWithoutPopup.includes(currentPage)) {
        initializePopup();
    }

});

// SIMPLE POPUP VERSION
function initializePopup() {
    // Create popup HTML
    const popupHTML = `
        <div class="popup-overlay" id="customerPopup">
            <div class="popup-modal">
                <button class="close-popup" id="closePopup">&times;</button>
                <div class="popup-header">
                    <h2>Get Personalized Advice</h2>
                    <p>Let us help you find your dream property. Share your details and we'll contact you with expert recommendations.</p>
                </div>
                <form class="popup-form" id="popupForm">
                    <div class="form-group">
                        <label for="popupName">Full Name *</label>
                        <input type="text" id="popupName" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="popupEmail">Email Address *</label>
                        <input type="email" id="popupEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="popupPhone">Phone Number *</label>
                        <input type="tel" id="popupPhone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="popupInterest">Property Interest</label>
                        <select id="popupInterest" name="interest">
                            <option value="">Select your interest</option>
                            <option value="buying">Buying</option>
                            <option value="selling">Selling</option>
                            <option value="renting">Renting</option>
                            <option value="investment">Investment</option>
                            <option value="consultation">General Consultation</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="popupBudget">Budget Range</label>
                        <select id="popupBudget" name="budget">
                            <option value="">Select budget range</option>
                            <option value="0-500000">$0 - $500,000</option>
                            <option value="500000-1000000">$500,000 - $1,000,000</option>
                            <option value="1000000-2000000">$1,000,000 - $2,000,000</option>
                            <option value="2000000+">$2,000,000+</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="popupMessage">Additional Requirements</label>
                        <textarea id="popupMessage" name="message" placeholder="Tell us about your specific needs, preferred locations, or any other requirements..."></textarea>
                    </div>
                    <div class="popup-actions">
                        <button type="submit" class="btn">Get Free Consultation</button>
                        <button type="button" class="btn btn-outline" id="laterBtn">Maybe Later</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Add popup to body
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    const popup = document.getElementById('customerPopup');
    const closePopup = document.getElementById('closePopup');
    const laterBtn = document.getElementById('laterBtn');
    const popupForm = document.getElementById('popupForm');

    // ALWAYS SHOW ON REFRESH - Simple approach
    const showImmediately = sessionStorage.getItem('showPopupImmediately');
    
    console.log('Popup check - showImmediately:', showImmediately); // Debug log
    
    if (showImmediately === 'true') {
        // Show immediately on refresh
        console.log('Showing popup immediately (refresh detected)');
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        sessionStorage.removeItem('showPopupImmediately'); // Clear for next time
    } else {
        // Show after 3 seconds for first visit
        console.log('Showing popup after delay (first visit)');
        setTimeout(() => {
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }, 3000);
    }

    // Set flag for next refresh
    window.addEventListener('beforeunload', function() {
        console.log('Setting showPopupImmediately for next refresh');
        sessionStorage.setItem('showPopupImmediately', 'true');
    });

    // Close popup functions
    function closePopupModal() {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closePopup.addEventListener('click', closePopupModal);
    laterBtn.addEventListener('click', closePopupModal);

    popup.addEventListener('click', function(e) {
        if (e.target === popup) closePopupModal();
    });

    popupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('popupName').value;
        const email = document.getElementById('popupEmail').value;
        const phone = document.getElementById('popupPhone').value;
        
        if (name && email && phone) {
            alert('Thank you! Our expert will contact you within 24 hours with personalized advice.');
            closePopupModal();
            this.reset();
        } else {
            alert('Please fill in all required fields (Name, Email, Phone).');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.style.display === 'flex') {
            closePopupModal();
        }
    });
}

// TEST FUNCTION: Force show popup (add this to browser console to test)
function showPopupNow() {
    const popup = document.getElementById('customerPopup');
    if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('Popup shown manually');
    } else {
        console.log('Popup element not found');
    }
}

// TEST FUNCTION: Reset all popup settings (add this to browser console to test)
function resetPopupSettings() {
    localStorage.removeItem('popupFormSubmitted');
    localStorage.removeItem('popupLastCloseTime');
    sessionStorage.removeItem('showPopupImmediately');
    console.log('Popup settings reset. Refresh the page to see popup again.');
}

