const workArea = document.getElementById('workArea');
const panel = document.getElementById('dragPanel');
const coordsDisplay = document.getElementById('coords');
const resetBtn = document.getElementById('resetBtn');

let isDragging = false;

// Farenin panel üzerindeki tıklama noktasını tutmak için
let offsetX = 0;
let offsetY = 0;

// Panel üzerinde fareye basıldığında sürüklemeyi başlat
panel.addEventListener('mousedown', (e) => {
    isDragging = true;

    // Tıklanan noktanın panelin sol üst köşesine olan uzaklığını hesapla
    offsetX = e.clientX - panel.getBoundingClientRect().left;
    offsetY = e.clientY - panel.getBoundingClientRect().top;
});

// Belge üzerinde fare hareket ettiğinde
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    // Çalışma alanının sayfadaki konumunu alıyoruz
    const workAreaRect = workArea.getBoundingClientRect();

    // Yeni X ve Y konumlarını hesapla (Fare konumu - çalışma alanı konumu - panel içi offset)
    let newX = e.clientX - workAreaRect.left - offsetX;
    let newY = e.clientY - workAreaRect.top - offsetY;

    // 3. Sınır Kontrolü (Panel çalışma alanının dışına taşmamalı)
    const maxX = workArea.clientWidth - panel.clientWidth;
    const maxY = workArea.clientHeight - panel.clientHeight;

    // Sınır aşıldığında değerleri düzelt (0 ile max değerler arasına hapset)
    if (newX < 0) newX = 0;
    if (newX > maxX) newX = maxX;
    if (newY < 0) newY = 0;
    if (newY > maxY) newY = maxY;

    // Panelin yeni konumunu CSS ile uygula
    panel.style.left = newX + 'px';
    panel.style.top = newY + 'px';

    // 2. Canlı koordinat güncellemesi
    coordsDisplay.textContent = `X: ${Math.round(newX)}, Y: ${Math.round(newY)}`;
});

// Fare bırakıldığında sürüklemeyi durdur (4. Bırakıldığında son konum kalır)
document.addEventListener('mouseup', () => {
    isDragging = false;
});

// 5. Başlangıç konumuna resetleme butonu
resetBtn.addEventListener('click', () => {
    panel.style.left = '0px';
    panel.style.top = '0px';
    coordsDisplay.textContent = `X: 0, Y: 0`;
});