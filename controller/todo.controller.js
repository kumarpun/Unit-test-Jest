const TodoModel = require("../model/todo.model");

exports.createTodo = (req, res, next) => {
   const createdModel = TodoModel.create(req.body);
    //setting and sending status 201
    res.status(201).json(createdModel);
};
