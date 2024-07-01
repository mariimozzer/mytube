const YOUTUBE_API_KEY = 'AIzaSyD9ofCnqVYkpKdbM4a0iFdH3DP-LjEQVy8'; 

window.searchVideos = function() {
  const searchTerm = document.getElementById('search-term').value;
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchTerm}&key=${YOUTUBE_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const videoList = document.getElementById('video-list');
      videoList.innerHTML = '';
      data.items.forEach(item => {
        const isFavorite = favoritos.some(fav => fav.id === item.id.videoId);
        const starClass = isFavorite ? 'star star-filled' : 'star star-empty';
        const video = document.createElement('div');
        video.className = 'video';
        video.innerHTML = `
          <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title}">
          <h4>${item.snippet.title}</h4>
          <button class="${starClass}" onclick="toggleFavorite('${item.id.videoId}', '${item.snippet.title}', '${item.snippet.thumbnails.default.url}')">⭐</button>
        `;
        videoList.appendChild(video);
      });
    })
    .catch(error => console.error('Erro ao buscar vídeos:', error));
};

document.getElementById('search-term').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    searchVideos();
  }
});

window.toggleFavorite = function(id, title, thumbnail) {
  const favorite = {
    id,
    title,
    thumbnail
  };

  const isFavorite = favoritos.some(fav => fav.id === id);
  if (isFavorite) {
    favoritos = favoritos.filter(fav => fav.id !== id);
  } else {
    favoritos.push(favorite);
  }

  fetch('/favoritos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(favorite)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Favoritos atualizados:', data);
      searchVideos(); 
    })
    .catch(error => console.error('Erro ao adicionar/remover favorito:', error));
};

function loadFavoritos() {
  fetch('/favoritos/lista')
    .then(response => response.json())
    .then(data => {
      favoritos = data;
    })
    .catch(error => console.error('Erro ao carregar favoritos:', error));
}

document.addEventListener('DOMContentLoaded', loadFavoritos);