const workArea = document.getElementById('workArea');
const panel = document.getElementById('dragPanel');
const coordsDisplay = document.getElementById('coords');
const speedDisplay = document.getElementById('speedDisplay');
const resetBtn = document.getElementById('resetBtn');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Hız ve momentum için değişkenler
let vx = 0;
let vy = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let animationId = null;

// Hızlanma katsayısı - Çarpma anında uygulanacak (%10 artış)
const hitAcceleration = 1.1;
// Zıplama katsayısı - Temel yansıma (hitAcceleration ile birleşecek)
const bounce = -1.0;

const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffa500", "#ffffff"];
let currentColorIndex = 0;

function changeColor() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    panel.style.color = colors[currentColorIndex];
}

function centerPanel() {
    stopPhysics();
    const maxX = workArea.clientWidth - panel.clientWidth;
    const maxY = workArea.clientHeight - panel.clientHeight;
    
    const centerX = maxX / 2;
    const centerY = maxY / 2;

    panel.style.left = centerX + 'px';
    panel.style.top = centerY + 'px';
    panel.style.transform = 'none'; 
    panel.style.transition = 'none';
    
    vx = 0;
    vy = 0;
    updateCoords(centerX, centerY);
    updateSpeed(0);
}

function updateCoords(x, y) {
    coordsDisplay.textContent = `X: ${Math.round(x)}, Y: ${Math.round(y)}`;
}

function updateSpeed(v) {
    const virtualKmh = Math.round(v * 15);
    speedDisplay.textContent = virtualKmh;
}

function stopPhysics() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

function startPhysics() {
    stopPhysics();
    
    if (Math.abs(vx) < 3) vx = vx > 0 ? 3 : -3;
    if (Math.abs(vy) < 3) vy = vy > 0 ? 3 : -3;

    function animate() {
        const maxSpeed = 100;
        if (vx > maxSpeed) vx = maxSpeed;
        if (vx < -maxSpeed) vx = -maxSpeed;
        if (vy > maxSpeed) vy = maxSpeed;
        if (vy < -maxSpeed) vy = -maxSpeed;

        let x = parseFloat(panel.style.left);
        let y = parseFloat(panel.style.top);

        x += vx;
        y += vy;

        const maxX = workArea.clientWidth - panel.clientWidth;
        const maxY = workArea.clientHeight - panel.clientHeight;

        if (x <= 0) {
            x = 0;
            vx *= (bounce * hitAcceleration); // Çarpınca hızlan
            changeColor();
        } else if (x >= maxX) {
            x = maxX;
            vx *= (bounce * hitAcceleration); // Çarpınca hızlan
            changeColor();
        }

        if (y <= 0) {
            y = 0;
            vy *= (bounce * hitAcceleration); // Çarpınca hızlan
            changeColor();
        } else if (y >= maxY) {
            y = maxY;
            vy *= (bounce * hitAcceleration); // Çarpınca hızlan
            changeColor();
        }

        panel.style.left = x + 'px';
        panel.style.top = y + 'px';
        
        const currentVelocity = Math.sqrt(vx * vx + vy * vy);
        updateCoords(x, y);
        updateSpeed(currentVelocity);

        animationId = requestAnimationFrame(animate);
    }
    
    animationId = requestAnimationFrame(animate);
}

window.addEventListener('load', centerPanel);

panel.addEventListener('mousedown', (e) => {
    isDragging = true;
    stopPhysics(); 
    panel.style.transition = 'none';
    panel.style.cursor = 'grabbing';

    offsetX = e.clientX - panel.getBoundingClientRect().left;
    offsetY = e.clientY - panel.getBoundingClientRect().top;
    
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const workAreaRect = workArea.getBoundingClientRect();

    vx = e.clientX - lastMouseX;
    vy = e.clientY - lastMouseY;
    
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    let newX = e.clientX - workAreaRect.left - offsetX;
    let newY = e.clientY - workAreaRect.top - offsetY;

    const maxX = workArea.clientWidth - panel.clientWidth;
    const maxY = workArea.clientHeight - panel.clientHeight;

    if (newX < 0) newX = 0;
    if (newX > maxX) newX = maxX;
    if (newY < 0) newY = 0;
    if (newY > maxY) newY = maxY;

    panel.style.left = newX + 'px';
    panel.style.top = newY + 'px';

    const currentVelocity = Math.sqrt(vx * vx + vy * vy);
    updateCoords(newX, newY);
    updateSpeed(currentVelocity);
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        panel.style.cursor = 'grab';
        startPhysics(); 
    }
});

resetBtn.addEventListener('click', centerPanel);