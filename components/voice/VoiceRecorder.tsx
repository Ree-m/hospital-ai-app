"use client";
import { useEffect, useState } from "react";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import AnimatedBar from "./AnimatedBar";
import { NotesInterface, useNotes } from "@/app/context/notesContext";

export default function VoiceRecorder() {
  const { text, isListening, startListening, stopListening, hasRecognition } =
    useSpeechRecognition();
  const [isClient, setIsClient] = useState(false);

  const { setNotes } = useNotes();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const stopRecording = async () => {
    stopListening();
    const response = await fetch("/api/voice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data: NotesInterface = await response.json();
    if (data) {
      setNotes(data);
    }
  };

  if (!isClient) {
    return <Loading />;
  }

  return (
    <div className="px-10 py-20 border my-6 rounded-md bg-[#f9fafc]">
      {hasRecognition ? (
        <>
          <div className="flex flex-col md:flex-row space-around md:space-x-26">
            <AnimatedBar isListening={isListening} />
            <div className="flex space-x-4">
              <Button
                className="px-10 py-5 hover:cursor-pointer disabled:cursor-auto"
                onClick={startListening}
                disabled={isListening}
              >
                Start
              </Button>
              <Button
                className="px-10 py-5 hover:cursor-pointer disabled:cursor-auto"
                onClick={stopRecording}
                disabled={!isListening}
              >
                Stop
              </Button>
            </div>
          </div>
        </>
      ) : (
        <h2>
          Your browser doesnt support speech recognition. Try with a different
          browser.
        </h2>
      )}
    </div>
  );
}
