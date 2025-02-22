import express from "express";
import 'dotenv/config';
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import connectDB from "./lib/connectDB.js";

const app = express();

console.log(process.env.teste)

app.get("/bundinha",(req,res)=>{
res.status(200).send("É grande e fofinha!")
})

app.use("/users", userRouter);
app.use("/posts", postRouter);


app.listen(3000, () => {
    console.log("Server is running!");
    connectDB();
  });