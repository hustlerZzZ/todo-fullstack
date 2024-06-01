const express = require("express");
const todoController = require("../controllers/todoController");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/newTodo", userController.protect, todoController.newTodo);
router.get("/getAllTodos", userController.protect, todoController.getAllTodos);
router.delete(
    "/deleteTodo/:id",
    userController.protect,
    todoController.deleteTodo
);
router.get("/getTodo/:id", userController.protect, todoController.getTodo);
router.patch(
    "/updateTodo/:id",
    userController.protect,
    todoController.updateTodo
);

module.exports = router;
