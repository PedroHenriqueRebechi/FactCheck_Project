# 🕵️ Verificador de Fatos com Google Fact Check API

Este projeto é uma aplicação web que permite ao usuário **pesquisar alegações** e verificar sua veracidade com base na **Google Fact Check API**. O conteúdo é traduzido automaticamente para **português**, mesmo quando os dados originais estão em inglês.

![GitHub Repo Size](https://img.shields.io/github/repo-size/PedroHenriqueRebechi/FactCheck_Project)
![GitHub Language Count](https://img.shields.io/github/languages/count/PedroHenriqueRebechi/FactCheck_Project)

## 🚀 Funcionalidades

- 🔎 Busca de fatos e alegações usando a **Google Fact Check API**
- 🌐 Tradução automática do conteúdo (inglês → português) com a **API MyMemory**
- 📜 Exibição em formato interativo com acordeons
- 💬 Mensagens amigáveis para erros, carregamento e ausência de resultados
- ⚙️ Possibilidade de melhoria: Extensão de navegador

## 🧪 Tecnologias utilizadas

- **JavaScript**
- **HTML5**
- **CSS3**
- **Google Fact Check Tools API**
- **MyMemory Translation API**


## 📦 Como usar

1. Clone o repositório:

```bash
git clone https://github.com/PedroHenriqueRebechi/FactCheck_Project.git
cd FactCheck_Project
```

Abra o arquivo index.html no navegador.

Insira um termo no campo de busca e aguarde os resultados da verificação!

---
⚠️ Importante: você precisa de uma chave da API do Google. <br>

🔑 Como obter a chave da API (Google Fact Check)
- Acesse o Google Cloud Console
- Crie um novo projeto (ou selecione um existente)
- Ative a Fact Check Tools API
- Vá em APIs e serviços > Credenciais e gere uma chave de API

Substitua no seu código:

const api_key = "SUA_CHAVE_AQUI";

---

🧪 Exemplo de uso
Pesquisando "Terra é plana", o sistema retorna verificações de fontes confiáveis como AFP, PolitiFact e Aos Fatos, com link, avaliação textual e tradução do conteúdo original. <br>

<img width="1900" height="1000" alt="image" src="https://github.com/user-attachments/assets/70637d53-b878-44b1-b512-3166212d8d76" /> <br>
<img width="1900" height="1000" alt="image" src="https://github.com/user-attachments/assets/519b1d16-9220-455c-883e-196ab4a74f60" />


📁 Estrutura do projeto
<pre>
|   comoFunciona.html
|   estrutura.txt
|   index.html
|   README.md
|   
+---assets
|   |   .gitignore
|   |   
|   +---css
|   |       acordeon.css
|   |       comoFunciona.css
|   |       global.css
|   |       style.css
|   |       
|   ----imgs
|   |   
|   |           
|   \---js
|           acordeon.js
|           config.js
|           factCheckApi.js

</pre>
### ✨ Melhorias futuras

🔄 Tradução em lote paralela com Promise.all

💡 Cache de traduções para reduzir requisições

🎨 Tema escuro e responsividade total

💾 Armazenamento de histórico (localStorage)

---

🧑‍💻 Autor: Pedro Henrique Rebechi <br>
🧠 Apaixonado por tecnologia, IA e combate à desinformação
