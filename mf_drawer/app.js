function navigate(page) {
    window.parent.postMessage(page, '*');
}

window.addEventListener('message', event => {
    if (event.data.type === 'updateFavoritesCount') {
        document.getElementById('favorites-count').innerText = event.data.count;
    }
});
