import styles from './SectionLabel.module.css';

type Props = {
  /** 英字ラベル（eyebrow） */
  en: string;
  /** 見出し */
  title: string;
  /** 見出しの文字サイズ（既定 34px = セクション見出し） */
  titleSize?: number;
  className?: string;
};

export default function SectionLabel({ en, title, titleSize = 34, className }: Props) {
  return (
    <div className={`${styles.wrap} ${className ?? ''}`}>
      <span className={`${styles.en} font-en`}>{en}</span>
      <span className={styles.title} style={{ fontSize: titleSize }}>
        {title}
      </span>
    </div>
  );
}
