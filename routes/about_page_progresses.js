const express = require('express');
const router = express.Router();
const { all, add, remove, edit, about_page_progress } = require("../controllers/about_page_progresses");
const { auth } = require("../middleware/auth");


router.get('/', all);
router.get('/:id', about_page_progress);
router.post('/add', auth, add);
router.post('/remove/:id', auth, remove);
router.put('/edit/:id', auth, edit)

module.exports = router;