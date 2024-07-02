const { toggleFavorite, searchVideos, updateFavoritesCount, setFavorites, getFavorites } = require('./app');

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ items: [{ id: { videoId: '12345' } }] })
  })
);

beforeEach(() => {
  setFavorites([]);
  document.body.innerHTML = `
    <div id="mf_videos">
      <div id="search-container">
        <input type="text" id="search" placeholder="Pesquisar">
        <button onclick="searchVideos()">Pesquisar</button>
      </div>
      <div id="videos"></div>
    </div>
    <div id="modal" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <iframe id="videoPlayer" width="560" height="315" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  `;
});

test('toggleFavorite deve adicionar vídeo aos favoritos', () => {
  toggleFavorite('12345');
  expect(getFavorites()).toContain('12345');
});

test('toggleFavorite deve remover vídeo dos favoritos', () => {
  setFavorites(['12345']);
  toggleFavorite('12345');
  expect(getFavorites()).not.toContain('12345');
});

test('searchVideos deve buscar vídeos e exibi-los', async () => {
  document.getElementById('search').value = 'test';
  await searchVideos();
  const videoElements = document.querySelectorAll('.video');
  expect(videoElements.length).toBe(1);
});

test('updateFavoritesCount deve enviar mensagem ao pai', () => {
  const postMessageSpy = jest.spyOn(window.parent, 'postMessage');
  updateFavoritesCount();
  expect(postMessageSpy).toHaveBeenCalledWith({ type: 'updateFavoritesCount', count: 0 }, '*');
});
