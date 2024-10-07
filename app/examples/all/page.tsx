// page.tsx

"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Chat from "../../components/chat";
import WeatherWidget from "../../components/weather-widget";
import { getWeather } from "../../utils/weather";
import FileViewer from "../../components/file-viewer";

interface RequiredActionFunctionToolCall {
  function: {
    name: string;
    arguments: string;
  };
  id: string;
  type: 'function';
}

const Page = () => {
  const [weatherData, setWeatherData] = useState({});
  const [formData, setFormData] = useState<any>(null);
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  // Recuperar las respuestas del formulario al cargar la página
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
    }
  }, []);

  const functionCallHandler = async (
    call: RequiredActionFunctionToolCall
  ): Promise<string> => {
    if (call.function.name === "get_weather") {
      const args = JSON.parse(call.function.arguments);
      const data = await getWeather(args.location);
      setWeatherData(data);

      return JSON.stringify(data);
    } else {
      return "Function not supported";
    }
  };

  const handleStartOrientation = () => {
    if (formData) {
      const messageContent = `He completado un formulario de orientación vocacional. Estas son mis respuestas: ${JSON.stringify(
        formData
      )}. Por favor, utiliza esta información para ayudarme en mi orientación vocacional.`;
      setInitialMessage(messageContent);
    } else {
      console.error("No hay respuestas guardadas.");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <WeatherWidget {...weatherData} />
          <FileViewer />
        </div>
        <div className={styles.chatContainer}>
          <h1>Bienvenido al chat de orientación</h1>
          {/* Ajustamos el botón con la nueva estructura */}
          <div className={styles.buttonContainer}>
            <button
              className={styles.animatedButton}
              onClick={handleStartOrientation}
            >
              <span>Iniciar Orientación</span>
              <img
                src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png"
                alt="Icono"
                height="62"
                width="62"
              />
            </button>
          </div>
        </div>
        <div className={styles.chat}>
          <Chat
            functionCallHandler={functionCallHandler}
            initialMessage={initialMessage}
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
