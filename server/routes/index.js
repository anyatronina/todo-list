const express = require("express");
const router = express.Router({ mergeParams: true });

// /api/tasks
router.use("/tasks", require("./tasks.routes"));

module.exports = router;
