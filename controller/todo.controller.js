const TodoModel = require("../model/todo.model");

exports.createTodo = async (req, res, next) => {
   const createdModel = await TodoModel.create(req.body);
    //setting and sending status 201
    res.status(201).json(createdModel);
};