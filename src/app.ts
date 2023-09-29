import express from "express"
import "dotenv/config"
import { connectDb } from "./database"
import { createMovie, getMovieFromId, getMovies } from "./logic"
import { createBodyValid, movieIdValid } from "./middlewares"

const app = express()


app.use(express.json())

app.get("/movies" , getMovies)
app.post("/movies", createBodyValid ,createMovie)
app.get("/movies/:id", movieIdValid ,getMovieFromId)
app.delete("/movies/:id")



app.listen(3000, async () => {
    console.log("server is running on port 3000")
    await connectDb()
})
