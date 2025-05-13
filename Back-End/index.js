import express from "express";
import cors from "cors";
import router from "./src/routes/book.routes.js";

const app = express();

const corsOptions = {
  origin: 'https://desafio05-project.netlify.app', 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

const port = 3000;

app.listen(port, () => {
  try {
    console.log(`Servidor rodando na porta ${port}`);
  } catch (error) {
    console.log(error);
  }
});
