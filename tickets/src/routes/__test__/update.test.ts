import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/tickets";
import mongoose from "mongoose";

const URL = "/api/tickets";
const getURL = (id: string) => URL + "/:id".replace(":id", id);

it(`put tickets 404`, async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .put(getURL(id))
    .set("Cookie", global.signin())
    .send({
      title: "adsad",
      price: 20,
    })
    .expect(404);
});

it(`put tickets 401`, async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .put(getURL(id))
    .send({
      title: "adsad",
      price: 20,
    })
    .expect(401);
});

it(`put tickets 401 user`, async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "sdjalsd",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "1234",
      price: 1020,
    })
    .expect(401);
});

it(`put tickets 400 invalid title or price`, async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "dksadj",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "dksadj",
      price: -11,
    })
    .expect(400);
});

it(`updates the tickets provided valid inputs`, async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "dksadj",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: 11,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send();

  expect(ticketResponse.body.title).toEqual("new title");
  expect(ticketResponse.body.price).toEqual(11);
});
