'use client'
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import arrow from "./arrow";


export default function Home() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateanswer(){
    setAnswer("loading...");
   const response= await axios({
      // url: "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyBuutWO4iBFysHtu-B_L7eYB7YeFyyrSMw",
      url: "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GOOGLE_GEN_AI_KEY}",
      method: "post",
      data: {
        contents:[
        {parts: [{text : question}]},
      ],
    },

    });
    setAnswer(response["data"] ["candidates"] [0]["content"]["parts"][0]["text"])

  }
  return (
    <>
      <p className="textchat">Welcome to your own chatGPT</p>
       <div className="container">
        <div className="input-section">
          <input
           className="textarea"
            type="text" 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
            placeholder="Type your question here" 
          />
       
          <button className="result"onClick={generateanswer}>
            Generate Answer
          </button>
          </div>
  
          <div className="search-result">
              <pre>{answer}</pre>
         </div>
      </div>
   </>
  );
}


