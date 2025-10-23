const router = require('express').Router();
const alunoController = require('../controllers/alunoController');

router.get('/dashboard', alunoController.showDashboard);
router.get('/projetos/novo', alunoController.showNovoProjetoForm);
router.post('/projetos', alunoController.createProjeto);
router.get('/projetos/editar/:id', alunoController.showEditProjetoForm);
router.post('/projetos/editar/:id', alunoController.updateProjeto);
router.post('/projetos/deletar/:id', alunoController.deleteProjeto);
router.get('/conhecimentos', alunoController.showConhecimentosPage);
router.post('/conhecimentos', alunoController.addConhecimento);
router.post('/conhecimentos/deletar/:id', alunoController.deleteConhecimento);

module.exports = router;