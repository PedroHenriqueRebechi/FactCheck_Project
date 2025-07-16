async function traduzirTexto(texto) {
  const maxChars = 500;

  // Se o texto for curto, traduz direto
  if (texto.length <= maxChars) {
    return await traduzirParte(texto);
  }

  // Se for longo, divide em partes
  const partes = [];
  for (let i = 0; i < texto.length; i += maxChars) {
    partes.push(texto.substring(i, i + maxChars));
  }

  let textoTraduzido = '';
  for (const parte of partes) {
    const traducao = await traduzirParte(parte);
    textoTraduzido += traducao + ' ';
  }

  return textoTraduzido.trim();
}

// Função auxiliar que traduz até 500 caracteres
async function traduzirParte(texto) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt`;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    return dados.responseData.translatedText;
  } catch (erro) {
    console.error('Erro ao traduzir parte:', erro);
    return texto;
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
      // Verifica se há pelo menos um review em 'pt' ou 'en'
      const hasValidLanguage = item.claimReview.some(
        review => review.languageCode === 'pt' || review.languageCode === 'en'
      );

      if (!hasValidLanguage) continue; // Pula se não houver review em 'pt' ou 'en'

      const textoTraduzido = await traduzirTexto(item.text);

      let reviewsHtml = '';

      for (const review of item.claimReview) {
        if (review.languageCode === 'pt' || review.languageCode === 'en') {
          const tituloTraduzido = await traduzirTexto(review.title);

          reviewsHtml += `
            <div class="review">
              <span class="reviewName">${tituloTraduzido}</span>
              <span class="publisher">${review.publisher.name} | 
                <a href="${review.publisher.site}" target="_blank">${review.publisher.site}</a>
              </span>
              <a href="${review.url}" target="_blank" class="readMore">Leia mais</a>
              <span class="textualRating">Resultado da verificação:</span>
              <span class="textualRating"><strong>${review.textualRating}</strong></span>
            </div>
          `;
        }
      }

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

