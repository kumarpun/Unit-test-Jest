const TodoController = require("../../controller/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");
const { describe } = require("mocha");
const { expect } = require("chai");
const allTodos = require("../mock-data/all-todos.json");

// mock function - does not call original implementation but still can see if it is called and return
// predefined value
TodoModel.create = jest.fn();
TodoModel.find = jest.fn();

// global scope
let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("TodoController.getTodos", () => {
  // getTodos
  it("should have getTodos fn", () => {
    expect(typeof TodoController.getTodos).toBe("function");
  });

  it("should call TodoModel.find({})", async () => {
    await TodoController.getTodos(req, res, next);
    expect(TodoModel.find).tohaveBeenCalledWith({});
  })

  it("should return response with 200 and all todos", async () => {
    TodoModel.find.mockReturnValue(allTodos);
    await TodoController.getTodos(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toString(allTodos);
  })

  it("should handle error in getTodos", async () => {
    const errorMessage = { message: "Error finding"};
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.find.mockReturnValue(rejectedPromise);
    await TodoController.getTodos(req, res, next);
    expect(next).tohaveBeenCalledWith(errorMessage);
  });
});

describe("TodoController.createTodo", () => {
    it("should have a createTodo function", () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });

  it("should call TodoModel.create", () => {
    req.body = newTodo;
    TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });  

  it("should return 201 response code", async () => {
    req.body = newTodo;
   await TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    // ensure response has been sent back
    expect(res._isEndCalled()).toBeTruthy();
  })

  it("should retuen json body in response", async () => {
    req.body = newTodo;
     TodoModel.create.mockReturnValue(newTodo);
   await TodoController.createTodo(req, res, next);
    // same value but different object in memory so use toStrictEqual()
    expect(res._getJSONData()).toStrictEqual(newTodo);
  })

  // it("should handle error", async () => {
  //   const errorMessage = { message: "Done property missing"};
  //   const rejectedPromise = Promise.reject(errorMessage);
  //   TodoModel.create.mockReturnValue(rejectedPromise);
  //    await TodoController.createTodo(req, res, next);
  //    expect(next).toBeCalledWith(errorMessage);
  // })
});