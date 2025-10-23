const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.showDashboard);
router.get('/alunos', adminController.listarAlunos);
router.get('/alunos/novo', adminController.showNovoAlunoForm);
router.post('/alunos/novo', adminController.createAluno);
router.get('/alunos/editar/:id', adminController.showEditAlunoForm);
router.post('/alunos/editar/:id', adminController.updateAluno);
router.post('/alunos/deletar/:id', adminController.deleteAluno);
router.get('/palavras-chave', adminController.listarPalavrasChave);
router.post('/palavras-chave', adminController.createPalavraChave);
router.post('/palavras-chave/deletar/:id', adminController.deletePalavraChave);
router.get('/conhecimentos', adminController.listarConhecimentos);
router.post('/conhecimentos', adminController.createConhecimento);
router.post('/conhecimentos/deletar/:id', adminController.deleteConhecimento);


module.exports = router;