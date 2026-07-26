'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  /** 目標値（整数） */
  value: number;
  /** カウント対象外の固定接尾辞（例: "h"） */
  suffix?: string;
  durationMs?: number;
  className?: string;
};

/**
 * 数値カウントアップ（README「Interactions 2.」準拠）。
 * 画面内に入ったら（IO threshold .4）0→目標値へ 1600ms / easeOutCubic で1回のみ。
 * reduced-motion / no-JS では最終値をそのまま表示。
 */
export default function CountUp({ value, suffix = '', durationMs = 1600, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  // SSR / 初期描画は最終値（no-JS でも正しい数字が出る）
  const [n, setN] = useState(value);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setN(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;
    setN(0);

    const io = new IntersectionObserver(
      (entries) => {
        if (started || !entries.some((e) => e.isIntersecting)) return;
        started = true;
        const t0 = performance.now();
        const tick = (t: number) => {
          const raw = Math.min(1, (t - t0) / durationMs);
          const p = 1 - Math.pow(1 - raw, 3); // easeOutCubic
          setN(Math.round(value * p));
          if (raw < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}
