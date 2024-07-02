document.addEventListener('DOMContentLoaded', () => {
  fetch('/favoritos/lista')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const favoriteList = document.getElementById('favorite-list');
      favoriteList.innerHTML = '';
      data.forEach(item => {
        const favorite = document.createElement('div');
        favorite.className = 'favorito';
        favorite.innerHTML = `
          <img src="${item.thumbnail}" alt="${item.title}">
          <h4>${item.title}</h4>
          <button class="star star-filled" onclick="removeFavorite('${item.id}')">aaa</button>
        `;
        favoriteList.appendChild(favorite);
      });
    })
    .catch(error => console.error('Erro ao buscar favoritos:', error));

  fetch('/favoritos/contagem')
    .then(response => response.json())
    .then(data => {
      document.getElementById('fav-count').textContent = data.count;
    })
    .catch(error => console.error('Erro ao buscar a contagem de favoritos:', error));
});

function removeFavorite(id) {
  fetch(`/favoritos/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Favorito removido:', data);
      location.reload(); 
    })
    .catch(error => console.error('Erro ao remover favorito:', error));
}
