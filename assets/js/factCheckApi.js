
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

    dados.claims.forEach((item) => {
      // Monta o HTML para todas as fontes verificadoras (claimReview)
      let reviewsHtml = '';
      item.claimReview.forEach(review => {
        reviewsHtml += `
          <div class="review">
            <span class="reviewName">${review.title}</span>
            <span class="publisher">${review.publisher.name}  |  <a href="${review.publisher.site}" target="_blank">${review.publisher.site}</a></span>
            <a href="${review.url}" target="_blank" class="readMore">Leia mais</a>
            <span class="textualRating">Resultado da verificação:</span>
            <span class="textualRating"><strong>${review.textualRating}</strong></span>
          </div>
        `;
      });

      // Insere as fontes verificadoras no acordeon do item
      html += `
        <div class="fact">
          <div class="acordeon">
            <div class="claimantText">
              <button class="acordeon-header">
                <span class="text"><strong>Texto</strong>: ${item.text}</span>
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
    });

    resultadoDiv.innerHTML = html;
    inicializarAcordeon();

  } catch (erro) {
    console.error('Erro ao buscar:', erro);
    document.querySelector('.facts').innerHTML = `<p style="color:red;">Erro ao buscar os dados. Tente novamente.</p>`;
  }
}

function enviarTexto(event) {
  event.preventDefault();
  const query = document.getElementById('queryInput').value;
  if (query.trim() !== '') {
    buscarFatos(query);
  }
}
