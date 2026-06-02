<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

type Locale = 'chs' | 'cht' | 'en' | 'ja' | 'ru'

const props = defineProps<{
  locale: Locale
}>()

const METADATA_URL = '/metadata/lateral/metadata.json'
const RELEASES_URL = 'https://github.com/LocalizedKorabli/LK-Lateral/releases/latest'

const labels: Record<Locale, string> = {
  chs: '下载',
  cht: '下載',
  en: 'Download',
  ja: 'ダウンロード',
  ru: 'Скачать',
}

const label = labels[props.locale] ?? labels.en

const url = ref<string | null>(null)
const version = ref<string | null>(null)

// 始终是有效链接：metadata 未就绪/失败时回退到 releases 页，
// 就绪后无缝切换到版本直链（href 变更不影响布局，故无跳变）
const href = computed(() => url.value ?? RELEASES_URL)

onMounted(async () => {
  try {
    const res = await fetch(METADATA_URL, { cache: 'no-cache' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data?.path) url.value = data.path
    if (data?.version) version.value = data.version
  } catch {
    /* 保持回退到 RELEASES_URL */
  }
})
</script>

<template>
  <a class="vp-button brand lateral-dl" :href="href" target="_blank">
    {{ label }}<span class="lateral-ver" :class="{ loaded: version }">v{{ version || '0.0.0' }}</span>
  </a>
</template>

<style scoped>
/*
 * 版本号占位：未加载时以 opacity:0 的占位文本撑出宽度（仍占布局），
 * 加载后淡入并替换为真实版本号 —— 按钮宽度从首屏即固定，避免内容跳变。
 */
.lateral-ver {
  margin-left: 0.4em;
  opacity: 0;
}
.lateral-ver.loaded {
  opacity: 0.85;
  transition: opacity 0.2s ease;
}
</style>
