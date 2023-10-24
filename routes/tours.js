const express = require('express');
const router = express.Router();
const { add, edit, remove, all, tour } = require("../controllers/tours");
const { auth } = require('../middleware/auth');

router.get("/", all);
router.get("/:id", tour);
router.post("/add", auth, add);
router.post("/remove/:id", auth, remove);
router.put("/edit/:id", auth, edit);

module.exports = router;