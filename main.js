/* Main JavaScript for Easy ReFixLab */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Hamburger Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle hamburger animation
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
            spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
        });
    }

    // 2. Animated Stats Counters
    const counters = document.querySelectorAll('.counter-num');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 40; // speed division

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 25);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Trigger counters only when they enter view
    if (counters.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(c => counterObserver.observe(c));
    }

    // 3. Simple Hero Tagline Fade Carousel (if index page)
    const heroTaglines = document.querySelectorAll('.hero-tagline');
    if (heroTaglines.length > 1) {
        let currentIndex = 0;
        setInterval(() => {
            heroTaglines[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % heroTaglines.length;
            heroTaglines[currentIndex].classList.add('active');
        }, 3500);
    }

    // 4. Testimonials Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (testimonialSlides.length > 1) {
        let activeIdx = 0;
        const showSlide = (idx) => {
            testimonialSlides.forEach((slide, sIdx) => {
                slide.classList.toggle('active', sIdx === idx);
            });
            dots.forEach((dot, dIdx) => {
                dot.classList.toggle('active', dIdx === idx);
            });
        };

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                activeIdx = parseInt(e.target.getAttribute('data-index'));
                showSlide(activeIdx);
            });
        });

        // Auto rotation
        setInterval(() => {
            activeIdx = (activeIdx + 1) % testimonialSlides.length;
            showSlide(activeIdx);
        }, 5000);
    }

    // 5. Services Details Modals
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    const serviceDetails = {
        screen: {
            title: 'Touch Screen Replacement',
            text: 'We provide prompt and top-grade glass/digitizer & LCD panel replacement service for all laptop brands (including Retina MacBooks), smartphones, and tablets. We use high-precision tools and original spec replacement adhesive, restoring your touch response and visual quality perfectly.'
        },
        upgrade: {
            title: 'Laptop & Mac Upgrade',
            text: 'Breathe new life into your system. We perform custom SSD upgrades, RAM installations, performance cleanups, thermal paste re-applications (using premium thermal conductors), and operating system installations. Upgrading can speed up your machine by up to 10x.'
        },
        smartphone: {
            title: 'Repair Smartphone',
            text: 'From battery replacements and charging port cleaning to water damage recovery, speaker fixing, and logic board micro-soldering, our experienced specialists handle Apple iOS, Samsung Galaxy, and other major Android devices with complete care.'
        },
        tablet: {
            title: 'Tablet Repair',
            text: 'Cracked screen, battery drainage, or broken buttons? We repair iPads, Samsung Galaxy Tabs, and other major tablets. We can upgrade storage capacities, fix charging logic ICs, and restore front/rear cameras to original factory specs.'
        },
        hardware: {
            title: 'Repair Laptop & PC Hardware',
            text: 'We specialize in chip-level diagnostics and repair of motherboards. By repairing components (MOSFETs, capacitors, IO chips, and GPU reballing) instead of replacing the entire motherboard, we save our clients significant hardware replacement costs.'
        },
        aio: {
            title: 'All In One PC Repair',
            text: 'We handle power supply replacements, motherboard logic repairs, screen assembly repairs, internal hard drive replacement with custom SSD installations, and general preventive maintenance (dusting, cooling fan repairs) for high-end all-in-one machines, iMacs, and HP/Dell AIO systems.'
        }
    };

    document.querySelectorAll('.btn-learn-more').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-service');
            if (serviceDetails[key] && modal) {
                modalTitle.innerText = serviceDetails[key].title;
                modalBody.innerText = serviceDetails[key].text;
                modal.classList.add('active');
            }
        });
    });

    if (modalClose && modal) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // 6. Interactive Booking & Contact Form Submission (Feedback overlays)
    const bookingForm = document.getElementById('bookingForm');
    const successModal = document.getElementById('successModal');
    const successClose = document.getElementById('successClose');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple Client-side Validation (All fields marked required)
            let isValid = true;
            const requiredFields = bookingForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            if (isValid) {
                // Display confirmation details in success modal
                const nameVal = document.getElementById('bookName')?.value || 'Valued Customer';
                const serviceVal = document.getElementById('bookService')?.value || 'Repair';
                const dateVal = document.getElementById('bookDate')?.value || 'Today';
                const timeVal = document.getElementById('bookTime')?.value || 'Scheduled Time';

                const detailsPlaceholder = document.getElementById('bookingDetailsSummary');
                if (detailsPlaceholder) {
                    detailsPlaceholder.innerHTML = `
                        <strong>Name:</strong> ${nameVal}<br>
                        <strong>Service:</strong> ${serviceVal}<br>
                        <strong>Date:</strong> ${dateVal}<br>
                        <strong>Time:</strong> ${timeVal}
                    `;
                }

                if (successModal) {
                    successModal.classList.add('active');
                }
                bookingForm.reset();
            }
        });
    }

    if (successClose && successModal) {
        successClose.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }

    // Simple contact form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out! We will contact you shortly.');
            contactForm.reset();
        });
    }

    // 7. Inject Floating WhatsApp Button
    const waButton = document.createElement('a');
    waButton.href = 'https://wa.me/919785021977';
    waButton.className = 'whatsapp-float';
    waButton.target = '_blank';
    waButton.rel = 'noopener noreferrer';
    waButton.setAttribute('aria-label', 'Chat on WhatsApp');
    waButton.innerHTML = `
        <svg class="whatsapp-icon" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.284 1.489 4.904 1.49 5.247.003 9.585-4.234 9.588-9.48.002-2.542-.99-4.93-2.793-6.735C16.545 2.624 14.156 1.63 11.62 1.63c-5.25 0-9.591 4.237-9.593 9.483-.001 1.761.472 3.42 1.372 4.908l-.938 3.425 3.596-.927zm10.748-6.195c-.3-.15-1.774-.875-2.029-.968-.254-.093-.44-.139-.624.139-.184.278-.713.896-.874 1.082-.16.186-.322.208-.622.058-.3-.15-1.267-.467-2.415-1.492-.893-.797-1.497-1.782-1.672-2.083-.176-.3-.019-.462.13-.611.135-.134.3-.35.45-.525.15-.175.2-.292.3-.487.1-.195.05-.367-.025-.517-.075-.15-.624-1.502-.855-2.058-.225-.54-.45-.467-.624-.476-.16-.008-.344-.01-.529-.01-.186 0-.488.07-.743.348-.256.279-.977.955-.977 2.33 0 1.375 1.002 2.7 1.142 2.887.14.188 1.972 3.01 4.777 4.22.667.288 1.189.46 1.597.59.672.213 1.282.183 1.765.11.539-.08 1.774-.725 2.029-1.425.255-.7 2.55-2.55.255-2.55 0-.1.01-.15-.025-.3z"/>
        </svg>
        <span class="whatsapp-tooltip">Chat with us</span>
    `;
    document.body.appendChild(waButton);
});
