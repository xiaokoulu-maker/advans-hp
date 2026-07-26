// ドメイン型定義。将来 microCMS 等の外部CMSへ移す前提で、
// UI から独立した「データの形」をここで確定させておく。

/** トップ Service セクションの1枚（詳細ページ slug と対応） */
export interface ServiceCard {
  no: string;
  slug: ServiceSlug;
  title: string;
  body: string;
}

/** Why REVANS の理由カード */
export interface Reason {
  title: string;
  body: string;
}

/** ご依頼の流れ（トップ 5ステップ） */
export interface FlowStep {
  no: string;
  title: string;
  body: string;
}

/** 制作事例カード。url があれば実案件、comingSoon なら準備中表示 */
export interface Work {
  slot: string;
  tag: string;
  title: string;
  body: string;
  url?: string;
  comingSoon: boolean;
}

/** 数値バー。suffix は "h" 等（カウント対象外の固定文字） */
export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

/** サービス詳細ページの slug（URL とリダイレクト対応表の正） */
export type ServiceSlug = 'web' | 'meo' | 'aiblog' | 'ads' | 'ai' | 'recruit';

/** サービス詳細：ISSUES */
export interface Issue {
  title: string;
  body: string;
}

/** サービス詳細：WHAT WE DO */
export interface Feature {
  no: string;
  title: string;
  body: string;
}

/** サービス詳細：進め方の1ステップ */
export interface DetailStep {
  title: string;
  body: string;
}

/** サービス詳細ページ1件 */
export interface ServiceDetail {
  slug: ServiceSlug;
  /** ページ英語ラベル（eyebrow） */
  en: string;
  title: string;
  /** meta description 兼リード文 */
  description: string;
  issues: Issue[];
  features: Feature[];
  flow: DetailStep[];
  /** FLOW 下の補足注記 */
  note: string;
  /** あわせて検討されるサービス（slug 参照） */
  related: ServiceSlug[];
}
