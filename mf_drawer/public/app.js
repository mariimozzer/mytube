document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3001/favoritos/count')
      .then(response => response.json())
      .then(data => {
        document.getElementById('fav-count').textContent = data.count;
      })
      .catch(error => console.error('Erro ao buscar a contagem de favoritos:', error));
  });
  