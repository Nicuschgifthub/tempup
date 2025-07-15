const loadVideoPlayer = (id, fileInfo) => {
    document.getElementById('video-viewer').style.display = 'block';
    document.getElementById('video-name').innerText = fileInfo.name;

    const source = document.createElement('source');
    source.setAttribute('id', 'main-video-source');
    source.setAttribute('src', '/stream/video/' + id);
    source.setAttribute('type', 'video/mp4');

    const videoPlayer = document.getElementById('videoplayer');
    videoPlayer.appendChild(source);
    videoPlayer.load();
    videoPlayer.onerror = function (e) {
        console.error('Error loading the video:', e);
    };
}