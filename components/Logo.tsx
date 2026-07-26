import styles from './Logo.module.css';

type Props = {
  /** ワードマークの文字サイズ(px)。A の高さは約1.48倍 */
  size?: number;
  /** ダーク背景版(既定) or ライト背景版 */
  variant?: 'dark' | 'light';
  className?: string;
};

/**
 * 5B RISING BAR ロゴ — ワードマーク「REVANS」の A の横棒を
 * オレンジの右上がり矢印に置換したロゴタイプ（README「ロゴ」準拠）。
 */
export default function Logo({ size = 23, variant = 'dark', className }: Props) {
  const svgW = size;
  const svgH = Math.round(size * 1.48);
  const stroke = variant === 'light' ? '#0A1220' : '#4DA3FF';
  const textColor = variant === 'light' ? '#0A1220' : '#F6F8FC';

  return (
    <span
      className={`${styles.logo} font-en ${className ?? ''}`}
      style={{ fontSize: size, color: textColor }}
      aria-label="REVANS"
    >
      <span aria-hidden>REV</span>
      <svg
        width={svgW}
        height={svgH}
        viewBox="0 0 54 80"
        fill="none"
        aria-hidden
        className={variant === 'dark' ? styles.glow : undefined}
      >
        <polyline
          points="6,74 27,22 48,74"
          stroke={stroke}
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line
          x1="13"
          y1="60"
          x2="43"
          y2="46"
          stroke="#FF6A2C"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <polyline
          points="32,42 46,44 44,58"
          stroke="#FF6A2C"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span aria-hidden>NS</span>
    </span>
  );
}
