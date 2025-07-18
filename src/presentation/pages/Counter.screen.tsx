import React, { useState, useRef } from "react";

// Extend Window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

const validateStartSpeech = (text: string) => {
  return (
    text.includes("contar") ||
    text.includes("começar") ||
    text.includes("iniciar") ||
    text.includes("já") ||
    text.includes("comece") ||
    text.includes("vamos") ||
    text.includes("iniciar") ||
    text.includes("start")
  );
};

const validateStopSpeech = (text: string) => {
  return (
    text.includes("parar") ||
    text.includes("stop") ||
    text.includes("pause") ||
    text.includes("pausar") ||
    text.includes("terminar") ||
    text.includes("fim") ||
    text.includes("finalizar") ||
    text.includes("encerrar") ||
    text.includes("pare") ||
    text.includes("chega")
  );
};

// Get SpeechRecognition constructor
const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export default function CounterScreen() {
  const [listening, setListening] = useState(false);
  const [counting, setCounting] = useState(false);
  const [seconds, setSeconds] = useState(180);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);
  const countingRef = useRef(counting);

  // Inicia escuta de voz
  const startListening = () => {
    if (!SpeechRecognition) {
      alert("Reconhecimento de voz não suportado neste navegador.");
      return;
    }
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "pt-BR";
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = (event: any) => {
      const text =
        event.results[event.results.length - 1][0].transcript.toLowerCase();
      if (validateStartSpeech(text)) {
        startCounting();
      }
      if (validateStopSpeech(text)) {
        stopCounting();
      }
    };

    recognitionRef.current.start();
    setListening(true);
  };

  // Para escuta de voz
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
  };

  // Inicia cronômetro
  const startCounting = () => {
    setCounting(true);
    setSeconds(180);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setCounting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Para cronômetro
  const stopCounting = () => {
    setCounting(false);
    clearInterval(intervalRef.current!);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <button onClick={listening ? stopListening : startListening}>
        {listening ? "Escutando..." : "Iniciar"}
      </button>
      <div style={{ fontSize: 32, margin: 20 }}>
        {counting ? `Tempo: ${seconds}s` : 'Aguardando comando "contar"'}
      </div>
      {counting && <button onClick={stopCounting}>Parar</button>}
    </div>
  );
}
