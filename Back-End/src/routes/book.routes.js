import { Router } from "express";
import bookController from "../controller/book.controller";
import { validate } from "../middlewares/validation.middleware";
import { bookSchema } from "../schemas/book.schema";

const router = Router();

router.post("/livros", validate(bookSchema), bookController.createBookController);
router.get("/livros", bookController.findAllBooksController);
router.get("/livros/:id", bookController.findBookByIDController);
router.put("/livros/:id", validate(bookSchema), bookController.updateBookController);
router.delete("/livros/:id", bookController.deleteBookController);

export default router;