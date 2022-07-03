const TodoController = require("../../controller/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");

// mock function - does not call original implementation but still can see if it is called and return
// predefined value
TodoModel.create = jest.fn();

// global scope
let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
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
});