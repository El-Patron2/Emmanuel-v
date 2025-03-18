// Highly Interactive Background with Cursor Trail
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = document.body.scrollHeight;

const particles = [];
const particleCount = 250;
let mouseX = 0;
let mouseY = 0;

class Particle {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
        this.life = Math.random() * 80 + 40;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;

        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
            this.speedX += dx * 0.02;
            this.speedY += dy * 0.02;
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        if (this.life <= 0) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.life = Math.random() * 80 + 40;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.fillStyle = 'rgba(26, 26, 46, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
}

animate();

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.x;
    mouseY = e.y;
    for (let i = 0; i < 8; i++) {
        const p = new Particle(e.x, e.y);
        p.speedX = Math.random() * 3 - 1.5;
        p.speedY = Math.random() * 3 - 1.5;
        p.life = 30;
        p.size = Math.random() * 5 + 2;
        particles.push(p);
    }
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
});

window.addEventListener('scroll', () => {
    canvas.height = document.body.scrollHeight;
});

// Interactive Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX - 10 + 'px';
    cursor.style.top = e.pageY - 10 + 'px';
});

document.querySelectorAll('a, .btn, .project-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Typed.js for Hero Section
const typed = new Typed('.typed-text', {
    strings: [
        'Computer Science Graduate'
    ],
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 1500,
    loop: true
});

// Fade-in Animation on Scroll
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

fadeElements.forEach(element => observer.observe(element));

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 50) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});