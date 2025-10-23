const router = require('express').Router();
const publicRoutes = require('./publicRoutes');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const alunoRoutes = require('./alunoRoutes');
const { checkAuth, isAdmin, isAluno } = require('../middleware/authMiddleware');


router.use('/', publicRoutes);


router.use('/', authRoutes);
router.use('/aluno', checkAuth, isAluno, alunoRoutes);


router.use('/admin', checkAuth, isAdmin, adminRoutes);

module.exports = router;