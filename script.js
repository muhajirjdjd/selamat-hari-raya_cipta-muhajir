// Music Player Logic
const audio = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');

let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
}

// Autoplay music on page load (optional)
window.addEventListener('load', () => {
    audio.play();
    isPlaying = true;
});

// Function to open the QR modal
function openQRModal() {
    const qrModal = document.getElementById('qrModal');
    qrModal.classList.add('show');
}

// Function to close the QR modal
function closeQRModal() {
    const qrModal = document.getElementById('qrModal');
    qrModal.classList.remove('show');
}

// Particle Animation
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particlesArray = [];

class Particle {
    constructor(x, y, size, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.05;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 5 + 1;
    const speedX = Math.random() * 3 - 1.5;
    const speedY = Math.random() * 3 - 1.5;
    const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;

    particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

setInterval(createParticles, 50);
animate();