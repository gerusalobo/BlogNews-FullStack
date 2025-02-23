import express from "express";
import 'dotenv/config';
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import connectDB from "./lib/connectDB.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";

const app = express();
app.use("/webhooks", webhookRouter);
app.use(express.json());

console.log(process.env.teste)

app.get("/bundinha",(req,res)=>{
res.status(200).send("É grande e fofinha!")
})

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use(clerkMiddleware());

app.use((error, req, res, next) => {
    res.status(error.status || 500);
  
    res.json({
      message: error.message || "Something went wrong!",
      status: error.status,
      stack: error.stack,
    });
  });


app.listen(3000, () => {
    console.log("Server is running!");
    connectDB();
  });