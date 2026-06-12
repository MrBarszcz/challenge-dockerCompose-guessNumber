# 🐳 Jogo da Adivinhação: Arquitetura Desacoplada com Apache e .NET 10

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Apache](https://img.shields.io/badge/Apache-D22128?style=for-the-badge&logo=Apache&logoColor=white)
![.NET](https://img.shields.io/badge/.NET_10-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)

## 📌 Sobre o Projeto

Este projeto nasceu de um desafio prático de infraestrutura: **executar uma aplicação web em um container Apache utilizando o Docker Compose**. 

O escopo inicial sugeria o deploy de um simples arquivo HTML estático. No entanto, para demonstrar conhecimentos sólidos em desenvolvimento backend e arquitetura de software, o projeto foi expandido para uma **arquitetura de microsserviços desacoplada**.

Em vez de uma página estática, foi desenvolvido um **Jogo da Adivinhação** dinâmico, onde a interface (Frontend) roda no Apache e toda a regra de negócio, validações e estado do jogo são processados por uma **API construída em C# e .NET 10**.

### O Diferencial Técnico 🚀
* **Separação de Responsabilidades (Decoupling):** Frontend comunicando-se com um Backend robusto via requisições HTTP (Fetch API).
* **CORS Configurado:** Tratamento adequado de requisições Cross-Origin (incluindo *Preflight OPTIONS*) diretamente no pipeline do ASP.NET Core.
* **Containers Isolados:** Utilização de `Dockerfile` personalizado para o *build* e *runtime* da API em C#, orquestrado em conjunto com a imagem oficial do Apache via `docker-compose.yml`.

---

## 🛠️ Tecnologias Utilizadas

**Frontend (Interface do Usuário)**
* HTML5, CSS3 e JavaScript Vanilla.
* Servidor Web: `httpd:alpine` (Apache Core).

**Backend (Lógica de Negócio)**
* C# e .NET 10.
* Padrão MVC (API baseada em Controllers).
* *Records* para transferência de dados (DTOs) com segurança e imutabilidade.

**Infraestrutura**
* Docker & Docker Compose.

---

## ⚙️ Como Executar na Sua Máquina

**Pré-requisitos:**
* Ter o [Docker](https://docs.docker.com/get-docker/) e o [Docker Compose](https://docs.docker.com/compose/install/) instalados.

**Passo a Passo:**

1. Clone este repositório:
   ```bash
   git clone [https://github.com/MrBarszcz/challenge-dockerCompose-guessNumber.git](https://github.com/MrBarszcz/challenge-dockerCompose-guessNumber.git)
   cd challenge-dockerCompose-guessNumber
   ```

2. Suba a infraestrutura utilizando o Docker Compose:
    ```bash
    docker compose up -d --build
    ```

3. Acesse o jogo através do navegador:

    Frontend (Apache): http://localhost:8080

    (A API estará rodando internamente na porta 8081)

## 📂 Estrutura do Projeto

A organização dos diretórios reflete a separação entre os serviços:

📦 desafio-docker-adivinhacao
 ┣ 📂 assets                  # Território do Apache (Frontend)
 ┃ ┣ 📂 css
 ┃ ┃ ┗ 📜 style.css
 ┃ ┣ 📂 js
 ┃ ┃ ┗ 📜 script.js
 ┃ ┗ 📜 index.html
 ┣ 📂 GuessNumberGame         # Território do .NET (Backend)
 ┃ ┣ 📂 Controllers
 ┃ ┃ ┗ 📜 GameController.cs
 ┃ ┣ 📜 Dockerfile            # Receita de build da API
 ┃ ┣ 📜 Program.cs            # Ponto de entrada e configuração do CORS
 ┃ ┗ 📜 GuessNumberGame.csproj
 ┣ 📜 docker-compose.yml      # Orquestrador dos containers
 ┗ 📜 .gitignore