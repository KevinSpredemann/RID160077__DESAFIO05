import bookServices from "../services/book.services";

async function createBookController(req, res) {
  const newBook = req.body;
  try {
    const createBook = await bookServices.createBookService(newBook);
    res.status(201).json(createBook);
  } catch (error) {
    res.status(400).send({
      error: error.message || "Erro Desconhecido",
      details: error,
    });
  }
}

async function findAllBooksController(req, res) {
  try {
    const books = await bookServices.findAllBooksService();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).send({
      error: error.message || "Erro Desconhecido",
      details: error,
    });
  }
}

async function findBookByIDController(req, res) {
  const bookID = req.params.id;
  try {
    const book = await bookServices.findBookIDService(bookID);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).send({
      error: error.message || "Erro Desconhecido",
      details: error,
    });
  }
}

async function updateBookController(req, res) {
  const bookID = req.params.id;
  const updateBook = req.body;
  try {
    const response = await bookServices.updateBookService(bookID, updateBook);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({
      error: error.message || "Erro Desconhecido",
      details: error,
    });
  }
}

async function deleteBookController(req, res) {
  const bookID = req.params.id;
  try {
    const response = await bookServices.deleteBookService(bookID);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({
      error: error.message || "Erro Desconhecido",
      details: error,
    });
  }
}

export default {
  createBookController,
  findAllBooksController,
  findBookByIDController,
  updateBookController,
  deleteBookController,
}
