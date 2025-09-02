// Portfolio JavaScript - LocalStack Inspired

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initNavigation()
  initScrollAnimations()
  initThemeToggle()
  initContactForm()
  initTypingEffect()
  initParallax()
})

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById("mainNav")
  const navLinks = document.querySelectorAll(".nav-link")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Active nav link highlighting
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section[id]")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Smooth scroll for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".skill-category, .project-card, .contact-item, .stat-item")
  animatedElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
}

// Theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle")
  const body = document.body
  const icon = themeToggle.querySelector("i")

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    body.classList.toggle("dark-theme", savedTheme === "dark")
    updateThemeIcon(icon, savedTheme === "dark")
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme")
    const isDark = body.classList.contains("dark-theme")

    localStorage.setItem("theme", isDark ? "dark" : "light")
    updateThemeIcon(icon, isDark)
  })

  function updateThemeIcon(icon, isDark) {
    icon.className = isDark ? "fas fa-sun" : "fas fa-moon"
  }
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const name = formData.get("name") || document.getElementById("name").value
    const email = formData.get("email") || document.getElementById("email").value
    const subject = formData.get("subject") || document.getElementById("subject").value
    const message = formData.get("message") || document.getElementById("message").value

    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification("Por favor, completa todos los campos.", "error")
      return
    }

    if (!isValidEmail(email)) {
      showNotification("Por favor, ingresa un email válido.", "error")
      return
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...'
    submitBtn.disabled = true

    // Simulate API call
    setTimeout(() => {
      showNotification("¡Mensaje enviado correctamente! Te contactaré pronto.", "success")
      contactForm.reset()

      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  })

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `alert alert-${type === "success" ? "success" : "danger"} position-fixed`
    notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            animation: slideIn 0.3s ease;
        `
    notification.innerHTML = `
            <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"} me-2"></i>
            ${message}
            <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
        `

    document.body.appendChild(notification)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove()
      }
    }, 5000)
  }
}

// Typing effect for hero section
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero-content h1 .text-gradient")
  if (!heroTitle) return

  const texts = ["Tu Nombre", "Desarrollador", "Creador", "Innovador"]
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeEffect() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      heroTitle.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      heroTitle.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 100 : 150

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000 // Pause at end
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500 // Pause before next word
    }

    setTimeout(typeEffect, typeSpeed)
  }

  // Start typing effect after a delay
  setTimeout(typeEffect, 1000)
}

// Parallax effect for floating shapes
function initParallax() {
  const shapes = document.querySelectorAll(".shape")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.3
      shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`
    })
  })
}

// Skill bars animation
function initSkillBars() {
  const skillItems = document.querySelectorAll(".skill-item")

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = `${Math.random() * 0.5}s`
          entry.target.classList.add("animate")
        }
      })
    },
    { threshold: 0.5 },
  )

  skillItems.forEach((item) => {
    skillObserver.observe(item)
  })
}

// Project card hover effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Add loading animation to page
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Animate elements on load
  const elements = document.querySelectorAll(".loading")
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("loaded")
    }, index * 100)
  })
})

// Smooth reveal animation for sections
function revealOnScroll() {
  const reveals = document.querySelectorAll(".fade-in")

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("visible")
    }
  })
}

window.addEventListener("scroll", revealOnScroll)

// Initialize skill bars animation
initSkillBars()

// Console message for developers
console.log(`
🚀 ¡Hola desarrolladora!
Este portafolio fue creado con amor y café ☕
¿Te gusta lo que ves? ¡Hablemos!

Tecnologías utilizadas:
- HTML5 & CSS3
- JavaScript ES6+
- Bootstrap 5
- Font Awesome
- Intersection Observer API

Inspirado en el diseño de LocalStack
`)
