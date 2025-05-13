import bookRepository from "../repositories/book.repository";

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
  const updateBook = await bookRepository.UpdateBookRepository(bookID, updateBook);
  if (!updateBook) {
    throw new Error("Livro não atualizado");
  }
  return updateBook;
}

async function deleteBookService(bookID) {
  const book = await bookRepository.findByIDRepository(bookID);
  if (!book) {
    throw new Error("Livro não encontrado");
  }
  const deleteBook = await bookRepository.DeleteBookRepository(bookID);
  if (!deleteBook) {
    throw new Error("Livro não excluído");
  }
  return deleteBook;
}

export default {
  createBookService,
  findAllBooksService,
  findBookIDService,
  updateBookService,
  deleteBookService,
};