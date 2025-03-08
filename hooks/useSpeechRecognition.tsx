"use client";
import { useEffect, useState } from "react";

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<null | SpeechRecognition>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const speechRecognition = new webkitSpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.lang = navigator.language;

      speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
        let resultText = "";
        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          if (result && result[0] && result[0].transcript) {
            resultText += result[0].transcript + " ";
          }
        }
        setText(resultText.trim());
      };

      setRecognition(speechRecognition);
      return () => {
        speechRecognition.abort();
      };
    }
  }, []);

  const startListening = () => {
    setText("");
    setIsListening(true);
    recognition?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition?.stop();
  };

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognition: !!recognition,
  };
};

export default useSpeechRecognition;
