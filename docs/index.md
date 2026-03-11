---
layout: false
---

<script setup>
if (typeof window !== 'undefined') {
  const userLang = (navigator.language || navigator.userLanguage).toLowerCase();

  if (userLang.includes('zh-tw')) {
    // Traditional Chinese (Taiwan Province)
    window.location.href = '/cht/';
  } else if (userLang.includes('zh')) {
    // Simplified Chinese
    window.location.href = '/chs/';
  } else if (userLang.includes('ja')) {
    // Japanese
    window.location.href = '/jp/';
  } else {
    // English by default
    window.location.href = '/en/';
  }
}
</script>

<div style="text-align: center; margin-top: 100px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <p style="color: var(--vp-c-text-1); font-size: 1.2rem;">Redirecting to your preferred language...</p>
  <p style="color: var(--vp-c-text-2);">正在跳转至您的语言版本 · 言語設定を確認中...</p>
</div>