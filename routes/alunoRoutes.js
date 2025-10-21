const router = require('express').Router();
const alunoController = require('../controllers/alunoController');

// Rota principal do aluno (Dashboard)
// GET /aluno/dashboard
router.get('/dashboard', alunoController.showDashboard);

// --- Gerenciamento de Projetos ---

// Mostra o formulário para criar um novo projeto
// GET /aluno/projetos/novo
router.get('/projetos/novo', alunoController.showNovoProjetoForm);

// Processa a criação do novo projeto
// POST /aluno/projetos
router.post('/projetos', alunoController.createProjeto);

// Mostra o formulário para editar um projeto
// GET /aluno/projetos/editar/:id
router.get('/projetos/editar/:id', alunoController.showEditProjetoForm);

// Processa a edição do projeto
// POST /aluno/projetos/editar/:id
router.post('/projetos/editar/:id', alunoController.updateProjeto);

// Processa a exclusão do projeto
// POST /aluno/projetos/deletar/:id
router.post('/projetos/deletar/:id', alunoController.deleteProjeto);

// --- Gerenciamento de Conhecimentos ---
// (Rotas para o aluno gerenciar seus próprios conhecimentos)


// NÃO ESQUEÇA DESTA LINHA
module.exports = router;