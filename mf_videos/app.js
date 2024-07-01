const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3001;
let favoritos = [];

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/favoritos', (req, res) => {
  res.sendFile(path.join(__dirname, 'favoritos.html'));
});

app.get('/favoritos/contagem', (req, res) => {
  res.json({ count: favoritos.length });
});

app.post('/favoritos', (req, res) => {
  const video = req.body;
  if (!favoritos.some(fav => fav.id === video.id)) {
    favoritos.push(video);
  } else {
    favoritos = favoritos.filter(fav => fav.id !== video.id);
  }
  res.json(favoritos);
});

app.get('/favoritos/lista', (req, res) => {
  res.json(favoritos);
});

app.delete('/favoritos/:id', (req, res) => {
  const videoId = req.params.id;
  favoritos = favoritos.filter(fav => fav.id !== videoId);
  res.json(favoritos);
});

app.listen(port, () => {
  console.log(`Aplicação MF_VIDEOS ouvindo em http://localhost:${port}`);
});
