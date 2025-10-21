const router = require('express').Router();
const publicRoutes = require('./publicRoutes');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const alunoRoutes = require('./alunoRoutes');
const { checkAuth, isAdmin, isAluno } = require('../middleware/authMiddleware');

// Rotas Públicas (Usuário Externo)
router.use('/', publicRoutes);

// Rotas de Autenticação
router.use('/', authRoutes);

// Rotas do Aluno (Protegidas por checkAuth e isAluno)
router.use('/aluno', checkAuth, isAluno, alunoRoutes);

// Rotas do Admin (Protegidas por checkAuth e isAdmin)
router.use('/admin', checkAuth, isAdmin, adminRoutes);

module.exports = router;