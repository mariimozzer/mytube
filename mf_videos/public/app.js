const YOUTUBE_API_KEY = 'AIzaSyD9ofCnqVYkpKdbM4a0iFdH3DP-LjEQVy8'; 

let favoritos = [];

window.searchVideos = function() {
  const searchTerm = document.getElementById('search-term').value;
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchTerm}&key=${YOUTUBE_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const videoList = document.getElementById('video-list');
      videoList.innerHTML = '';
      data.items.forEach(item => {
        const isFavorite = favoritos.some(fav => fav.id === item.id.videoId);
        const starClass = isFavorite ? 'fas fa-star star-filled' : 'far fa-star star';
        const video = document.createElement('div');
        video.className = 'video';
        video.innerHTML = `
          <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title}" onclick="playVideo('${item.id.videoId}')">
          <h4>${item.snippet.title}</h4>
          <i class="${starClass}" onclick="toggleFavorite('${item.id.videoId}', '${item.snippet.title}', '${item.snippet.thumbnails.default.url}')"></i>
        `;
        videoList.appendChild(video);
      });
    })
    .catch(error => console.error('Erro ao buscar vídeos:', error));
};

window.playVideo = function(videoId) {
  const player = document.getElementById('player');
  player.src = `https://www.youtube.com/embed/${videoId}`;
  document.getElementById('video-player').style.display = 'block';
}

window.closePlayer = function() {
  const player = document.getElementById('player');
  player.src = '';
  document.getElementById('video-player').style.display = 'none';
}

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
      document.getElementById('fav-count').textContent = favoritos.length;
      searchVideos(); 
    })
    .catch(error => console.error('Erro ao adicionar/remover favorito:', error));
};

function loadFavoritos() {
  fetch('/favoritos/lista')
    .then(response => response.json())
    .then(data => {
      favoritos = data;
      document.getElementById('fav-count').textContent = favoritos.length;
    })
    .catch(error => console.error('Erro ao carregar favoritos:', error));
}

document.addEventListener('DOMContentLoaded', loadFavoritos);