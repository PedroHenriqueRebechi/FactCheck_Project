
async function buscarFatos(query) {
  
  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(query)}&key=${api_key}`;

  try {
    // Faz a requisição para a API
    const resposta = await fetch(url);
    // Converte a resposta para JSON
    const dados = await resposta.json();

    // Seleciona a div onde vamos mostrar os resultados
    const resultadoDiv = document.querySelector('.facts');

    // Verifica se não há resultados (claims)
    if (!dados.claims || dados.claims.length === 0) {
      resultadoDiv.innerHTML = `<p>Nenhum resultado encontrado para: <strong>${query}</strong></p>`;
      return; 
    }

    // Começa a montar o HTML com um título
    let html = `<h2>Resultados para: "${query}"</h2>`;

    // Para cada resultado encontrado, monta um bloco com as informações importantes
    dados.claims.forEach((item) => {
      html += `
        <div class="fact">
                <div class="acordeon">
                    <div class="claimantText">
                        <button class="acordeon-header">
                            <span class="text"><strong>Alegação</strong>: ${item.text}</span>
                            <img src="assets/imgs/arrow-top.svg" alt="" class="acordeon-arrow">
                        </button>
                    </div>
                
                    <div class="acordeon-body">
                        <h3>Fontes verificadoras</h3>
                        <div class="claimReview">
                            <div class="review">
                                
                                <span class="reviewName">${item.claimReview[0].title}</span>

                                <span class="publisher">${item.claimReview[0].publisher.name}  |  <a href="${item.claimReview[0].publisher.site}" target="_blank">${item.claimReview[0].publisher.site}</a></span>

                                <a href="${item.claimReview[0].url}" target="_blank" class="readMore">Leia mais</a>
                                
                                <span class="textualRating">Resultado da verificação:</span>
                                <span class="textualRating">${item.claimReview[0].textualRating}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      `;
    });

    // Insere o HTML montado dentro da div resultado
    resultadoDiv.innerHTML = html;

    inicializarAcordeon();

  } catch (erro) {
    // Caso ocorra algum erro na requisição, mostra no console e também uma mensagem na página
    console.error('Erro ao buscar:', erro);
    document.getElementById('facts').innerHTML = `<p style="color:red;">Erro ao buscar os dados. Tente novamente.</p>`;
  }
}

function enviarTexto(event) {
  event.preventDefault(); 

  const query = document.getElementById('queryInput').value;

  if (query.trim() !== '') {
    buscarFatos(query); 
  }
}
