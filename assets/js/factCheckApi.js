
async function traduzirTexto(texto) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt`;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    return dados.responseData.translatedText;
  } catch (erro) {
    console.error('Erro ao traduzir:', erro);
    return texto; // Retorna o texto original em caso de erro
  }
}



async function buscarFatos(query) {
  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(query)}&key=${api_key}`;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    const resultadoDiv = document.querySelector('.facts');

    if (!dados.claims || dados.claims.length === 0) {
      resultadoDiv.innerHTML = `<p>Nenhum resultado encontrado para: <strong>${query}</strong></p>`;
      return;
    }

    let html = `<h2>Resultados para: "${query}"</h2>`;

    for (const item of dados.claims) {
      const textoTraduzido = await traduzirTexto(item.text); // Traduzindo para inglês, por exemplo

      // Monta o HTML para todas as fontes verificadoras (claimReview)
      let reviewsHtml = '';
      for (const review of item.claimReview) {
        const tituloTraduzido = await traduzirTexto(review.title);
        reviewsHtml += `
          <div class="review">
            <span class="reviewName">${tituloTraduzido}</span>
            <span class="publisher">${review.publisher.name}  |  <a href="${review.publisher.site}" target="_blank">${review.publisher.site}</a></span>
            <a href="${review.url}" target="_blank" class="readMore">Leia mais</a>
            <span class="textualRating">Resultado da verificação:</span>
            <span class="textualRating"><strong>${review.textualRating}</strong></span>
          </div>
        `;
      }

      // Insere as fontes verificadoras no acordeon do item
      html += `
        <div class="fact">
          <div class="acordeon">
            <div class="claimantText">
              <button class="acordeon-header">
                <span class="text"><strong>Texto</strong>: ${textoTraduzido}</span>
                <img src="assets/imgs/arrow-top.svg" alt="" class="acordeon-arrow">
              </button>
            </div>
            <div class="acordeon-body">
              <h3>Fonte verificadora</h3>
              <div class="claimReview">
                ${reviewsHtml}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    resultadoDiv.innerHTML = html;
    inicializarAcordeon();

  } catch (erro) {
    console.error('Erro ao buscar:', erro);
    document.querySelector('.facts').innerHTML = `<p style="color:red;">Erro ao buscar os dados. Tente novamente.</p>`;
  }
}

function enviarTexto(event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário
  const query = document.getElementById('queryInput').value; // Captura o valor do input
  const resultadoDiv = document.querySelector('.facts');

  // Verifica se a consulta não está vazia
  if (query.trim() !== '') {
    resultadoDiv.innerHTML = '<p>Carregando resultados...</p>'; // Feedback ao usuário
    buscarFatos(query); // Chama a função para buscar os fatos com a consulta fornecida
  }
}

