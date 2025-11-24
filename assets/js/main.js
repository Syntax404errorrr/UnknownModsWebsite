// =============================
// Navbar burger
// =============================
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('nav ul');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('not active');
});


// =============================
// Fade-in on scroll
// =============================
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
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
const canvas = document.createElement('canvas');
canvas.classList.add('particles');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.7,
  vy: (Math.random() - 0.5) * 0.7,
  radius: Math.random() * 1.5 + 0.5
}));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#00c6ff";
    ctx.fill();
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = "rgba(0,198,255,0.1)";
        ctx.stroke();
      }
    }
  }
}

function update() {
  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  }
}

function animate() {
  draw();
  update();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
