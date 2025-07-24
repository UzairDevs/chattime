import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

dotenv.config();
const app=express();
app.use(cors());// 
app.use(express.json());
//just 1 API Endpoint route for making a request to the LLM!

const ai = new GoogleGenAI({});

app.post("/llmCall", async(req,res)=> {
    const {userQuery}= req.body; 
    //making LLM Call.
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: userQuery,
  });
  res.json({
    text : response.text
  })

})


app.listen(3000);