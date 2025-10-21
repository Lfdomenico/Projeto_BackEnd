const router = require('express').Router();
const publicController = require('../controllers/publicController');

router.get('/', publicController.listarProjetos);

router.get('/relatorio', publicController.mostrarRelatorio);


module.exports = router;