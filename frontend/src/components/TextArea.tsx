import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/Progress"
import { useState } from "react"
import axios from  "axios";

export default function TextArea(){
    const [input, setInput]= useState("");
    const [output, setOutput]= useState("");
    const [isLoading, setIsLoading]= useState(false);
    function handleChange(e: any){
        e.preventDefault()
        setInput(e.target.value)
    }
//axios.post("${BACKEND_URKL")
   async function handleClick(){
        setIsLoading(true);
        const response= await axios.post("http://localhost:3000/llmCall", {
            //do sm here
            userQuery: input
        });
        const data: any= await response.data;
        setIsLoading(false);
        setOutput(data.text);
    }

    return (
    <>
        <div>
            <Textarea placeholder="Chat with your LLM !" value={input} onChange={handleChange}/>
        </div>
        <div className="m-2 p-2 flex justify-end">
         <Button variant="outline" className="onhover: bg-blue-500" onClick={handleClick}>Send</Button>
        </div>
        <div>
    
            {isLoading ?  (
            <div>
              <Progress value={78} />
            </div>
                ): (
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {output}
            </h4>
     )}
        </div>

    </>
        
    )
}