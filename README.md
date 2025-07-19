# 🕵️ Verificador de Fatos com Google Fact Check API

Este projeto é uma aplicação web que permite ao usuário **pesquisar alegações** e verificar sua veracidade com base na **Google Fact Check API**. O conteúdo é traduzido automaticamente para **português**, mesmo quando os dados originais estão em inglês.

![GitHub Repo Size](https://img.shields.io/github/repo-size/PedroHenriqueRebechi/FactCheck_Project)
![GitHub Language Count](https://img.shields.io/github/languages/count/PedroHenriqueRebechi/FactCheck_Project)

## 🚀 Funcionalidades

- 🔎 Busca de fatos e alegações usando a Google Fact Check API
- 🌐 Tradução automática do conteúdo (inglês → português) com a API MyMemory
- 📜 Exibição em formato interativo com **acordeões**
- 🧠 Filtro inteligente por idioma (`pt` ou `en`)
- 💬 Mensagens amigáveis para erros, carregamento e ausência de resultados
- ⚙️ Possibilidade de melhoria: Extensão de navegador

## 🧪 Tecnologias utilizadas

- **JavaScript**
- **HTML5**
- **CSS3**
- **Google Fact Check Tools API**
- **MyMemory Translation API**

---

## 📦 Como usar

1. Clone o repositório:

```bash
git clone https://github.com/PedroHenriqueRebechi/FactCheck_Project.git
cd FactCheck_Project
```

Abra o arquivo index.html no navegador.

Insira um termo no campo de busca e aguarde os resultados da verificação!

⚠️ Importante: você precisa de uma chave da API do Google. <br>

🔑 Como obter a chave da API (Google Fact Check)
- Acesse o Google Cloud Console
- Crie um novo projeto (ou selecione um existente)
- Ative a Fact Check Tools API
- Vá em APIs e serviços > Credenciais e gere uma chave de API

Substitua no seu código:

js
Copy
Edit
const api_key = "SUA_CHAVE_AQUI";

<br>

🧪 Exemplo de uso
Pesquisando "Terra é plana", o sistema retorna verificações de fontes confiáveis como AFP, PolitiFact e Aos Fatos, com link, avaliação textual e tradução do conteúdo original.

📁 Estrutura do projeto

/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── imgs/
│       └── arrow-top.svg

✨ Melhorias futuras
🔄 Tradução em lote paralela com Promise.all

💡 Cache de traduções para reduzir requisições

🎨 Tema escuro e responsividade total

💾 Armazenamento de histórico (localStorage)

🧑‍💻 Autor
Pedro Henrique Rebechi
🧠 Apaixonado por tecnologia, IA e combate à desinformação
