import e from "express";
import bookRepository from "../repositories/book.repository.js";

async function createBookService(newNook) {
  const createBook = await bookRepository.createBookRepository(newNook);
  if (!createBook) {
    throw new Error("Livro não cadastrado");
  }
  return createBook;
}

async function findAllBooksService() {
  const books = await bookRepository.findAllBooksRepository();
  if (!books) {
    throw new Error("Livros não encontrados");
  }
  return books;
}

async function findBookIDService(booksID) {
  const book = await bookRepository.findByIDRepository(booksID);
  if (!book) {
    throw new Error("Livro não encontrado");
  }
  return book;
}

async function updateBookService(bookID, updateBook) {
 const book = await bookRepository.findByIDRepository(bookID);
  if (!book) {
    throw new Error("Livro não encontrado");
  }
  const updatedBook = await bookRepository.UpdateBookRepository(bookID, updateBook);
  if (!updatedBook) {
    throw new Error("Livro não atualizado");
  }
  return updatedBook;
}

async function deleteBookService(bookId) {
  const book = await bookRepository.findByIDRepository(bookId);
  if (!book) throw new Error("Livro não encontrado");
  const titulo = book.titulo;
  await bookRepository.DeleteBookRepository(bookId);
  return { message: "Livro removido com sucesso", titulo };
}

export default {
  createBookService,
  findAllBooksService,
  findBookIDService,
  updateBookService,
  deleteBookService,
};