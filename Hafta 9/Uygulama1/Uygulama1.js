// Gerekli DOM elementlerini seçiyoruz
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const errorMsg = document.getElementById('errorMsg');

const listTodo = document.getElementById('list-todo');
const listProgress = document.getElementById('list-progress');
const listDone = document.getElementById('list-done');

const columns = [listTodo, listProgress, listDone];

// 1. Görev Ekleme İşlemi
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    // 5. Boş kart kontrolü ve DOM üzerinden hata mesajı
    if (taskText === "") {
        errorMsg.className = "error-visible";
        return;
    }

    // Hata varsa gizle
    errorMsg.className = "error-hidden";

    // Kart oluştur ve ilk sütuna (Yapılacaklar) ekle
    createTaskCard(taskText);
    taskInput.value = "";
    updateCounts(); // Sayaçları güncelle
});

// Kart oluşturma fonksiyonu
function createTaskCard(text) {
    const card = document.createElement('div');
    card.className = 'task-card';

    // Kart içeriği
    const taskContent = document.createElement('span');
    taskContent.textContent = text;
    card.appendChild(taskContent);

    // 2. Butonların olduğu bölüm
    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Geri';
    prevBtn.className = 'btn-prev';

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'İleri →';
    nextBtn.className = 'btn-next';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Sil';
    deleteBtn.className = 'btn-delete';

    // Olay Dinleyicileri (İleri, Geri, Sil)
    nextBtn.addEventListener('click', () => moveTask(card, 1));
    prevBtn.addEventListener('click', () => moveTask(card, -1));
    deleteBtn.addEventListener('click', () => {
        card.remove();
        updateCounts();
    });

    actions.appendChild(prevBtn);
    actions.appendChild(deleteBtn);
    actions.appendChild(nextBtn);
    card.appendChild(actions);

    // Varsayılan olarak ilk sütuna ekle
    listTodo.appendChild(card);
}

// 3. Kartı başka sütuna taşıma ve stili güncelleme mantığı
function moveTask(card, direction) {
    const currentList = card.parentElement;
    const currentIndex = columns.indexOf(currentList);
    const newIndex = currentIndex + direction;

    // Sınır kontrolü (İlk sütundan geri veya son sütundan ileri gidilemez)
    if (newIndex >= 0 && newIndex < columns.length) {
        columns[newIndex].appendChild(card);
        updateCounts(); // 4. Başlıktaki sayıları güncelle
    }
}

// 4. Her sütunun başlığındaki görev sayısını anlık güncelleyen fonksiyon
function updateCounts() {
    document.querySelector('#col-todo .task-count').textContent = listTodo.children.length;
    document.querySelector('#col-progress .task-count').textContent = listProgress.children.length;
    document.querySelector('#col-done .task-count').textContent = listDone.children.length;
}