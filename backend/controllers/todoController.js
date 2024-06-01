const Todo = require("../models/todoModel");
const zod = require("zod");
const User = require("../models/userModel");

// Zod Schema
const newTodoSchema = zod.object({
    title: zod.string(),
});

exports.getAllTodos = async function (req, res) {
    const allTodos = await Todo.find();
    res.status(201).json({
        status: "success",
        todosLength: allTodos.length,
        allTodos,
    });
};

exports.newTodo = async function (req, res) {
    const dataValidation = newTodoSchema.safeParse(req.body);

    if (!dataValidation.success) {
        res.status(403).json({
            status: "fail",
            msg: "Validation Error!",
        });
    } else {
        const newTodo = await Todo.create(req.body);
        const loggedInUser = await User.findById(req.user._id);

        loggedInUser.userTodos.push(newTodo._id);

        await loggedInUser.save();

        res.status(201).json({
            status: "success",
            newTodo,
        });
    }
};

exports.getTodo = async function (req, res) {
    try {
        const todoId = req.params.id;
        const todo = await Todo.findById(todoId);

        if (todo) {
            res.status(200).json({
                status: "success",
                todo,
            });
        }
    } catch (err) {
        console.error("Error in finding todo:", err);
        res.status(500).json({
            status: "error",
            msg: "Unable to find the todo",
        });
    }
};

exports.deleteTodo = async function (req, res) {
    try {
        const todoId = req.params.id;

        await Todo.findByIdAndDelete(todoId);

        const user = await User.findOne({ userTodos: todoId });

        if (user) {
            user.userTodos = user.userTodos.filter(
                (todo) => todo.toString() !== todoId
            );

            await user.save();
        }

        res.status(200).json({
            status: "success",
            msg: "Todo deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({
            status: "error",
            msg: "Failed to delete todo",
        });
    }
};

exports.updateTodo = async function (req, res) {
    try {
        const todoId = req.params.id;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, req.body);

        if (updatedTodo) {
            res.status(200).json({
                status: "success",
                msg: "Todo updated successfully",
                updatedTodo,
            });
        }
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "Failed to update todo",
        });
    }
};
