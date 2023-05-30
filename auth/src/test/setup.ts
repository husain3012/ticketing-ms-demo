import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { connections, mongo } from "mongoose";
import request from "supertest"

import { app } from "../app";

declare global {
  var signIn: () => Promise<string[]>;
}


global.signIn = async (email = 'test@test.com', password = 'password') =>{

    const authResponse = await  request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    }).expect(201);

    const cookie = authResponse.get("Set-Cookie");
    return cookie;
    


}


let mongod: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "testsecret";
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let conn of collections) {
    await conn.deleteMany({});
  }
});

afterAll(async () => {
  if (mongod) {
    await mongod.stop();
  }
  await mongoose.connection.close();
});
