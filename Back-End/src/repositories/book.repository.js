import db from "../config/database.js";

db.run(`
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        num_paginas INTEGER NOT NULL,
        isbn INTEGER NOT NULL,
        editora TEXT NOT NULL
    ) 
`);

function createBookRepository(newNook) {
  return new Promise((resolve, reject) => {
    const { titulo, isbn, editora, num_paginas } = newNook;
    db.run(
      `INSERT INTO books  (titulo, num_paginas, isbn, editora)
       VALUES (?,?,?,?)`,
      [titulo, num_paginas, isbn, editora],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            message: "Livro criado com sucesso",
            id: this.lastID,
            ...newNook,
          });
        }
      }
    );
  });
}

function findAllBooksRepository() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM books`, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function findByIDRepository(bookId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM books WHERE id = ?`, [bookId], (err, book) => {
      if (err) {
        reject(err);
      } else {
        resolve(book);
      }
    });
  });
}

function UpdateBookRepository(bookID, updateBook) {
  const fields = ["titulo", "num_paginas", "isbn", "editora"];
  const updated = [];
  const values = [];

  Object.keys(updateBook).forEach((field) => {
    if (!fields.includes(field)) {
      throw new Error(`Invalid field: ${field}`);
    }
    updated.push(`${field} = ?`);
    values.push(updateBook[field]);
  });

  const query = `UPDATE books SET ${updated.join(", ")} WHERE id = ?`;
  values.push(bookID);

  return new Promise((resolve, reject) => {
    db.run(query, values, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          message: "Livro atualizado com sucesso",
          id: bookID,
          ...updateBook,
        });
      }
    });
  });
}

function DeleteBookRepository(bookID) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM books WHERE id = ?`, [bookID], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          message: "Livro excluído com sucesso",
          id: bookID,
        });
      }
    });
  });
}

export default {
  createBookRepository,
  findAllBooksRepository,
  findByIDRepository,
  UpdateBookRepository,
  DeleteBookRepository,
};
