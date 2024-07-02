const API_KEY = ''; //SUA CHAVE AQUI

let favorites = [];

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    searchVideos();
  }
}

function searchVideos() {
  const query = document.getElementById('search').value;
  return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}&maxResults=${20}`)
    .then(response => response.json())
    .then(data => {
      const videos = document.getElementById('videos');
      videos.innerHTML = '';
      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const isFavorited = favorites.includes(videoId);
        const videoElement = document.createElement('div');
        videoElement.className = 'video';
        videoElement.innerHTML = `
          <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
          <span class="star ${isFavorited ? 'favorited' : ''}" onclick="toggleFavorite('${videoId}')">&#9733;</span>
        `;
        videos.appendChild(videoElement);
      });
      updateFavoritesCount();
    });
}

function toggleFavorite(videoId) {
  const index = favorites.indexOf(videoId);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(videoId);
  }
  updateFavorites();
  updateFavoritesCount();
}

function updateFavorites() {
  document.querySelectorAll('.video .star').forEach(star => {
    const videoId = star.previousElementSibling.src.split('/').pop();
    if (favorites.includes(videoId)) {
      star.classList.add('favorited');
    } else {
      star.classList.remove('favorited');
    }
  });
}

function updateFavoritesCount() {
  window.parent.postMessage({ type: 'updateFavoritesCount', count: favorites.length }, '*');
}

function showFavorites() {
  const videos = document.getElementById('videos');
  const searchContainer = document.getElementById('search-container');
  searchContainer.style.display = 'none';
  videos.innerHTML = '';
  favorites.forEach(videoId => {
    const videoElement = document.createElement('div');
    videoElement.className = 'video';
    videoElement.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
      <span class="star favorited" onclick="toggleFavorite('${videoId}')">&#9733;</span>
    `;
    videos.appendChild(videoElement);
  });
}

window.addEventListener('message', event => {
  if (event.data === 'favorites') {
    showFavorites();
  } else if (event.data === 'videos') {
    const searchContainer = document.getElementById('search-container');
    searchContainer.style.display = 'block';
    searchVideos();
  }
});

module.exports = { toggleFavorite, searchVideos, updateFavoritesCount, setFavorites: (newFavorites) => favorites = newFavorites, getFavorites: () => favorites };