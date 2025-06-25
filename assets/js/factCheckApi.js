const api_key = `AIzaSyCKiD5w_hTB-wJRuPp9KO4mwvI4yqgGY3Y`;

async function buscarFatos() {
  // const query = document.getElementById('queryInput').value;
  const query = 'vacinas causam autismo';

  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(query)}&key=${api_key}`;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    console.log(dados);

  }
  catch (erro) {
    console.error('Erro ao buscar:', erro);
  }
}

buscarFatos();