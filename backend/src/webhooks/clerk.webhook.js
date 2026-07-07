import express from "express";
import { clerk } from "../controllers/clerk.controller";

const clerkRouter = express.Router();

clerkRouter.post("/", clerk);

export default clerkRouter;
