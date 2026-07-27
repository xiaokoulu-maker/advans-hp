import Reveal from '@/components/Reveal';
import Button from '@/components/ui/Button';
import { SITE } from '@/lib/site';
import styles from './CtaBand.module.css';

type Props = {
  /** 見出しの差し替え（未指定は既定文言） */
  title?: string;
  /** 本文の差し替え（記事の ctaText 等。未指定は既定文言） */
  body?: React.ReactNode;
};

/** 下層ページ共通の「無料相談・お見積り」CTA帯 */
export default function CtaBand({ title, body }: Props = {}) {
  return (
    <section className={styles.band}>
      <div className={styles.glow} aria-hidden />
      <Reveal className={styles.inner}>
        <h2 className={styles.title}>{title ?? '無料相談・お見積りはこちら'}</h2>
        <p className={styles.body}>
          {body ?? (
            <>
              まずは、現状の集客・採用の課題をお聞かせください。
              <br />
              料金はヒアリングのうえお見積りします。初期費用＋月額の組み合わせや、成果報酬型のご相談も可能です。
            </>
          )}
        </p>
        <div className={styles.actions}>
          <Button href="/contact" variant="orange" size="lg">
            無料で相談する
          </Button>
          <Button href={`mailto:${SITE.email}`} variant="ghost" size="lg">
            メールで問い合わせる
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
