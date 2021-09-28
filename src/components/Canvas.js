import React, { useEffect, useRef, useState } from "react";

class Animation {
  constructor(canvas, context, x, y, radius) {
    this.canvas = canvas;
    this.context = context;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.dx = 1;
    this.dy = 1;
    this.opacity = 1;
  }
  draw() {
    this.context.beginPath();
    this.context.fillStyle = `rgba(255,255,255,${this.opacity})`;
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fill();
    this.context.closePath();
  }
  update() {
    const x = setInterval(() => {
      this.context.clearRect(this.x - 20, this.y - 20, 40, 40);
      if (this.radius > 0) this.radius -= 0.5;
      else clearInterval(x);
      this.draw();
    }, 10);
  }
}

function Canvas({ children }) {
  const Canvas = useRef(null);
  const context = useRef(null);

  useEffect(() => {
    const canvas = Canvas.current;
    context.current = Canvas.current.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const click = (event) => {
    const { clientX, clientY } = event;
    const ball = new Animation(
      Canvas.current,
      context.current,
      clientX,
      clientY,
      20
    );
    ball.update();
  };

  return (
    <canvas
      ref={Canvas}
      style={{ background: "grey" }}
      onClick={(e) => click(e)}
    >
      {children}
    </canvas>
  );
}

export default Canvas;
