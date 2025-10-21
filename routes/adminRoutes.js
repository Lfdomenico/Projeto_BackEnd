const router = require('express').Router();
const adminController = require('../controllers/adminController');

// --- Dashboard ---
// GET /admin/dashboard
router.get('/dashboard', adminController.showDashboard);

// --- Gerenciamento de Alunos (Usuário) ---
// GET /admin/alunos (Listar)
router.get('/alunos', adminController.listarAlunos);
// GET /admin/alunos/novo (Formulário de criação)
router.get('/alunos/novo', adminController.showNovoAlunoForm);
// POST /admin/alunos/novo (Processar criação)
router.post('/alunos/novo', adminController.createAluno);
// GET /admin/alunos/editar/:id (Formulário de edição)
router.get('/alunos/editar/:id', adminController.showEditAlunoForm);
// POST /admin/alunos/editar/:id (Processar edição)
router.post('/alunos/editar/:id', adminController.updateAluno);
// POST /admin/alunos/deletar/:id (Processar deleção)
router.post('/alunos/deletar/:id', adminController.deleteAluno);

// --- Gerenciamento de Palavras-Chave (MongoDB) ---
// GET /admin/palavras-chave
router.get('/palavras-chave', adminController.listarPalavrasChave);
// POST /admin/palavras-chave
router.post('/palavras-chave', adminController.createPalavraChave);
// POST /admin/palavras-chave/deletar/:id
router.post('/palavras-chave/deletar/:id', adminController.deletePalavraChave);

// --- Gerenciamento de Conhecimentos (MongoDB) ---
// GET /admin/conhecimentos
router.get('/conhecimentos', adminController.listarConhecimentos);
// POST /admin/conhecimentos
router.post('/conhecimentos', adminController.createConhecimento);
// POST /admin/conhecimentos/deletar/:id
router.post('/conhecimentos/deletar/:id', adminController.deleteConhecimento);


// NÃO ESQUEÇA DESTA LINHA
module.exports = router;