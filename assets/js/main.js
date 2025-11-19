// Navbar burger
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('nav ul');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
  entries.forEach(entry => {
    if(!entry.isIntersecting){
      return;
    } else{
      entry.target.classList.add('show');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Search Filter for Mods Page
function filterMods() {
  const search = document.getElementById('modSearch').value.toLowerCase();
  const category = document.getElementById('modCategory').value.toLowerCase();
  const cards = document.querySelectorAll('.mod-card');
  
  cards.forEach(card => {
    const title = card.querySelector('h3').innerText.toLowerCase();
    const cat = card.dataset.category.toLowerCase();
    
    if(title.includes(search) && (category === 'all' || cat === category)){
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Contact Form Validation
function validateForm(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if(name === '' || email === '' || message === ''){
    alert('Please fill all fields');
    return false;
  } else{
    alert('Message sent!');
    e.target.reset();
  }
}

// Particle background
const canvas = document.createElement('canvas');
canvas.classList.add('particles');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let particlesArray;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw(){
    ctx.fillStyle = '#9b5cff';
    ctx.shadowColor = '#00fff7';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

function initParticles(){
  particlesArray = [];
  for(let i=0;i<100;i++){
    particlesArray.push(new Particle());
  }
}
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});
initParticles();
animateParticles();
