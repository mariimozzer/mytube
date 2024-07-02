# MyTube Favorites

MyTube Favorites é uma aplicação web que permite buscar vídeos no YouTube, marcar vídeos como favoritos e visualizar uma lista de vídeos favoritos. A aplicação é construída com micro-frontends e containerizada usando Docker.

## Funcionalidades

- Busca de vídeos no YouTube
- Marcar vídeos como favoritos
- Visualizar e reproduzir vídeos favoritos

## Pré-requisitos
Docker
Docker Compose
Chave de API do YouTube

## Configuração
Clone o repositório:
git clone https://github.com/mariimozzer/mytube-favorites 
cd mytube-favorites
Adicione sua chave de API do YouTube no arquivo mf_videos/app.js:

const API_KEY = 'YOUR_YOUTUBE_API_KEY';

## Build e inicie os containers:

docker-compose build  
docker-compose up
- Acesse a aplicação em http://localhost:8080.

## Uso
- Buscar vídeos: Use o campo de busca para procurar vídeos no YouTube. Pressione Enter ou clique no botão "Pesquisar".
- Favoritar vídeos: Clique na estrela branca no canto inferior direito de um vídeo para marcá-lo como favorito.
- Visualizar favoritos: Clique no botão "FAVORITOS" no menu lateral para ver seus vídeos favoritos. A tela de favoritos não mostrará o campo de busca.

## Testes
- Para executar os testes unitários, navegue até o diretório mf_videos e execute:

```npm test´´´ 
