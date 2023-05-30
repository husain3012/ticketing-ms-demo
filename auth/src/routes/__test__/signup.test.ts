import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful sign up", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 on invalid email ", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest@.com",
      password: "password",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testcom",
      password: "password",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "testtestcom",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 on invalid password ", async () => {
    await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "passwordpasswordpasswordpasswordpassword",
    }).expect(400);
    
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "p",
    })
    .expect(400);
});



it("disallows sign ups with duplicate email ", async () => {
     await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    }).expect(201);
    
    await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    }).expect(400);
    
});


it("sets a cookie after successful signup ", async () => {
    const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    }).expect(201);
    
    expect(response.get('Set-Cookie')).toBeDefined();
});