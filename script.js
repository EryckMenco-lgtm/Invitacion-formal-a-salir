// ---- PARTÍCULAS ----
const particlesEl = document.getElementById('particles');
const items = ['🌹', '🥀', '💋', '✨', '💕', '🌸'];

for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = items[Math.floor(Math.random() * items.length)];
    p.style.cssText = `
        left: ${Math.random() * 100}%;
        font-size: ${Math.random() * 14 + 9}px;
        animation-duration: ${Math.random() * 10 + 7}s;
        animation-delay: ${Math.random() * 12}s;
        opacity: 0;
    `;
    particlesEl.appendChild(p);
}

// ---- BOTÓN "NO" ESCAPADOR ----
const btnNo   = document.getElementById('btnNo');
const btnSi   = document.getElementById('btnSi');
const overlay = document.getElementById('overlay');

let isFixed = false;
let lastX = -999, lastY = -999;

function getRandomPos() {
    const margin = 24;
    const w  = btnNo.offsetWidth  || 120;
    const h  = btnNo.offsetHeight || 54;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x, y, attempts = 0;
    do {
        x = Math.random() * (vw - w - margin * 2) + margin;
        y = Math.random() * (vh - h - margin * 2) + margin;
        attempts++;
    } while (
        attempts < 20 &&
        Math.abs(x - lastX) < 110 &&
        Math.abs(y - lastY) < 110
    );

    lastX = x; lastY = y;
    return { x, y };
}

function makeFixed() {
    if (isFixed) return;
    const rect = btnNo.getBoundingClientRect();
    btnNo.style.position = 'fixed';
    btnNo.style.left   = rect.left + 'px';
    btnNo.style.top    = rect.top  + 'px';
    btnNo.style.margin = '0';
    btnNo.style.zIndex = '100';
    isFixed = true;
}

function escape() {
    makeFixed();
    const { x, y } = getRandomPos();
    btnNo.style.left = x + 'px';
    btnNo.style.top  = y + 'px';
}

// Desktop
btnNo.addEventListener('mouseenter', escape);

// Mobile: escapar al tocar
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    escape();
}, { passive: false });

// Mobile: si el dedo se acerca a menos de 90px, escapa
document.addEventListener('touchmove', (e) => {
    if (!isFixed) return;
    const touch = e.touches[0];
    const rect  = btnNo.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    if (Math.hypot(touch.clientX - cx, touch.clientY - cy) < 90) escape();
}, { passive: true });

// ---- BOTÓN "SÍ" ----
btnSi.addEventListener('click', () => overlay.classList.add('show'));
btnSi.addEventListener('touchend', (e) => {
    e.preventDefault();
    overlay.classList.add('show');
});
