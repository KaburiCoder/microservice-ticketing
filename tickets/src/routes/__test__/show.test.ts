import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/tickets";
import mongoose from "mongoose";

const URL = "/api/tickets";
const getURL = (id: string) => URL + "/:id".replace(":id", id);

it(`ticket is not found - ${getURL("myId")}`, async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app).get(getURL(id)).send({});

  expect(response.status).toEqual(404);
});

it(`티켓 이미 존재? - ${URL}`, async () => {
  const title = "concert";
  const price = 20;
  const response = await request(app)
    .post(URL)
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(getURL(response.body.id))
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
