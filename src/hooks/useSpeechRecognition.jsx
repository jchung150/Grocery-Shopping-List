// import { useState, useEffect } from "react";

// let recognition = null;
// if ("webkitSpeechRecognition" in window) {
//   recognition = new window.webkitSpeechRecognition();
//   recognition.continuous = true;
//   recognition.interimResults = true;
//   recognition.lang = "en-US";
// }

// export default function useSpeechRecognition() {
//   const [text, setText] = useState("");
//   const [isListening, setIsListening] = useState(false);

//   useEffect(() => {
//     const handleResult = (event) => {
//       console.log("onresult event", event);
//       let interimTranscript = "";
//       let finalTranscript = "";

//       for (let i = event.resultIndex; i < event.results.length; ++i) {
//         const transcript = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           finalTranscript += transcript;
//         } else {
//           interimTranscript += transcript;
//         }
//       }

//       setText(finalTranscript || interimTranscript);
//       recognition.stop();
//       setIsListening(false);
//     };

//     const handleError = (event) => {
//       console.error("Speech recognition error", event);
//       recognition.stop();
//       setIsListening(false);
//     };

//     recognition.onresult = handleResult;
//     recognition.onerror = handleError;

//     return () => {
//       recognition.onresult = null;
//       recognition.onerror = null;
//     };
//   }, []);

//   const startListening = () => {
//     setText("");
//     recognition.start();
//     setIsListening(true);
//   };

//   const stopListening = () => {
//     recognition.stop();
//     setIsListening(false);
//   };

//   return {
//     text,
//     isListening,
//     startListening,
//     stopListening,
//   };
// }
