import { Request, Response } from 'express';
import { Redis } from "ioredis";

export type ServingCategory =  "food" | "drink" | "dessert";
export type MyContext = {
    req: Request,
    res: Response,
    redis: Redis,
}