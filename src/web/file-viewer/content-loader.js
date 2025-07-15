window.addEventListener('load', async () => {
    const url = new URL(window.location.href);

    const pathname = url.pathname;
    const segments = pathname.split('/');

    const fileType = segments[2];
    const fileId = segments[3];

    const fileInfo = await requestGet('/files/info/' + fileId);

    switch (fileType) {
        case 'video':
            loadVideoPlayer(fileId, fileInfo);
            break;

        default:
            window.location.href = '/';
            break;
    }
})