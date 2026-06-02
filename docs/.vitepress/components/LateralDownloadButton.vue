<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Locale = 'chs' | 'cht' | 'en' | 'ja' | 'ru'

const props = defineProps<{
  locale: Locale
}>()

const METADATA_URL = '/metadata/lateral/metadata.json'
const RELEASES_URL = 'https://github.com/LocalizedKorabli/LK-Lateral/releases/latest'

const texts: Record<Locale, { download: string; loading: string; fallback: string }> = {
  chs: { download: '下载', loading: '获取中…', fallback: '前往下载页' },
  cht: { download: '下載', loading: '取得中…', fallback: '前往下載頁' },
  en: { download: 'Download', loading: 'Loading…', fallback: 'Go to Releases' },
  ja: { download: 'ダウンロード', loading: '取得中…', fallback: 'リリースページへ' },
  ru: { download: 'Скачать', loading: 'Загрузка…', fallback: 'Страница релизов' },
}

const t = texts[props.locale] ?? texts.en

const status = ref<'loading' | 'ready' | 'error'>('loading')
const url = ref<string | null>(null)
const version = ref<string | null>(null)

onMounted(async () => {
  try {
    const res = await fetch(METADATA_URL, { cache: 'no-cache' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (!data?.path) throw new Error('missing path')
    url.value = data.path
    version.value = data.version ?? null
    status.value = 'ready'
  } catch {
    status.value = 'error'
  }
})
</script>

<template>
  <a v-if="status === 'ready'" class="vp-button brand lateral-dl" :href="url ?? undefined" target="_blank">
    {{ t.download }}<span v-if="version" style="opacity: 0.8; margin-left: 0.4em;">v{{ version }}</span>
  </a>
  <span v-else-if="status === 'loading'" class="vp-button brand lateral-dl" style="opacity: 0.6; cursor: default;">
    {{ t.loading }}
  </span>
  <a v-else class="vp-button brand lateral-dl" :href="RELEASES_URL" target="_blank">
    {{ t.fallback }}
  </a>
</template>
