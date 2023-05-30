import request from "supertest";
import { app } from "../../app";

it("returns details of currently logged in user", async () => {
  
    const cookie = await signIn();

    const response =  await request(app)
    .get("/api/users/currentuser").set("Cookie", cookie)
    .send()
    .expect(200);

    expect(response.body.currentUser.email).toEqual("test@test.com")
    

});


it("returns currentUser as null when no user is signed in", async () => {
  
   

    const response =  await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

    expect(response.body.currentUser).toBeNull();
    

});


