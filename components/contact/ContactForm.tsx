'use client';

import { useState } from 'react';
import { SITE } from '@/lib/site';
import styles from './ContactForm.module.css';

const TOPICS = [
  'LP・ホームページ制作について',
  'MEO対策（Googleマップ集客）について',
  'AIブログ（SEO）について',
  '広告運用・動画について',
  'AI接客・AI業務改善について',
  '採用・求人支援について',
  'その他・まだ決まっていない',
];

export default function ContactForm() {
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // TODO(送信): フォームバックエンド未接続。Formspree / メール送信 / CRM 等に接続する。
    //             現状は送信完了ビューの表示のみ（データ送信は行っていない）。
    setDone(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (done) {
    return (
      <div className={styles.done} role="status" aria-live="polite">
        <h2 className={styles.doneTitle}>送信を受け付けました</h2>
        <p className={styles.doneBody}>
          ご入力ありがとうございます。1〜2営業日以内に <strong>{SITE.email}</strong>{' '}
          よりご返信します。
          <br />
          お急ぎの場合は{' '}
          <a className={styles.inlineLink} href={`mailto:${SITE.email}`}>
            メールで直接ご連絡
          </a>
          ください。
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="f-name">
          お名前<span className={styles.req}>必須</span>
        </label>
        <input id="f-name" name="name" type="text" required autoComplete="name" />
      </div>

      <div className={styles.field}>
        <label htmlFor="f-company">会社名・屋号</label>
        <input id="f-company" name="company" type="text" autoComplete="organization" />
      </div>

      <div className={styles.field}>
        <label htmlFor="f-email">
          メールアドレス<span className={styles.req}>必須</span>
        </label>
        <input id="f-email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className={styles.field}>
        <label htmlFor="f-topic">
          ご相談内容<span className={styles.req}>必須</span>
        </label>
        <select id="f-topic" name="topic" required defaultValue="">
          <option value="" disabled>
            選択してください
          </option>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="f-msg">
          現状の課題・ご質問<span className={styles.req}>必須</span>
        </label>
        <textarea
          id="f-msg"
          name="message"
          required
          rows={6}
          placeholder="例：問い合わせが月0件で、何から手を付ければいいか相談したい"
        />
      </div>

      <p className={styles.note}>
        送信いただいた内容は、ご相談への回答以外の目的には使用しません。
      </p>
      <button className={styles.submit} type="submit">
        この内容で送信する
      </button>
    </form>
  );
}
