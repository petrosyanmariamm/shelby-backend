const express = require('express');
const router = express.Router();
const { add, edit, remove, all, tourdetail_page_label } = require("../controllers/tourdetail_page_labels");
const { auth } = require('../middleware/auth');

router.get("/", all);
router.get("/:id", tourdetail_page_label);
router.post("/add", auth, add);
router.post("/remove/:id", auth, remove);
router.put("/edit/:id", auth, edit);

module.exports = router;