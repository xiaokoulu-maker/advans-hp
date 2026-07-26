'use client';

import { useEffect, useRef, useState, type CSSProperties, type ElementType } from 'react';

type Props = {
  children?: React.ReactNode;
  /** 同一グループ内の並び順。70ms 刻みでディレイ（最大6段） */
  index?: number;
  className?: string;
  /** レンダリングするタグ（既定 div） */
  as?: ElementType;
  style?: CSSProperties;
  id?: string;
};

/**
 * スクロールリビール（README「Interactions 1.」準拠）。
 * IntersectionObserver（threshold .15 / rootMargin "0px 0px -8% 0px"）で
 * 交差したら opacity/translateY を1度だけ解除。
 * JS適用のため no-JS 環境では常に表示、reduced-motion では即時表示（globals.css）。
 */
export default function Reveal({
  children,
  index = 0,
  className,
  as: Tag = 'div',
  style,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const revealStyle: CSSProperties = mounted
    ? {
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(26px)',
        transition: 'opacity .8s var(--ease), transform .8s var(--ease)',
        transitionDelay: `${(index % 6) * 70}ms`,
      }
    : {};

  return (
    <Tag ref={ref} id={id} className={className} style={{ ...revealStyle, ...style }}>
      {children}
    </Tag>
  );
}
