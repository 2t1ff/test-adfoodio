import { Request, Response } from 'express';
import { Redis } from "ioredis";

export type ServingCategory =  "food" | "drink" | "dessert";
export type OrderState =  "kitchen" | "ready" | "picked up";
export type MyContext = {
    req: Request,
    res: Response,
    redis: Redis,
}