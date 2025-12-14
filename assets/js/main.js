// =============================
// Navbar burger
// =============================
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('nav ul');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


// =============================
// Fade-in on scroll
// =============================
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add('show');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});


// =============================
// Search filter for mod cards
// =============================
const searchInput = document.getElementById('search');
const modCards = document.querySelectorAll('.mod-card');

if (searchInput) {
  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    modCards.forEach(card => {
      const appName = card.querySelector('h3').textContent.toLowerCase();
      card.style.display = appName.includes(query) ? 'block' : 'none';
    });
  });
}


// =============================
// Contact Form – Formspree + Notifications
// =============================
const form = document.getElementById('contactForm');
const alertBox = document.getElementById('formAlert');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
      showAlert("Please fill all fields", "error");
      return;
    }

    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      });

      if (res.ok) {
        showAlert("Message sent successfully!", "success");
        form.reset();
      } else {
        showAlert("Failed to send message. Try again.", "error");
      }
    } catch (err) {
      showAlert("Network error. Please try again.", "error");
    }
  });
}

function showAlert(msg, type) {
  if (!alertBox) return;

  alertBox.textContent = msg;

  if (type === "success") {
    alertBox.style.background = "rgba(0,255,100,0.15)";
    alertBox.style.border = "1px solid #00ff7b";
    alertBox.style.color = "#00ff7b";
  } else {
    alertBox.style.background = "rgba(255,0,0,0.15)";
    alertBox.style.border = "1px solid #ff4444";
    alertBox.style.color = "#ff4444";
  }

  alertBox.style.opacity = "1";

  setTimeout(() => {
    alertBox.style.opacity = "0";
  }, 3500);
}


// =============================
// Particle Background Animation
// =============================
const canvas = document.getElementById('bgCanvas'); const ctx = canvas.getContext('2d'); let particles = []; const PARTICLE_COUNT = 80; function resizeCanvas() {canvas.width = window.innerWidth; canvas.height = window.innerHeight; } window.addEventListener('resize', resizeCanvas); resizeCanvas(); class Particle {constructor() {this.reset(); } reset() {this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.vx = (Math.random() - 0.5) * 0.8; this.vy = (Math.random() - 0.5) * 0.8; this.size = Math.random() * 3 + 1; } update() {this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset(); } draw() {ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); } } for (let i = 0; i < PARTICLE_COUNT; i++) {particles.push(new Particle()); } function animate() {ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => {p.update(); p.draw(); }); requestAnimationFrame(animate); } animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
