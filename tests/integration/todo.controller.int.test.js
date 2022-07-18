const { expect } = require('chai');
const request = require('supertest'); // test whole nodejs app
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";

describe(endpointUrl, () => {
    // beforeEach(() => {
    //     jest.setTimeout(100000);
    //   });
test("GET" + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
})

    it("POST " + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
    });

    it("should return error 500 on malformed data with POST" + endpointUrl, 
    async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send({ title: "Missing done property" });
            expect(response.statusCode).toBe(500);
            // expect(response.body).toStrictEqual({
            //     message: "Todo validation failed: done: Path `done` is required."
            //    });
         }
    );
});