import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/tickets";

const URL = "/api/tickets";
it(`has route ${URL}`, async () => {
  const response = await request(app).post(URL).send({});

  expect(response.status).not.toEqual(404);
});

it(`유저 서명 확인 - ${URL}`, async () => {
  const response = await request(app)
    .post(URL)
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it(`invalid title error - ${URL}`, async () => {
  await request(app)
    .post(URL)
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post(URL)
    .set("Cookie", global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it(`invalid price error - ${URL}`, async () => {
  await request(app)
    .post(URL)
    .set("Cookie", global.signin())
    .send({
      title: "aaa",
      price: -10,
    })
    .expect(400);

  await request(app)
    .post(URL)
    .set("Cookie", global.signin())
    .send({
      title: "aaa",
    })
    .expect(400);
});

it(`create tickets - ${URL}`, async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = "my ticket";
  const price = 25;

  await request(app)
    .post(URL)
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  tickets = await Ticket.find({});

  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].price).toEqual(price);
});
