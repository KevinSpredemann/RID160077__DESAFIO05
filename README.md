# 📚 API de Biblioteca – Projeto Fullstack

Este é um projeto completo de uma aplicação de **cadastro e gerenciamento de livros**, com um **back-end em Node.js + Express** e um **front-end em React**, conectados por meio de requisições HTTP. Ideal para estudos ou como ponto de partida para sistemas mais complexos.

---

## 🛠️ Tecnologias Utilizadas

### Back-End:
- Node.js
- Express
- SQLite3 + Better-SQLite3
- Zod (validações)
- CORS
- Nodemon (dev)

### Front-End:
- React
- React Router DOM
- Axios
- Sass (estilização)
- Vite (build e servidor local)

---

## 🚀 Como Rodar o Projeto Localmente

### 🔧 Pré-requisitos:
- Node.js instalado
- Git instalado (opcional)
- Gerenciador de pacotes (npm ou yarn)

---

### 🧩 Clonando o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

🔙 Back-End (API)
1. Vá para a pasta Back-End/:
```bash
cd Back-End
```

3. Instale as dependências:
```bash
npm install
```

5. Inicie o servidor:
```bash
npm run dev
```

## A API estará disponível em: 
### http://localhost:3000

🎨 Front-End (React)
1. Vá para a pasta Front/:
```bash
cd ../Front
```

2.Instale as dependências:
```bash
npm install
```

3.Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

### O app abrirá em: http://localhost:5173

📌 Funcionalidades da API


| Método | Rota          | Descrição                   |
| ------ | ------------- | --------------------------- |
| GET    | `/livros`     | Lista todos os livros       |
| GET    | `/livros/:id` | Busca um livro por ID       |
| POST   | `/livros`     | Cria um novo livro          |
| PUT    | `/livros/:id` | Atualiza um livro existente |
| DELETE | `/livros/:id` | Remove um livro             |


📬 Contato
Criado por Kevin Spredemann – kevinspredemann50@gmail.com
Este projeto é para fins educacionais.
