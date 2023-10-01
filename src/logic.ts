import {  Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "./database";
import { IMovieUpdate } from "./interfaces";

export const getMovies = async (req : Request , res : Response) => {
    if(req.query.category){
        const queryString = format(`SELECT * FROM movies WHERE category ILIKE '%s';`, req.query.category);
        const query = await client.query(queryString)
        if(query.rows.length > 0){
            res.status(200).json(query.rows);
        }else{
            const queryString = `SELECT * FROM movies;`;
            const query = await client.query(queryString);
            res.status(200).json(query.rows);
        }
        
    } else {
        const queryString = `SELECT * FROM movies;`;
        const query = await client.query(queryString);
        res.status(200).json(query.rows);
    }
}

export const getMovieFromId = async (req : Request , res : Response) => {
    
    res.status(200).json(res.locals.movie)

}


export const createMovie = async (req : Request , res : Response) => {
    const queryString = `INSERT INTO movies (name, category, duration, price)
        VALUES ($1, $2 , $3 , $4)
        RETURNING *;`
    
    const queryConfig : QueryConfig = {
        text : queryString,
        values : [req.body.name, req.body.category, req.body.duration , req.body.price]
    }

    //client.query(``)
    const query = await client.query(queryConfig)
    res.status(201).json(query.rows[0])
}


export const deleteMovieFromId = async (req : Request , res : Response) => {
    const queryString = `DELETE FROM movies WHERE id = $1;`
    const queryConfig : QueryConfig = {
        text : queryString,
        values : [req.params.id]
    }
    await client.query(queryConfig)
    return res.status(204).json({message:"Movie deleted"})
}

export const updateMovieFromId = async (req : Request , res : Response) => {
    let objectData : IMovieUpdate = {}
    Object.entries(req.body).forEach(([key,value]) => {
        if(key === "name" || key === "category"){
            if(typeof value === "string"){
                objectData[key] = value    
            }
        }
        if( key === "duration" || key === "price"){
            if(typeof value === "number"){
                objectData[key] = value
            }
        }
    })
    const queryConfig = format(`
        UPDATE movies SET (%I) = ROW (%L) WHERE id = %L RETURNING *;
    `, Object.keys(objectData), Object.values(objectData), req.params.id);
    const query = await client.query(queryConfig);
    return res.status(200).json(query.rows[0])
}