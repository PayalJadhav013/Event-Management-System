document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const addEventBtn = document.getElementById('addEventBtn');
    const viewEventsBtn = document.getElementById('viewEventsBtn');
    const upcomingEventsBtn = document.getElementById('upcomingEventsBtn');
    const pastEventsBtn = document.getElementById('pastEventsBtn');
    
    const addEventSection = document.getElementById('addEventSection');
    const viewEventsSection = document.getElementById('viewEventsSection');
    const upcomingEventsSection = document.getElementById('upcomingEventsSection');
    const pastEventsSection = document.getElementById('pastEventsSection');
    
    const eventForm = document.getElementById('eventForm');
    const eventsList = document.getElementById('eventsList');
    const upcomingEventsList = document.getElementById('upcomingEventsList');
    const pastEventsList = document.getElementById('pastEventsList');
    
    const searchEvent = document.getElementById('searchEvent');
    const filterEvents = document.getElementById('filterEvents');
    
    const modal = document.getElementById('eventModal');
    const closeBtn = document.querySelector('.close-btn');
    const editEventBtn = document.getElementById('editEventBtn');
    const deleteEventBtn = document.getElementById('deleteEventBtn');
    
    // Navbar and Footer elements
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarLinks = document.getElementById('navbarLinks');
    const navLinks = document.querySelectorAll('.nav-link');
    const footerLinks = document.querySelectorAll('.footer-link');
    
    // Event data
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let currentEventId = null;
    
    // Initialize the app
    init();
    
    function init() {
        // Set today's date as default in the date picker
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('eventDate').value = today;
        
        // Show add event section by default
        showSection('addEvent');
        
        // Load events
        renderEvents();
        renderUpcomingEvents();
        renderPastEvents();
        
        // Set up navbar toggle
        setupNavbar();
        
        // Set up navigation links
        setupNavigation();
    }
    
    // Setup navbar toggle functionality
    function setupNavbar() {
        navbarToggle.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });
        
        // Close navbar when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbarToggle.contains(e.target) && !navbarLinks.contains(e.target)) {
                navbarLinks.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    }
    
    // Setup navigation functionality
    function setupNavigation() {
        // Navbar links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu if open
                navbarLinks.classList.remove('active');
                navbarToggle.classList.remove('active');
                
                // Navigate to appropriate section
                if (link.id === 'navHome' || link.id === 'footerHome') {
                    showSection('addEvent');
                } else if (link.id === 'navEvents' || link.id === 'footerEvents') {
                    showSection('viewEvents');
                } else if (link.id === 'navAbout' || link.id === 'footerAbout') {
                    showAboutSection();
                } else if (link.id === 'navContact' || link.id === 'footerContact') {
                    showContactSection();
                }
            });
        });
        
        // Footer links
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Navigate to appropriate section
                if (link.id === 'footerHome') {
                    showSection('addEvent');
                } else if (link.id === 'footerEvents') {
                    showSection('viewEvents');
                } else if (link.id === 'footerAbout') {
                    showAboutSection();
                } else if (link.id === 'footerContact') {
                    showContactSection();
                }
                
                // Update navbar active state
                updateNavActiveState(link.id.replace('footer', 'nav'));
            });
        });
    }
    
    // Update navbar active state based on current section
    function updateNavActiveState(activeLinkId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.id === activeLinkId) {
                link.classList.add('active');
            }
        });
    }
    
    // Show about section
    function showAboutSection() {
        // Hide all content sections
        addEventSection.style.display = 'none';
        viewEventsSection.style.display = 'none';
        upcomingEventsSection.style.display = 'none';
        pastEventsSection.style.display = 'none';
        
        // Remove active class from sidebar buttons
        addEventBtn.classList.remove('active');
        viewEventsBtn.classList.remove('active');
        upcomingEventsBtn.classList.remove('active');
        pastEventsBtn.classList.remove('active');
        
        // Create and show about content if it doesn't exist
        let aboutSection = document.getElementById('aboutSection');
        if (!aboutSection) {
            aboutSection = document.createElement('div');
            aboutSection.id = 'aboutSection';
            aboutSection.className = 'content-section';
            aboutSection.innerHTML = `
                <h2>About EventPro</h2>
                <div class="about-content">
                    <p>EventPro is a comprehensive event management system designed to help you organize and manage all your events in one place.</p>
                    <p>Our mission is to simplify event planning and management for individuals and organizations of all sizes.</p>
                    <h3>Features:</h3>
                    <ul>
                        <li>Easy event creation and management</li>
                        <li>Upcoming and past event tracking</li>
                        <li>Detailed event information</li>
                        <li>Responsive design for all devices</li>
                    </ul>
                </div>
            `;
            document.querySelector('.content-area').appendChild(aboutSection);
        }
        aboutSection.style.display = 'block';
    }
    

    // Show contact section
    function showContactSection() {
        // Hide all content sections
        addEventSection.style.display = 'none';
        viewEventsSection.style.display = 'none';
        upcomingEventsSection.style.display = 'none';
        pastEventsSection.style.display = 'none';
        
        // Remove active class from sidebar buttons
        addEventBtn.classList.remove('active');
        viewEventsBtn.classList.remove('active');
        upcomingEventsBtn.classList.remove('active');
        pastEventsBtn.classList.remove('active');
        
        // Create and show contact content if it doesn't exist
        let contactSection = document.getElementById('contactSection');
        if (!contactSection) {
            contactSection = document.createElement('div');
            contactSection.id = 'contactSection';
            contactSection.className = 'content-section';
            contactSection.innerHTML = `
                <h2>Contact Us</h2>
                <div class="contact-content">
                    <div class="contact-info">
                        <p><i class="fas fa-map-marker-alt"></i> 23 Event Street, Pune, India</p>
                        <p><i class="fas fa-phone"></i> +91 8623004425</p>
                        <p><i class="fas fa-envelope"></i> info@eventpro.com</p>
                    </div>
                    <form class="contact-form">
                        <div class="form-group">
                            <label for="contactName">Your Name:</label>
                            <input type="text" id="contactName" required>
                        </div>
                        <div class="form-group">
                            <label for="contactEmail">Your Email:</label>
                            <input type="email" id="contactEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="contactMessage">Message:</label>
                            <textarea id="contactMessage" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="submit-btn">Send Message</button>
                    </form>
                </div>
            `;
            document.querySelector('.content-area').appendChild(contactSection);
            
            // Add form submission handler
            const contactForm = contactSection.querySelector('.contact-form');
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('contactName').value;
                const email = document.getElementById('contactEmail').value;
                const message = document.getElementById('contactMessage').value;
                
                // Create contact object
                const contactData = {
                    name: name,
                    email: email,
                    message: message,
                    timestamp: new Date().toISOString()
                };
                
                // Log to console
                console.log('Contact Form Submission:', contactData);
                
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset form
                contactForm.reset();
            });
        }
        contactSection.style.display = 'block';
    }

    
    // Navigation functions
    function showSection(section) {
        // Hide all content sections
        addEventSection.style.display = 'none';
        viewEventsSection.style.display = 'none';
        upcomingEventsSection.style.display = 'none';
        pastEventsSection.style.display = 'none';
        
        // Hide any dynamically added sections
        const aboutSection = document.getElementById('aboutSection');
        const contactSection = document.getElementById('contactSection');
        if (aboutSection) aboutSection.style.display = 'none';
        if (contactSection) contactSection.style.display = 'none';
        
        // Remove active class from all buttons
        addEventBtn.classList.remove('active');
        viewEventsBtn.classList.remove('active');
        upcomingEventsBtn.classList.remove('active');
        pastEventsBtn.classList.remove('active');
        
        // Show selected section and set active button
        switch(section) {
            case 'addEvent':
                addEventSection.style.display = 'block';
                addEventBtn.classList.add('active');
                updateNavActiveState('navHome');
                break;
            case 'viewEvents':
                viewEventsSection.style.display = 'block';
                viewEventsBtn.classList.add('active');
                updateNavActiveState('navEvents');
                break;
            case 'upcomingEvents':
                upcomingEventsSection.style.display = 'block';
                upcomingEventsBtn.classList.add('active');
                break;
            case 'pastEvents':
                pastEventsSection.style.display = 'block';
                pastEventsBtn.classList.add('active');
                break;
        }
    }
    
    // Event listeners for sidebar buttons
    addEventBtn.addEventListener('click', () => showSection('addEvent'));
    viewEventsBtn.addEventListener('click', () => showSection('viewEvents'));
    upcomingEventsBtn.addEventListener('click', () => showSection('upcomingEvents'));
    pastEventsBtn.addEventListener('click', () => showSection('pastEvents'));

    // Form submission
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventTime = document.getElementById('eventTime').value;
        const eventLocation = document.getElementById('eventLocation').value;
        const eventDescription = document.getElementById('eventDescription').value;
        
        const event = {
            id: Date.now().toString(),
            name: eventName,
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            description: eventDescription,
            createdAt: new Date().toISOString()
        };
        
        events.push(event);
        saveEvents();
        
        // Log the new event to console
        console.log('New Event Added:', {
            id: event.id,
            name: event.name,
            date: event.date,
            time: event.time,
            location: event.location,
            description: event.description,
            createdAt: event.createdAt
        });
        
        // Reset form
        eventForm.reset();
        document.getElementById('eventDate').value = new Date().toISOString().split('T')[0];
        
        // Update event lists
        renderEvents();
        renderUpcomingEvents();
        renderPastEvents();
        
        // Show success message
        alert('Event added successfully!');
    });
    
    // Render all events
    function renderEvents(filteredEvents = null) {
        const eventsToRender = filteredEvents || events;
        
        if (eventsToRender.length === 0) {
            eventsList.innerHTML = '<p>No events found.</p>';
            return;
        }
        
        eventsList.innerHTML = eventsToRender
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(event => createEventCard(event))
            .join('');
        
        // Add event listeners to view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const eventId = this.getAttribute('data-id');
                viewEventDetails(eventId);
            });
        });
    }
    
    // Render upcoming events
    function renderUpcomingEvents() {
        const today = new Date().toISOString().split('T')[0];
        const upcoming = events.filter(event => event.date >= today);
        
        if (upcoming.length === 0) {
            upcomingEventsList.innerHTML = '<p>No upcoming events.</p>';
            return;
        }
        
        upcomingEventsList.innerHTML = upcoming
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(event => createEventCard(event))
            .join('');
        
        // Add event listeners to view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const eventId = this.getAttribute('data-id');
                viewEventDetails(eventId);
            });
        });
    }
    
    // Render past events
    function renderPastEvents() {
        const today = new Date().toISOString().split('T')[0];
        const past = events.filter(event => event.date < today);
        
        if (past.length === 0) {
            pastEventsList.innerHTML = '<p>No past events.</p>';
            return;
        }
        
        pastEventsList.innerHTML = past
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(event => createEventCard(event))
            .join('');
        
        // Add event listeners to view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const eventId = this.getAttribute('data-id');
                viewEventDetails(eventId);
            });
        });
    }
    
    // Create event card HTML
    function createEventCard(event) {
        const eventDate = new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        return `
            <div class="event-card">
                <h3>${event.name}</h3>
                <p class="event-date"><i class="fas fa-calendar-day"></i> ${eventDate} at ${event.time}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                <div class="event-actions">
                    <button class="view-btn" data-id="${event.id}"><i class="fas fa-eye"></i> View</button>
                </div>
            </div>
        `;
    }
    
    // View event details in modal
    function viewEventDetails(eventId) {
        const event = events.find(e => e.id === eventId);
        if (!event) return;
        
        currentEventId = eventId;
        
        const eventDate = new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        document.getElementById('modalEventName').textContent = event.name;
        document.getElementById('modalEventDate').textContent = eventDate;
        document.getElementById('modalEventTime').textContent = event.time;
        document.getElementById('modalEventLocation').textContent = event.location;
        document.getElementById('modalEventDescription').textContent = event.description || 'No description provided.';
        
        modal.style.display = 'block';
    }
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Edit event
    editEventBtn.addEventListener('click', () => {
        const event = events.find(e => e.id === currentEventId);
        if (!event) return;
        
        // Fill the form with event data
        document.getElementById('eventName').value = event.name;
        document.getElementById('eventDate').value = event.date;
        document.getElementById('eventTime').value = event.time;
        document.getElementById('eventLocation').value = event.location;
        document.getElementById('eventDescription').value = event.description || '';
        
        // Remove the event from the list
        events = events.filter(e => e.id !== currentEventId);
        saveEvents();
        
        // Close modal and show add event section
        modal.style.display = 'none';
        showSection('addEvent');
    });
    
    // Delete event
    deleteEventBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this event?')) {
            events = events.filter(e => e.id !== currentEventId);
            saveEvents();
            
            // Update event lists
            renderEvents();
            renderUpcomingEvents();
            renderPastEvents();
            
            // Close modal
            modal.style.display = 'none';
        }
    });
    
    // Search and filter events
    searchEvent.addEventListener('input', filterAndSearchEvents);
    filterEvents.addEventListener('change', filterAndSearchEvents);
    
    function filterAndSearchEvents() {
        const searchTerm = searchEvent.value.toLowerCase();
        const filterValue = filterEvents.value;
        
        let filteredEvents = events;
        
        // Apply filter
        if (filterValue === 'upcoming') {
            const today = new Date().toISOString().split('T')[0];
            filteredEvents = filteredEvents.filter(event => event.date >= today);
        } else if (filterValue === 'past') {
            const today = new Date().toISOString().split('T')[0];
            filteredEvents = filteredEvents.filter(event => event.date < today);
        }
        
        // Apply search
        if (searchTerm) {
            filteredEvents = filteredEvents.filter(event => 
                event.name.toLowerCase().includes(searchTerm) || 
                event.location.toLowerCase().includes(searchTerm) ||
                (event.description && event.description.toLowerCase().includes(searchTerm))
            );
        }
        
        renderEvents(filteredEvents);
    }
    
    // Save events to localStorage
    function saveEvents() {
        localStorage.setItem('events', JSON.stringify(events));
    }
});