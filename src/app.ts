import express from "express"
import "dotenv/config"
import { connectDb } from "./database"
import { createMovie, deleteMovieFromId, getMovieFromId, getMovies, updateMovieFromId } from "./logic"
import { createBodyValid,movieIdValid, movieNameValid } from "./middlewares"

const app = express()


app.use(express.json())

app.get("/movies" ,getMovies)
app.post("/movies", createBodyValid ,movieNameValid,createMovie)
app.get("/movies/:id", movieIdValid ,getMovieFromId)
app.delete("/movies/:id", movieIdValid, deleteMovieFromId)
app.patch("/movies/:id", movieIdValid, movieNameValid, updateMovieFromId)


app.listen(3000, async () => {
    console.log("server is running on port 3000")
    await connectDb()
})
