// routes/authRoutes.js

const router = require('express').Router();
const authController = require('../controllers/authController');

// Rota para exibir o formulário de login
// GET /login
router.get('/login', authController.showLogin);

// Rota para processar o login
// POST /login
router.post('/login', authController.login);

// Rota para fazer logout
// GET /logout
router.get('/logout', authController.logout);

// NÃO ESQUEÇA DESTA LINHA!
module.exports = router;