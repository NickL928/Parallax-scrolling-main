document.addEventListener('DOMContentLoaded', () => {
    const layers = document.querySelectorAll('.layer');
    const planets = document.querySelectorAll('.planet');
    const content = document.querySelector('.content');
    
    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Move background layers at different speeds
        layers.forEach((layer, index) => {
            const speed = 0.1 + (index * 0.1); // Different speeds for each layer
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px) translateZ(${-1 + (index * 0.2)}px) scale(${2 - (index * 0.2)})`;
        });
        
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
        
        // Move background layers with mouse
        layers.forEach((layer, index) => {
            const moveX = (mouseX - 0.5) * (10 + index * 5);
            const moveY = (mouseY - 0.5) * (10 + index * 5);
            layer.style.transform += ` translate(${moveX}px, ${moveY}px)`;
        });
        
        // Move planets with mouse
        planets.forEach((planet, index) => {
            const moveX = (mouseX - 0.5) * (20 + index * 10);
            const moveY = (mouseY - 0.5) * (20 + index * 10);
            planet.style.transform += ` translate(${moveX}px, ${moveY}px)`;
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