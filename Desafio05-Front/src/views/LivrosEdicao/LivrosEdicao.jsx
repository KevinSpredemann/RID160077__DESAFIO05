import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss";
import SubmenuLivros from "../../components/SubmenuLivros/SubmenuLivros";
import { useParams } from "react-router-dom";
import { LivrosService } from "../../api/LivrosService";

const LivrosEdicao = () => {
  let { livroId } = useParams();

  const [livro, setLivro] = useState({
    titulo: "",
    num_paginas: "",
    isbn: "",
    editora: "",
  });
  const [error, setError] = useState("");

  async function getLivro() {
    const { data } = await LivrosService.getLivro(livroId);
    setLivro(data);
  }

  async function editLivro(event) {
    event.preventDefault();

    const numPaginasConvertido = Number(livro.num_paginas);

    if (!livro.titulo || livro.titulo.trim() === "") {
      setError("O título é obrigatório!");
      return;
    }
    if (
      !livro.num_paginas ||
      isNaN(numPaginasConvertido) ||
      numPaginasConvertido <= 0
    ) {
      setError("Número de páginas deve ser um número válido e maior que zero!");
      return;
    }

    if (!livro.isbn || livro.isbn.trim() === "") {
      setError("O ISBN é obrigatório!");
      return;
    }

    if (livro.isbn.length !== 13 || !/^\d+$/.test(livro.isbn)) {
      setError("O ISBN deve conter exatamente 13 dígitos numéricos!");
      return;
    }

    if (!livro.editora || livro.editora.trim() === "") {
      setError("A editora é obrigatória!");
      return;
    }

    const body = {
      titulo: livro.titulo,
      num_paginas: numPaginasConvertido,
      isbn: livro.isbn,
      editora: livro.editora,
    };

    try {
      await LivrosService.updateLivro(Number(livro.id), body);
      alert("Livro editado com sucesso!");
      setLivro({ id: livro.id , ...body });
      setError("");
    } catch (error) {
      setError(
        `Erro ao cadastrar livro: ${error.response?.status} - ${
          error.response?.data?.error || "Erro desconhecido"
        }`
      );
    }
  }

  useEffect(() => {
    getLivro();
  }, []);

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario" onSubmit={editLivro}>
            <div className="form-group">
              <label>Id</label>
              <input
                type="text"
                disabled
                required
                value={livro.id}
                onChange={(event) => {
                  setLivro({ ...livro, id: event.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                required
                value={livro.titulo || ""}
                onChange={(event) => {
                  setLivro({ ...livro, titulo: event.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                required
                value={livro.num_paginas}
                onChange={(event) => {
                  setLivro({ ...livro, num_paginas: event.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                required
                placeholder="Ex: 9788532530780"
                value={livro.isbn || ""}
                onChange={(event) => {
                  setLivro({ ...livro, isbn: event.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                required
                value={livro.editora || ""}
                onChange={(event) => {
                  setLivro({ ...livro, editora: event.target.value });
                }}
              />
              {error && <div className="error-message">{error}</div>}
            </div>
            <div className="form-group">
              <button type="submit">Atualizar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosEdicao;
