"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, memo } from "react";

const BgMove = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let mouseMoved = false;
    let reqAnimationHandle: number;
    const pointer = {
      x: 0.5 * window.innerWidth,
      y: 0.5 * window.innerHeight,
    };
    const params = {
      pointsNumber: 40,
      widthFactor: 10,
      mouseThreshold: 0.5,
      spring: 0.25,
      friction: 0.5,
    };
    const trail = new Array(params.pointsNumber);
    for (let i = 0; i < params.pointsNumber; i++) {
      trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
      };
    }

    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const update = (t: number) => {
      if (!mouseMoved) {
        pointer.x =
          (0.5 + 0.3 * Math.cos(0.001 * t) * Math.sin(0.005 * t)) *
          window.innerWidth;
        pointer.y =
          (0.5 + 0.2 * Math.cos(0.005 * t) * Math.sin(0.001 * t)) *
          window.innerHeight;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
        p.dx += spring * (prev.x - p.x);
        p.dy += spring * (prev.y - p.y);
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "#3bc3");
      gradient.addColorStop(0.8, "#3bc3");

      ctx.strokeStyle = gradient;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
      }

      ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
      ctx.stroke();

      reqAnimationHandle = window.requestAnimationFrame(update);
    };

    const _clickFunc = (e: MouseEvent) => updateMousePosition(e.pageX, e.pageY);
    const _mouseMoveFunc = (e: MouseEvent) => {
      mouseMoved = true;
      updateMousePosition(e.pageX, e.pageY);
    };
    const _touchMoveFunc = (e: TouchEvent) => {
      mouseMoved = true;
      updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
    };

    window.addEventListener("click", _clickFunc);
    window.addEventListener("mousemove", _mouseMoveFunc);
    window.addEventListener("touchmove", _touchMoveFunc);

    const updateMousePosition = (eX: number, eY: number) => {
      pointer.x = eX;
      pointer.y = eY;
    };

    const interval = setInterval(() => {
      updateMousePosition(533, 132);
    }, 2000);
    const interval2 = setInterval(() => {
      updateMousePosition(1200, 800);
    }, 3000);

    setupCanvas();
    update(0);

    window.addEventListener("resize", setupCanvas);

    return () => {
      window.cancelAnimationFrame(reqAnimationHandle);
      window.removeEventListener("resize", setupCanvas);
      window.removeEventListener("click", _clickFunc);
      window.removeEventListener("mousemove", _mouseMoveFunc);
      window.removeEventListener("touchmove", _touchMoveFunc);

      clearInterval(interval);
      clearInterval(interval2);
    };
  }, [pathname]);

  return (
    <div className="bg-move overscroll-none absolute top-0 left-0 w-full h-full overflow-hidden z-[4]">
      <div className="glassy-overlay absolute w-full h-full top-0 left-0 bg-white/[0.05] backdrop-blur-[100px] pointer-events-none "></div>
      <canvas ref={canvasRef} id="canvas"></canvas>
    </div>
  );
};

// const Wrap = styled('div')(({ theme }) => ({
//   overscrollBehavior: 'none',
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   overflow: 'hidden',
//   zIndex: 4,
//   '.glassy-overlay': {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     background: 'rgba(255,255,255,0.05)',
//     backdropFilter: 'blur(50px)',
//     pointerEvents: 'none',
//   },
//   '.container': {
//     position: 'absolute',
//     top: 0,
//     zIndex: 1000000,
//   },

//   [`@media (min-width: ${WIDTH_MEDIUM}px) and (max-width: 1439px)`]: {},
//   [theme.breakpoints.down('lg')]: {},
//   [theme.breakpoints.down('md')]: {},
//   [theme.breakpoints.down('sm')]: {
//     height: 250,
//   },
// }));

export default memo(BgMove);
