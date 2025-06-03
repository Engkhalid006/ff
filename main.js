// تخزين الفيديوهات وتقدم المشاهدة
let videos = JSON.parse(localStorage.getItem('movies_videos')) || [];
let progress = JSON.parse(localStorage.getItem('movies_progress')) || {};

// عناصر DOM
const videoForm = document.getElementById('videoForm');
const continueList = document.getElementById('continueList');
const videoList = document.getElementById('videoList');

// إضافة فيديو جديد
videoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('videoTitle').value;
    const url = document.getElementById('videoUrl').value;
    
    if (!title || !url) return;
    
    const video = {
        id: Date.now().toString(),
        title,
        url,
        addedAt: new Date().toISOString()
    };
    
    videos.push(video);
    saveData();
    renderVideos();
    videoForm.reset();
});

// حفظ البيانات
function saveData() {
    localStorage.setItem('movies_videos', JSON.stringify(videos));
    localStorage.setItem('movies_progress', JSON.stringify(progress));
}

// عرض الفيديوهات
function renderVideos() {
    // عرض "استكمال المشاهدة"
    continueList.innerHTML = '';
    for (const id in progress) {
        const video = videos.find(v => v.id === id);
        if (video) {
            const percent = Math.floor(progress[id] * 100);
            continueList.innerHTML += `
                <div class="video-item">
                    <span>${video.title}</span>
                    <div>
                        <span>${percent}%</span>
                        <button onclick="playVideo('${video.id}')">استكمال</button>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${percent}%"></div>
                    </div>
                </div>
            `;
        }
    }
    
    // عرض المكتبة
    videoList.innerHTML = '';
    videos.forEach(video => {
        videoList.innerHTML += `
            <div class="video-item">
                <span>${video.title}</span>
                <button onclick="playVideo('${video.id}')">تشغيل</button>
            </div>
        `;
    });
}

// تشغيل الفيديو
function playVideo(id) {
    const video = videos.find(v => v.id === id);
    if (!video) return;
    
    localStorage.setItem('movies_current_video', JSON.stringify(video));
    window.open('player.html', '_blank');
}

// التهيئة الأولية
renderVideos();
