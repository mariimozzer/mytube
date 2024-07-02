window.addEventListener('message', event => {
    const drawerIframe = document.getElementById('drawer');
    const videosIframe = document.getElementById('videos');

    if (event.data === 'videos') {
        videosIframe.contentWindow.postMessage('videos', '*');
    } else if (event.data === 'favorites') {
        videosIframe.contentWindow.postMessage('favorites', '*');
    }

    if (event.data.type === 'updateFavoritesCount') {
        drawerIframe.contentWindow.postMessage(event.data, '*');
    }
});

window.onload = function() {
    const videosIframe = document.getElementById('videos');
    videosIframe.contentWindow.postMessage({ type: 'updateFavoritesCount', count: 0 }, '*');
}
