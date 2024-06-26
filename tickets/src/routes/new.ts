import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "ms-sgtickets-common2";
import { Ticket } from "../models/tickets";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({ gt: 0 }).withMessage("price는 0보다 커야함"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
