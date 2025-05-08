document.addEventListener('DOMContentLoaded', () => {
    const planets = document.querySelectorAll('.planet');
    const content = document.querySelector('.content');
    
    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Move planets at different speeds
        planets.forEach((planet, index) => {
            const speed = 0.2 + (index * 0.1); // Different speeds for each planet
            const yPos = -(scrolled * speed);
            planet.style.transform = `translateY(${yPos}px)`;
        });
        
        // Add subtle rotation to planets
        planets.forEach((planet, index) => {
            const rotation = scrolled * 0.02;
            planet.style.transform += ` rotate(${rotation}deg)`;
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
    
    // Add parallax effect to mouse movement
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        planets.forEach((planet, index) => {
            const moveX = (mouseX - 0.5) * (20 + index * 10);
            const moveY = (mouseY - 0.5) * (20 + index * 10);
            planet.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}); 