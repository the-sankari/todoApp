// Express js testing doc
//https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/

const request = require("supertest");
const { response } = require("../src/app");

const app = require("../src/app");

describe("GET /api/v1", () => {
  it("responds with a json message", (done) => {
    request(app)
      .get("/api/v1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
          message: "API - 👋🌎🌍🌏",
        },
        done
      );
  });
});

describe("GET /api/v1/emojis", () => {
  it("responds with a json message", (done) => {
    request(app)
      .get("/api/v1/emojis")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, ["😀", "😳", "🙄"], done);
  });
});

describe("Endpoint /api/v1/tasks", () => {
  it("should respond with 200 when called with GET request", (done) => {
    request(app)
      .get("/api/v1/tasks")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
describe("Endpoint /api/v1/tasks", () => {
  it("should return a list of tasks when called with GET", (done) => {
    const expected = [
      {
        id: 1,
        name: "WALK THROUGH THE WAY OF KNOWLEDGE",
      },
      {
        id: 2,
        name: "GROW WITH DEVOPS",
      },
      {
        id: 3,
        name: "CODE EAT SLEEP CODE - REPEAT",
      },
    ];
    request(app)
      .get("/api/v1/tasks")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, expected, done);
  });
});

describe("Endpoint /api/v1/tasks/2", () => {
  it("should return the task when called with GET id", (done) => {
    const expected = {
      id: 2,
      name: "GROW WITH DEVOPS",
    };
    request(app)
      .get("/api/v1/tasks/2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, expected, done);
  });
});

describe("Endpoint /api/v1/tasks/20", () => {
  it("should return 404 if nothing was found with the id", (done) => {
    request(app)
      .get("/api/v1/tasks/20")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, { message: "Not found" }, done);
  });
});

describe("Endpoint /api/v1/tasks/4", () => {
  it("should return 201 when new movie was added", async () => {
    await request(app)
      .post("/api/v1/tasks/")
      .set("Accept", "application/json")
      .send({ id: 4, name: "Night" })
      .expect("Content-Type", /json/)
      // .expect(201, { message: "Created" }, done);
      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
    // Check that it was actually added as well
    const expected = {
      id: 4,
      name: "Night",
    };
    await request(app)
      .get("/api/v1/tasks/4")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
describe("Endpoint /api/v1/tasks/2", () => {
  it("should return 200 when movie was updated", async () => {
    await request(app)
      .patch("/api/v1/tasks/3")
      .set("Accept", "application/json")
      .send({ name: "Evening" })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200, { message: "Updated" });
      });
    // expect(200, { message: 'Updated' });
    // Check that it was actually added as well
    const expected = {
      id: 3,
      name: "CODE EAT SLEEP CODE - REPEAT",
    };
    await request(app)
      .get("/api/v1/tasks/3")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
    // .expect(200, expected);
  });
});

describe("Endpoint /api/v1/tasks/4", () => {
  it("should return 200 when movie was deleted", async () => {
    await request(app)
      .delete("/api/v1/tasks/4")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, { message: "Deleted" });
    await request(app)
      .get("/api/v1/tasks/4")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, { message: "Not found" });
  });
});
