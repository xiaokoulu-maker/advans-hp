import Link from 'next/link';
import styles from './Button.module.css';

type Variant = 'blue' | 'orange' | 'ghost';
type Size = 'md' | 'lg';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
};

/** CTA ボタン。href が http... なら外部リンク（新規タブ）、それ以外は内部遷移。 */
export default function Button({
  href,
  children,
  variant = 'blue',
  size = 'md',
  className,
  fullWidth,
}: Props) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.full : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
