// Lenis smooth scrolling setup
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })
  
  // Get scroll value
  lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    console.log({ scroll, limit, velocity, direction, progress })
  })
  
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  
  requestAnimationFrame(raf)
  
  // Existing code
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-menu a');
  const navbar = document.querySelector('nav');
  const heroSection = document.querySelector('.hero');
  const heroCarousel = document.querySelector('.hero-carousel');
  const heroContent = document.querySelector('.hero-content');
  
  // Toggle mobile menu function
  function toggleMobileMenu() {
      mobileMenu.classList.toggle('active');
      burger.classList.toggle('toggle');
  }
  
  // Close mobile menu when a link is clicked
  function closeMobileMenu() {
      mobileMenu.classList.remove('active');
      burger.classList.remove('toggle');
  }
  
  // Event listeners for mobile menu
  burger.addEventListener('click', toggleMobileMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
      const isClickInsideMenu = mobileMenu.contains(event.target);
      const isClickOnBurger = burger.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnBurger && mobileMenu.classList.contains('active')) {
          closeMobileMenu();
      }
  });
  
  // Smooth scrolling for anchor links using Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          lenis.scrollTo(targetId);
      });
  });
  
  // Carousel functionality
  const carouselImages = document.querySelectorAll('.hero-image');
  let currentImageIndex = 0;
  
  function changeImage() {
      carouselImages[currentImageIndex].classList.remove('active');
      currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
      carouselImages[currentImageIndex].classList.add('active');
  }
  
  // Change image every 5 seconds
  setInterval(changeImage, 5000);
  
  // Start the carousel when the page loads
  function startCarousel() {
      carouselImages[currentImageIndex].classList.add('active');
  }
  
  // Make navbar sticky and transparent on scroll, and apply parallax effect
  lenis.on('scroll', ({ scroll }) => {
      // Navbar effects
      if (scroll > 50) {
          navbar.classList.add('sticky', 'transparent');
      } else {
          navbar.classList.remove('sticky', 'transparent');
      }
  
      // Parallax effect
      if (scroll <= heroSection.offsetHeight) {
          const parallaxValue = scroll * 0.5; // Adjust this value to change the parallax intensity
          heroCarousel.style.transform = `translateY(${parallaxValue}px)`;
          heroContent.style.transform = `translateY(${parallaxValue * 0.8}px)`; // Content moves slightly slower
      }
  });
  
  // Start the carousel when the page loads
  startCarousel();
  
  // GSAP ScrollTrigger setup
  gsap.registerPlugin(ScrollTrigger);
  
  // Update ScrollTrigger to work with Lenis
  function update(time) {
    lenis.raf(time);
    ScrollTrigger.update();
  }
  
  gsap.ticker.add(update);
  
 // Background and text color transition effect
gsap.to('.container', {
    backgroundColor: '#E0E0E0',
    color: 'black',
    duration: 2,
    ease: 'power1.inOut',
    scrollTrigger: {
        trigger: '.container',
        start: 'top 90%',
        end: 'top 10%',
        scrub: 1,
        markers: false, // Set to true for debugging
        toggleActions: 'play none none reverse'
    }
});

// H2 color transition
gsap.to('.news-section h2', {
    color: '#333',
    duration: 2,
    ease: 'power1.inOut',
    scrollTrigger: {
        trigger: '.container',
        start: 'top 90%',
        end: 'top 10%',
        scrub: 1,
        markers: false, // Set to true for debugging
        toggleActions: 'play none none reverse'
    }
});