"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const g = (t: number, w: number) => Math.exp(-(t * t) / (2 * w * w));

// One heartbeat (P, QRS, T) as a function of t, where t = 0 is the R spike.
const beat = (t: number) =>
  0.12 * g(t + 0.3, 0.045) - 0.14 * g(t + 0.045, 0.012) + g(t, 0.013) - 0.28 * g(t - 0.04, 0.014) + 0.22 * g(t - 0.3, 0.06);

/**
 * The hero's heartbeat trace. The R spike sits under the pointer; with no pointer it
 * sweeps like a monitor. The loop runs only while the hero is on screen.
 */
export function Pulse() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const reduce = prefersReducedMotion();
    let W = 0, H = 0, dpr = 1, raf = 0, visible = true;
    let px = 0.62, target = 0.62, lastMove = -1e9, amp = 1;
    const color = getComputedStyle(c).color;

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = c.clientWidth;
      H = c.clientHeight;
      c.width = W * dpr;
      c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const idle = now - lastMove > 2200;
      if (idle && !reduce) target = ((now / 5200) % 1) * 1.3 - 0.15;
      px += (target - px) * (idle ? 1 : 0.09);
      amp += ((idle ? 0.8 : 1) - amp) * 0.05;
      ctx.clearRect(0, 0, W, H);
      const base = H * 0.62;
      const scale = Math.min(H * 0.55, 300);
      const period = Math.max(W * 0.34, 340);
      const span = Math.max(W, 1);

      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 1.5) {
        let y = 0;
        for (let k = -3; k <= 3; k++) {
          const cx = px * span + k * period;
          const falloff = Math.exp(-(k * k) / 3);
          y += falloff * beat((x - cx) / period);
        }
        const yy = base - y * scale * amp;
        x === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
      }
      ctx.stroke();

      // The bright point riding the spike.
      ctx.shadowBlur = 24;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(px * span, base - scale * amp, 4, 0, Math.PI * 2);
      ctx.fill();

      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      target = (e.clientX - r.left) / r.width;
      lastMove = performance.now();
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });

    size();
    const ro = new ResizeObserver(() => {
      size();
      if (reduce) draw(0);
    });
    ro.observe(c);
    io.observe(c);
    window.addEventListener("pointermove", move);
    draw(performance.now());
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={ref} className="pulse" aria-hidden />;
}
