"use client";
import { useRef, useEffect, useState } from "react";

export default function ScratchReveal({ image }) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // cover layer
    ctx.fillStyle = "#d946ef";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to Reveal 🎁", canvas.width/2, canvas.height/2);
  }, []);

  function scratch(x, y) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
  }

  function handleMove(e) {
    if (revealed) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

    scratch(x, y);
  }

  return (
    <div className="relative w-[320px] h-[220px]">
      <img src={image} className="rounded-2xl absolute top-0 left-0 w-full h-full object-cover"/>
      <canvas
        ref={canvasRef}
        width={320}
        height={220}
        className="absolute top-0 left-0 rounded-2xl cursor-pointer"
        onMouseMove={(e)=>e.buttons===1 && handleMove(e)}
        onTouchMove={handleMove}
      />
    </div>
  );
}
