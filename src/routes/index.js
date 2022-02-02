const { Router } = require('express');
const router = Router();
const { getTemplates, createTemplate, getTemplate} = require('../controllers');

router.get('/templates', getTemplates);
router.post('/createTemplate', createTemplate);
router.get('/template/:name', getTemplate);

module.exports = router;