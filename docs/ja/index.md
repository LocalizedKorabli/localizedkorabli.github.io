---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "<ruby>澪<rt>リン</rt></ruby><ruby>刻<rt>カー</rt></ruby>"
  text: "LocalizedKorabli"
  tagline: "<p>コミュニティ主導の『Mir Korabley』</p><p>有志ローカライズチーム</p>"
  actions:
    - theme: brand
      text: ダウンロード
      link: /ja/lk-next
    - theme: alt
      text: について
      link: /ja/about

features:
  - title: 選べる 2 つのインストール方法
    details: 独自開発のオープンソース・オンライン自動インストーラー、またはオフラインパッケージ。あらゆる環境とユーザーのニーズに対応します
  - title: 迅速なリリース
    details: 公式サーバー及び PT サーバーの更新スケジュールに厳密に対応。バージョン公開と同時にローカライズを提供し、待機時間を最小化、バージョン不一致を防止します
  - title: 多言語対応
    details: 簡体字中国語、繁体字中国語、英語、日本語をサポート。地域を問わず、全てのプレイヤーが快適にゲームを楽しめる環境を目指しています
---

<style>
/* 针对注音的微调 */
rt {
  font-family: var(--vp-font-family-base);
  letter-spacing: 0.1em; /* 让注音字母之间稍微松散一点，更容易阅读 */
  user-select: none;    /* 防止用户在网页上划选文字时选到注音，导致复制出来乱码 */
}

/* 确保在小屏幕上，带注音的标题不会挤在一起 */
@media (max-width: 640px) {
  .vp-home-hero-text {
    line-height: 1.6;
    font-size: 32px !important; /* 如果字太长可以稍微缩一点 */
  }
}
</style>