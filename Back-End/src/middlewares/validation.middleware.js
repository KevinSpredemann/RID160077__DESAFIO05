export const validate = (schema) => async (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).send({
            error: error.message || "Erro Desconhecido",
            details: error,
        });
    }
};