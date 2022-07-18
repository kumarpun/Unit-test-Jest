const TodoModel = require("../model/todo.model");

exports.createTodo = async (req, res, next) => {
    try {
   const createdModel = await TodoModel.create(req.body);
    //setting and sending status 201
    res.status(201).json(createdModel);
    } catch (err) {
        next(err);
    }
};

exports.getTodos = async (req, res, next) => {
    try {
  const allTodos =  await TodoModel.find({});
  res.status(200).json(allTodos);
    } catch (err) {
        next(err);
    }
};