import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "./database"
export const createBodyValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: string[] = [];

  if (!req.body.name) {
    return errors.push("Name is required!");
  }
  if (req.body.name?.length > 30) {
    return errors.push("Name should't have more than 30 characters ");
  }
  if (!req.body.category) {
    return errors.push("Category is required!");
  }
  if (req.body.category?.length > 20) {
    return errors.push("Name should't have more than 20 characters ");
  }
  if (!req.body.duration) {
    return errors.push("Duration is required!");
  }
  if (!req.body.price) {
    return errors.push("Price is required!");
  }
  if (errors.length > 0) {
    res.status(409).json(errors);
  }
  next();
};

export const movieIdValid = async (req : Request , res : Response, next : NextFunction) => {
    const queryString = `SELECT * FROM movies WHERE id = $1;`
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.id]
    }
    const query = await client.query(queryConfig)
    if(query.rowCount === 0){
        return res.status(404).json({message : "Movie not found"})
    }
    res.locals.movie = query.rows[0]

    return next()
}