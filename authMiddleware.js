// src/middlewares/authMiddleware.js
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const isFromBrowser =
    !token && req.headers.accept && req.headers.accept.includes("text/html");

  if (isFromBrowser) {
    return next();
  }
  if (!token || token !== "Bearer meuToken123") {
    return res.status(403).json({ mensagem: "Token inválido ou ausente" });
  }
  next();
};