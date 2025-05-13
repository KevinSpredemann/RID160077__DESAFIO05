import { useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss";
import SubmenuLivros from "../../components/SubmenuLivros/SubmenuLivros";
import { LivrosService } from "../../api/LivrosService";
import Swal from "sweetalert2";

const LivrosCadastro = () => {
  const [livro, setLivro] = useState({
    titulo: "",
    num_paginas: "",
    isbn: "",
    editora: "",
  });
  const [error, setError] = useState("");

  async function createLivro(event) {
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
      await LivrosService.createLivro(body);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Livro cadastrado com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
      setLivro({ titulo: "", num_paginas: "", isbn: "", editora: "" });
      setError("");
    } catch (error) {
      setError(
        `Erro ao cadastrar livro: ${error.response?.status} - ${
          error.response?.data?.error || "Erro desconhecido"
        }`
      );
    }
  }

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario" onSubmit={createLivro}>
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                required
                value={livro.titulo}
                onChange={(event) =>
                  setLivro({ ...livro, titulo: event.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                required
                value={livro.num_paginas}
                onChange={(event) =>
                  setLivro({ ...livro, num_paginas: event.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                required
                placeholder="Ex: 9788532530780"
                value={livro.isbn}
                onChange={(event) =>
                  setLivro({ ...livro, isbn: event.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                required
                value={livro.editora}
                onChange={(event) =>
                  setLivro({ ...livro, editora: event.target.value })
                }
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <button type="submit">Cadastrar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosCadastro;
