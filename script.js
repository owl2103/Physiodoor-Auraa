// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu && hamburger) {
        navMenu.classList.remove("active")
        hamburger.classList.remove("active")
      }
    })
  })

  // Initialize page
  showSection("home")

  // Initialize counters
  initializeCounters()

  // Initialize service filters
  initializeServiceFilters()

  // Add loading animation
  const elements = document.querySelectorAll(
    ".service-card, .testimonial-card, .contact-form, .contact-info, .package-card",
  )
  elements.forEach((el, index) => {
    el.classList.add("loading")
    setTimeout(() => {
      el.classList.add("loaded")
    }, 100 * index)
  })
})

// Section navigation
function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll(".section")
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  // Show target section
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    targetSection.classList.add("active")
  }

  // Update navigation active state
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.classList.remove("active")
    const href = link.getAttribute("href")
    if (href === `#${sectionId}`) {
      link.classList.add("active")
    }
  })

  // Close mobile menu if open
  const navMenu = document.querySelector(".nav-menu")
  const hamburger = document.querySelector(".hamburger")
  if (navMenu && hamburger) {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Navigation click handlers
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const sectionId = this.getAttribute("href").substring(1)
    showSection(sectionId)
  })
})

// WhatsApp Integration
function openWhatsApp() {
  const phoneNumber = "919547784509"
  const message = encodeURIComponent("Hi! I'm interested in booking a physiotherapy session. Can you help me?")
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`
  window.open(whatsappURL, "_blank")
}

// Emergency call function
function callEmergency() {
  window.location.href = "tel:9547784509"
}

// Counter animation
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number")

  const animateCounter = (counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  }

  // Intersection Observer for counters
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  })

  counters.forEach((counter) => {
    observer.observe(counter)
  })
}

// Service filters
function initializeServiceFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const serviceCards = document.querySelectorAll(".service-full-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"))
      // Add active class to clicked button
      btn.classList.add("active")

      const filter = btn.getAttribute("data-filter")

      serviceCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"
          card.style.animation = "fadeIn 0.5s ease-in-out"
        } else {
          card.style.display = "none"
        }
      })
    })
  })
}

// Service booking functions
function bookService(serviceType) {
  showSection("booking")

  // Pre-select the service
  setTimeout(() => {
    const serviceSelect = document.getElementById("serviceType")
    if (serviceSelect) {
      // Map service types to select options
      const serviceMap = {
        "back-pain": "Back Pain Therapy",
        neurological: "Neurological Rehab",
        orthopedic: "Orthopedic Care",
        sports: "Sports Rehabilitation",
        "post-surgery": "Post-Surgery Rehab",
        pediatric: "Pediatric Physio",
        respiratory: "Respiratory Therapy",
      }

      const serviceName = serviceMap[serviceType] || serviceType
      serviceSelect.value = serviceName
    }
  }, 100)
}

// Package booking functions
function bookPackage(packageType) {
  showSection("booking")

  // Pre-select the package
  setTimeout(() => {
    const serviceSelect = document.getElementById("serviceType")
    if (serviceSelect) {
      if (packageType === "weekly") {
        serviceSelect.value = "Weekly Package"
      } else if (packageType === "monthly") {
        serviceSelect.value = "Monthly Package"
      }
    }
  }, 100)
}

// FAQ functionality
function toggleFAQ(element) {
  const faqItem = element.parentElement
  const isActive = faqItem.classList.contains("active")

  // Close all FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add("active")
  }
}

// Form submissions
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")

    // Show success message
    showSuccessMessage(
      `Thank you, ${name}! Your ${subject} message has been submitted successfully. We'll get back to you soon at ${email}.`,
    )

    // Reset form
    this.reset()
  })
}

const bookingForm = document.getElementById("bookingForm")
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const name = formData.get("patientName")
    const service = formData.get("serviceType")
    const date = formData.get("appointmentDate")
    const time = formData.get("appointmentTime")
    const contact = formData.get("contactNumber")

    // Show appointment submitted message
    showSuccessMessage(
      `🎉 Your appointment has been submitted successfully!

Hi ${name},
Your ${service} session request for ${date} at ${time} has been received.

We'll contact you at ${contact} within 2 hours to confirm the details.

Thank you for choosing PhysioDoor!`,
    )

    // WhatsApp booking confirmation
    const whatsappMessage = encodeURIComponent(
      `🏥 *PHYSIODOOR BOOKING REQUEST*

👤 *Patient:* ${name}
🩺 *Service:* ${service}
📅 *Date & Time:* ${date} at ${time}
📱 *Contact:* ${contact}

Please confirm this appointment. Thank you!`,
    )

    // Open WhatsApp with booking details
    setTimeout(() => {
      window.open(`https://wa.me/919547784509?text=${whatsappMessage}`, "_blank")
    }, 2000)

    // Reset form
    this.reset()
  })
}

// Success message function
function showSuccessMessage(message) {
  // Create success modal
  const modal = document.createElement("div")
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    backdrop-filter: blur(10px);
  `

  const messageBox = document.createElement("div")
  messageBox.style.cssText = `
    background: rgba(26, 31, 46, 0.9);
    backdrop-filter: blur(20px);
    border: 2px solid var(--primary-teal);
    border-radius: 20px;
    padding: 3rem;
    max-width: 500px;
    text-align: center;
    color: var(--text-primary);
    box-shadow: var(--shadow-xl);
  `

  messageBox.innerHTML = `
    <div style="font-size: 3rem; color: var(--primary-teal); margin-bottom: 1rem;">
      <i class="fas fa-check-circle"></i>
    </div>
    <h3 style="margin-bottom: 1rem; color: var(--primary-teal);">Success!</h3>
    <p style="line-height: 1.6; margin-bottom: 2rem; white-space: pre-line;">${message}</p>
    <button onclick="this.closest('div').remove()" style="
      background: var(--primary-teal);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
    ">OK</button>
  `

  modal.appendChild(messageBox)
  document.body.appendChild(modal)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (modal.parentNode) {
      modal.remove()
    }
  }, 5000)
}

// Enhanced WhatsApp contact form function
function sendToWhatsApp() {
  const form = document.getElementById("contactForm")
  const formData = new FormData(form)

  const name = formData.get("name")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const subject = formData.get("subject")
  const message = formData.get("message")

  if (!name || !email || !phone || !subject || !message) {
    alert("Please fill in all required fields before sending to WhatsApp.")
    return
  }

  const whatsappMessage = encodeURIComponent(
    `🏥 *PHYSIODOOR CONTACT MESSAGE*

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Phone:* ${phone}
📋 *Subject:* ${subject}

💬 *Message:*
${message}

Please respond at your earliest convenience. Thank you!`,
  )

  window.open(`https://wa.me/919547784509?text=${whatsappMessage}`, "_blank")

  // Show success message
  showSuccessMessage(
    `Message sent to WhatsApp successfully!

Hi ${name}, your ${subject} message has been sent via WhatsApp. We'll respond shortly!`,
  )

  // Reset form
  form.reset()
}

// Advanced map functions
function showAllAreas() {
  const pins = document.querySelectorAll(".map-pin")
  const buttons = document.querySelectorAll(".map-control-btn")

  // Reset button states
  buttons.forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")

  // Show all pins
  pins.forEach((pin) => {
    pin.style.display = "block"
    pin.style.opacity = "1"
    pin.style.transform = "scale(1)"
  })
}

function showNearbyAreas() {
  const pins = document.querySelectorAll(".map-pin")
  const buttons = document.querySelectorAll(".map-control-btn")
  const nearbyAreas = ["pin-koregaon", "pin-viman", "pin-camp", "pin-shivaji"]

  // Reset button states
  buttons.forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")

  // Show only nearby pins
  pins.forEach((pin) => {
    const isNearby = nearbyAreas.some((area) => pin.classList.contains(area))
    if (isNearby) {
      pin.style.display = "block"
      pin.style.opacity = "1"
      pin.style.transform = "scale(1.1)"
    } else {
      pin.style.opacity = "0.3"
      pin.style.transform = "scale(0.8)"
    }
  })
}

function showPopularAreas() {
  const pins = document.querySelectorAll(".map-pin")
  const buttons = document.querySelectorAll(".map-control-btn")

  // Reset button states
  buttons.forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")

  // Show only popular pins
  pins.forEach((pin) => {
    if (pin.classList.contains("popular") || pin.classList.contains("premium")) {
      pin.style.display = "block"
      pin.style.opacity = "1"
      pin.style.transform = "scale(1.1)"
    } else {
      pin.style.opacity = "0.3"
      pin.style.transform = "scale(0.8)"
    }
  })
}

function showAdvancedAreaInfo(areaName, type) {
  const infoPanel = document.querySelector(".map-info-panel")
  const infoPanelContent = document.getElementById("infoPanelContent")

  const areaData = {
    "Koregaon Park": {
      description: "Premium residential area with high-end apartments and excellent connectivity.",
      patients: "150+",
      rating: "4.9/5",
      responseTime: "25 min",
      services: ["Back Pain", "Post-Surgery", "Sports Injury", "Geriatric Care"],
      features: ["Same-day appointments", "Premium equipment", "Specialized care"],
    },
    "Viman Nagar": {
      description: "Major IT hub with modern residential complexes and corporate offices.",
      patients: "200+",
      rating: "4.8/5",
      responseTime: "20 min",
      services: ["Neck Pain", "Ergonomic Issues", "Stress Relief"],
      features: ["Advanced technology", "Corporate-friendly", "Quick response"],
    },
    Kharadi: {
      description: "Emerging IT corridor with growing residential developments.",
      patients: "180+",
      rating: "4.7/5",
      responseTime: "30 min",
      services: ["Back Pain", "Sports Injury", "Orthopedic Care"],
      features: ["Flexible scheduling", "Modern equipment", "Expert care"],
    },
    Hadapsar: {
      description: "Industrial and residential area with good connectivity.",
      patients: "120+",
      rating: "4.6/5",
      responseTime: "35 min",
      services: ["General Physiotherapy", "Pain Management"],
      features: ["Affordable rates", "Quality service", "Experienced staff"],
    },
    Baner: {
      description: "Tech and residential hub with excellent infrastructure.",
      patients: "190+",
      rating: "4.8/5",
      responseTime: "25 min",
      services: ["Neurological Rehab", "Sports Medicine", "Pediatric Care"],
      features: ["Comprehensive care", "Latest techniques", "Family-friendly"],
    },
    Wakad: {
      description: "Growing suburban area with modern amenities.",
      patients: "110+",
      rating: "4.5/5",
      responseTime: "40 min",
      services: ["General Physiotherapy", "Elderly Care"],
      features: ["Personalized attention", "Home comfort", "Gentle approach"],
    },
    Hinjewadi: {
      description: "Major IT park location with high-tech infrastructure.",
      patients: "220+",
      rating: "4.9/5",
      responseTime: "20 min",
      services: ["Ergonomic Solutions", "Stress Management", "Corporate Wellness"],
      features: ["Tech-savvy approach", "Quick service", "Professional care"],
    },
    Aundh: {
      description: "Upscale residential area with premium facilities.",
      patients: "160+",
      rating: "4.8/5",
      responseTime: "25 min",
      services: ["Premium Care", "Specialized Treatment", "Wellness Programs"],
      features: ["Luxury service", "Expert therapists", "Comprehensive care"],
    },
    "Shivaji Nagar": {
      description: "Central Pune location with easy accessibility.",
      patients: "140+",
      rating: "4.6/5",
      responseTime: "30 min",
      services: ["General Physiotherapy", "Pain Relief", "Mobility Enhancement"],
      features: ["Central location", "Easy access", "Reliable service"],
    },
    "Camp Area": {
      description: "Historic city center with traditional charm.",
      patients: "130+",
      rating: "4.5/5",
      responseTime: "35 min",
      services: ["Traditional Therapy", "Elderly Care", "Pain Management"],
      features: ["Experienced care", "Traditional methods", "Trusted service"],
    },
  }

  if (areaData[areaName]) {
    const data = areaData[areaName]
    infoPanelContent.innerHTML = `
      <h3>${areaName}</h3>
      <p><strong>Description:</strong> ${data.description}</p>
      <p><strong>Patients Served:</strong> ${data.patients}</p>
      <p><strong>Rating:</strong> ${data.rating}</p>
      <p><strong>Average Response Time:</strong> ${data.responseTime}</p>
      <p><strong>Services Offered:</strong> ${data.services.join(", ")}</p>
      <p><strong>Features:</strong> ${data.features.join(", ")}</p>
    `
    infoPanel.style.display = "block"
    infoPanel.classList.add("active")
  } else {
    infoPanelContent.innerHTML = `
      <h3>${areaName}</h3>
      <p>We provide comprehensive physiotherapy services in this area.</p>
      <p>Contact us for more information about our services and availability.</p>
    `
    infoPanel.style.display = "block"
    infoPanel.classList.add("active")
  }
}

function closeInfoPanel() {
  const infoPanel = document.querySelector(".map-info-panel")
  infoPanel.style.display = "none"
  infoPanel.classList.remove("active")
}

// Utility functions
function showTerms() {
  alert(
    `Terms & Conditions:

1. All appointments must be confirmed 24 hours in advance
2. Cancellation policy: 4 hours notice required
3. Payment due at time of service
4. Professional conduct expected from all parties
5. Medical history must be disclosed for safety
6. Equipment will be sanitized before each session`,
  )
}

function showPrivacy() {
  alert(
    `Privacy Policy:

We protect your personal and medical information according to healthcare privacy standards. Your data is never shared with third parties without consent.

• Personal information is kept confidential
• Medical records are securely stored
• Payment information is encrypted
• Contact details used only for service delivery`,
  )
}

function showRefund() {
  alert(
    `Refund Policy:

• Full refund for cancellations 24+ hours in advance
• 50% refund for cancellations 4-24 hours in advance
• No refund for same-day cancellations
• Medical emergencies considered case-by-case
• Package refunds prorated based on sessions completed`,
  )
}

function showServiceAreas() {
  alert(
    `Service Areas in Pune:

• Koregaon Park - Premium residential area
• Viman Nagar - IT hub and residential zone
• Kharadi - Emerging IT corridor
• Hadapsar - Industrial and residential
• Baner - Tech and residential hub
• Wakad - Growing suburban area
• Hinjewadi - Major IT park location
• Aundh - Upscale residential area
• Shivaji Nagar - Central Pune location
• Camp Area - Historic city center

And surrounding areas. Contact us for specific location confirmation.`,
  )
}

function startAssessment() {
  alert("Health Assessment feature coming soon! For now, please book a consultation or contact us directly.")
}

// Smooth animations on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".service-card, .testimonial-card")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("loaded")
    }
  })
}

window.addEventListener("scroll", animateOnScroll)

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(26, 31, 46, 0.95)"
      navbar.style.backdropFilter = "blur(20px)"
    } else {
      navbar.style.background = "rgba(26, 31, 46, 0.8)"
      navbar.style.backdropFilter = "blur(20px)"
    }
  }
})

// Performance optimization
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loaded")
    }
  })
}, observerOptions)

// Observe elements for lazy loading
document.querySelectorAll(".loading").forEach((el) => {
  observer.observe(el)
})

console.log("PhysioDoor website loaded successfully! 🏥✨")
