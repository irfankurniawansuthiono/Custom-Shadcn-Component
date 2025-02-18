"use client";
import { useRef, useState } from "react";
import { TextareaAI } from "./CustomTextAreaForAI";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useAtom } from "jotai";
import { aiChatAtom } from "@/lib/Jotai";
import { useRouter } from "next/navigation";
import { routesList } from "@/app/routes";
export default function CustomAiTextArea({ id }: { id?: string }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [, setAiChat] = useAtom(aiChatAtom);
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (textareaRef.current && textareaRef.current.value.trim() !== "") {
      const message = textareaRef.current.value.trim();
  
      if (!id) {
        const randomId = Math.random().toString(36).substring(2, 9);
        router.push(`${routesList.ai}/${randomId}`);
  
        setAiChat((prevChat) => ({
          ...prevChat,
          [randomId]: [{ message, reply: "" }],
        }));
      } else {
        setAiChat((prevChat) => ({
          ...prevChat,
          [id]: [...(prevChat[id] || []), { message, reply: "" }],
        }));
      }
  
      textareaRef.current.value = ""; 
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full h-full rounded-3xl px-2 py-2 border-2">
        <TextareaAI
          onChange={handleInputChange}
          ref={textareaRef}
          name="message"
          placeholder="Type your message..."
          onInput={handleInput}
          style={{ maxHeight: "200px" }}
        />
        <div className="flex justify-between">
          <h1 className="border-2 rounded-full px-3 py-2 text-sm bg-muted select-none font-semibold">
            NanamiGPT v1
          </h1>
          <Button disabled={input.length === 0} type="submit" className="w-10 h-10 rounded-full">
            <ArrowUp size={20} />
          </Button>
        </div>
      </div>
    </form>
  );
}
