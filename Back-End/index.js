import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

app.listen(port, () => {
  try {
    console.log(`Servidor rodando na porta ${port}`);
  } catch (error) {
    console.log(error);
  }
});
