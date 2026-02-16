"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import ScratchReveal from "./ScratchReveal";

export default function Home() {
  const [done, setDone] = useState(false);
  const [choice, setChoice] = useState("");
  const [hearts, setHearts] = useState([]);

  const gift = {
    day: 1,
    title: "Mystery Surprise",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a",
    message:
      "Happy Birthday my love ❤️\nThis week is all about making you smile."
  };

  useEffect(() => {
    const saved = localStorage.getItem("bday_choice_day_" + gift.day);
    if (saved) {
      setChoice(saved);
      setDone(true);
    }
  }, []);
  

  // floating hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(h => [...h, { id: Math.random(), left: Math.random()*100 }]);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  function celebrate() {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  }

  async function select(c) {
    setChoice(c);
  
    await fetch("/api/choice", {
      method: "POST",
      body: JSON.stringify({
        day: gift.day,
        choice: c
      })
    });
  
    localStorage.setItem("bday_choice_day_"+gift.day, c);
  
    if (c === "accept") celebrate();
    setTimeout(() => setDone(true), 700);
  }
  

  if (done) {
    return (
      <main className="flex min-h-screen items-center justify-center text-center bg-gradient-to-br from-pink-200 to-purple-200 p-6">
        <motion.div
          initial={{ scale:0.5, opacity:0 }}
          animate={{ scale:1, opacity:1 }}
          className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl"
        >
          <h1 className="text-5xl font-bold mb-4">💌 Noted</h1>
          <p className="text-xl">
            {choice === "accept" && "Yayyy! I knew you'd love it 😌❤️"}
            {choice === "reject" && "Okay okay… tomorrow I impress you 😤"}
            {choice === "later" && "Added to our future adventures 😉"}
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen text-center gap-6 p-6 bg-gradient-to-br from-pink-200 to-purple-200 overflow-hidden">

      {/* floating hearts */}
      {hearts.map(h => (
        <motion.div
          key={h.id}
          initial={{ y:0, opacity:1 }}
          animate={{ y:-900, opacity:0 }}
          transition={{ duration:6 }}
          className="absolute text-2xl"
          style={{ left:`${h.left}%`, bottom:-20 }}
        >
          ❤️
        </motion.div>
      ))}

      <motion.div
        initial={{ y:80, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:1 }}
        className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md"
      >
        <h1 className="text-5xl font-extrabold mb-2">🎂 Happy Birthday 🎂</h1>
        <h2 className="text-2xl font-semibold mb-4">Day {gift.day} Monday Surprise 💝</h2>

        <div className="mb-4 flex justify-center">
  <ScratchReveal image={gift.image}/>
</div>


        <h3 className="text-3xl font-bold">{gift.title}</h3>
        <p className="mt-3 whitespace-pre-line text-lg">{gift.message}</p>

        <div className="flex flex-col gap-3 mt-6">
          <motion.button whileTap={{ scale:0.9 }} whileHover={{ scale:1.05 }} onClick={()=>select("accept")} className="bg-green-500 text-white p-4 rounded-xl text-lg shadow-md">Accept 😍</motion.button>
          <motion.button whileTap={{ scale:0.9 }} whileHover={{ scale:1.05 }} onClick={()=>select("reject")} className="bg-red-500 text-white p-4 rounded-xl text-lg shadow-md">Find something else 😅</motion.button>
          <motion.button whileTap={{ scale:0.9 }} whileHover={{ scale:1.05 }} onClick={()=>select("later")} className="bg-yellow-500 text-white p-4 rounded-xl text-lg shadow-md">Bucket later 🤔</motion.button>
        </div>
      </motion.div>
    </main>
  );
}
