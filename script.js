document.getElementById('formulario-busca').addEventListener('submit', function(event) {
  event.preventDefault();

  const tituloDigitado = document.getElementById('titulo').value.trim().toLowerCase();
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = '';

  if (tituloDigitado === '') {
    resultadoDiv.innerHTML = '<p class="mensagem-erro">Por favor, digite um título de filme.</p>';
    return;
  }

  fetch('https://ghibliapi.vercel.app/films')
    .then(res => res.json())
    .then(filmes => {
      const filme = filmes.find(f => f.title.toLowerCase() === tituloDigitado);

      if (filme) {
        resultadoDiv.innerHTML = `
          <div class="cartaz-filme">
            <h2>${filme.title}</h2>
            <img src="${filme.movie_banner}" alt="Banner do filme ${filme.title}" class="imagem-filme"/>
            <p><strong>Descrição:</strong> ${filme.description}</p>
            <p><strong>Diretor:</strong> ${filme.director}</p>
            <p><strong>Lançamento:</strong> ${filme.release_date}</p>
          </div>
        `;
      } else {
        resultadoDiv.innerHTML = '<p class="mensagem-erro">Filme não encontrado.</p>';
      }
    })
    .catch(error => {
      console.error('Erro ao buscar os dados:', error);
      resultadoDiv.innerHTML = '<p class="mensagem-erro">Erro ao buscar os dados. Tente novamente mais tarde.</p>';
    });
});
