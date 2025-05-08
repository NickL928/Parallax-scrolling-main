document.addEventListener('DOMContentLoaded', () => {
    const layers = document.querySelectorAll('.layer');
    const planets = document.querySelectorAll('.planet');
    const content = document.querySelector('.content');
    const enterBtn = document.querySelector('.enter-btn');
    const navigation = document.querySelector('.navigation');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentLayer = 0;
    const totalLayers = layers.length;
    
    // Initialize first layer
    layers[0].classList.add('active');
    
    // Enter button click handler
    enterBtn.addEventListener('click', () => {
        enterBtn.classList.add('hidden');
        navigation.classList.add('visible');
        content.classList.add('visible');
        updateNavigationButtons();
    });
    
    // Navigation button handlers
    prevBtn.addEventListener('click', () => {
        if (currentLayer > 0) {
            layers[currentLayer].classList.remove('active');
            currentLayer--;
            layers[currentLayer].classList.add('active');
            updateNavigationButtons();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentLayer < totalLayers - 1) {
            layers[currentLayer].classList.remove('active');
            currentLayer++;
            layers[currentLayer].classList.add('active');
            updateNavigationButtons();
        }
    });
    
    // Update navigation buttons state
    function updateNavigationButtons() {
        prevBtn.disabled = currentLayer === 0;
        nextBtn.disabled = currentLayer === totalLayers - 1;
    }
    
    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Move active layer
        const activeLayer = document.querySelector('.layer.active');
        if (activeLayer) {
            const speed = 0.1;
            const yPos = -(scrolled * speed);
            activeLayer.style.transform = `translateY(${yPos}px) translateZ(${activeLayer.style.transform.match(/translateZ\(([^)]+)\)/)?.[1] || '-1px'}) scale(${activeLayer.style.transform.match(/scale\(([^)]+)\)/)?.[1] || '2'})`;
        }
        
        // Move planets at different speeds
        planets.forEach((planet, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            const rotation = scrolled * 0.02;
            planet.style.transform = `translateY(${yPos}px) translateZ(${0.2 + (index * 0.2)}px) rotate(${rotation}deg)`;
        });
        
        // Move content with a slight delay
        content.style.transform = `translateY(${scrolled * 0.1}px) translateZ(1px)`;
    });
    
    // Add parallax effect to mouse movement
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Move active layer with mouse
        const activeLayer = document.querySelector('.layer.active');
        if (activeLayer) {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            const currentTransform = activeLayer.style.transform;
            const zValue = currentTransform.match(/translateZ\(([^)]+)\)/)?.[1] || '-1px';
            const scaleValue = currentTransform.match(/scale\(([^)]+)\)/)?.[1] || '2';
            activeLayer.style.transform = `translate(${moveX}px, ${moveY}px) translateZ(${zValue}) scale(${scaleValue})`;
        }
        
        // Move planets with mouse
        planets.forEach((planet, index) => {
            const moveX = (mouseX - 0.5) * (20 + index * 10);
            const moveY = (mouseY - 0.5) * (20 + index * 10);
            const currentTransform = planet.style.transform;
            const zValue = currentTransform.match(/translateZ\(([^)]+)\)/)?.[1] || '0.2px';
            const rotation = currentTransform.match(/rotate\(([^)]+)\)/)?.[1] || '0deg';
            planet.style.transform = `translate(${moveX}px, ${moveY}px) translateZ(${zValue}) rotate(${rotation})`;
        });
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 