// جلب بيانات الفيديو
const videoData = JSON.parse(localStorage.getItem('movies_current_video'));
const videoPlayer = document.getElementById('videoPlayer');
const progress = JSON.parse(localStorage.getItem('movies_progress')) || {};

// تهيئة المشغل
if (videoData) {
    videoPlayer.src = videoData.url;
    
    // استكمال من آخر نقطة
    if (progress[videoData.id]) {
        videoPlayer.addEventListener('loadedmetadata', function() {
            videoPlayer.currentTime = videoPlayer.duration * progress[videoData.id];
        });
    }
    
    // حفظ تقدم المشاهدة
    videoPlayer.addEventListener('timeupdate', function() {
        if (videoPlayer.duration) {
            progress[videoData.id] = videoPlayer.currentTime / videoPlayer.duration;
            localStorage.setItem('movies_progress', JSON.stringify(progress));
            
            // تحديث الصفحة الرئيسية
            if (window.opener && !window.opener.closed) {
                window.opener.postMessage({
                    type: 'progress_update',
                    videoId: videoData.id,
                    progress: progress[videoData.id]
                }, '*');
            }
        }
    });
}
