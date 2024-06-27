document.addEventListener('DOMContentLoaded', () => {
    fetch('/favorites')
      .then(response => response.json())
      .then(data => {
        const favoriteList = document.getElementById('favorite-list');
        favoriteList.innerHTML = '';
        data.forEach(item => {
          const favorite = document.createElement('div');
          favorite.className = 'favorite';
          favorite.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}">
            <h4>${item.title}</h4>
            <button onclick="removeFavorite('${item.id}')">Remove</button>
          `;
          favoriteList.appendChild(favorite);
        });
      })
      .catch(error => console.error('Error fetching favorites:', error));
  });
  
  function removeFavorite(id) {
    fetch(`/favorites/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Favorite removed:', data);
        location.reload(); 
      })
      .catch(error => console.error('Error removing favorite:', error));
  }
  