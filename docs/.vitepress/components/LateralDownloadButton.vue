<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

type Locale = 'chs' | 'cht' | 'de' | 'en' | 'es' | 'ja' | 'ru'

const props = defineProps<{
  locale: Locale
}>()

const METADATA_URL = '/metadata/lateral/metadata.json'
const RELEASES_URL = 'https://github.com/LocalizedKorabli/LK-Lateral/releases/latest'

const labels: Record<Locale, string> = {
  chs: '下载',
  cht: '下載',
  de: 'Herunterladen',
  en: 'Download',
  es: 'Descargar',
  ja: 'ダウンロード',
  ru: 'Скачать',
}

const label = labels[props.locale] ?? labels.en

const status = ref<'loading' | 'loaded' | 'failed'>('loading')
const url = ref<string | null>(null)
const version = ref<string | null>(null)

// 始终是有效链接：metadata 未就绪/失败时回退到 releases 页，
// 就绪后无缝切换到版本直链（href 变更不影响布局，故无跳变）
const href = computed(() => url.value ?? RELEASES_URL)

// 版本号槽位：加载中预留宽度（避免成功时跳变），
// 失败 / 无版本号时不渲染（避免右侧留下永久空白）
const showVersionSlot = computed(() => status.value === 'loading' || !!version.value)

onMounted(async () => {
  try {
    const res = await fetch(METADATA_URL, { cache: 'no-cache' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data?.path) url.value = data.path
    if (data?.version) version.value = data.version
    status.value = 'loaded'
  } catch {
    status.value = 'failed' // 收起占位，按钮回到纯文案宽度
  }
})
</script>

<template>
  <a class="vp-button brand lateral-dl" :href="href" target="_blank">
    {{ label }}<span
      v-if="showVersionSlot"
      class="lateral-ver"
      :class="{ loaded: !!version }"
    >v{{ version || '0.0.0' }}</span>
  </a>
</template>

<style scoped>
/*
 * 版本号槽位：
 * - 加载中：渲染 opacity:0 的占位文本撑出宽度（仍占布局），成功时版本号淡入原位，零跳变；
 * - 失败 / metadata 无版本号：整个 span 不渲染，按钮收回到纯文案宽度，右侧不留空白。
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
