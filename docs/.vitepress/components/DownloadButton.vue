<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

type Locale = 'chs' | 'cht' | 'en' | 'ja' | 'ru'

const props = withDefaults(defineProps<{
  locale: Locale
  storeUrl?: string
}>(), {
  storeUrl: ''
})

const isOpen = ref(false)
const isMounted = ref(false)

function openModal() { isOpen.value = true }
function closeModal() { isOpen.value = false }

function onBackdropClick(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('dm-backdrop')) {
    closeModal()
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) closeModal()
}

onMounted(() => {
  isMounted.value = true
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

watch(isOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

const DIRECT_URL = 'https://dl.localizedkorabli.org/lki/lk-next/lki_setup.exe'
const KB3063858_URL = 'https://catalog.update.microsoft.com/search.aspx?q=KB3063858+windows+7+x64'
const KB2999226_URL = 'https://catalog.update.microsoft.com/search.aspx?q=KB2999226+windows+7+x64'

const texts: Record<Locale, {
  btnText: string
  modalTitle: string
  directLabel: string
  directDesc: string
  storeLabel: string
  storeDesc: string
  storeBtn: string
  storeSoon: string
  win7Title: string
  win7Body: string
  win7Kb3: string
  win7Kb2: string
  close: string
  extraChannels?: { label: string; desc: string; url: string }[]
}> = {
  chs: {
    btnText: '下载',
    modalTitle: '下载澪刻 Next',
    directLabel: '官方下载 (全球)',
    directDesc: '从澪刻官方服务器下载',
    storeLabel: 'Microsoft Store',
    storeDesc: '通过 Microsoft Store 下载',
    storeBtn: '前往商店',
    storeSoon: '即将上架',
    win7Title: 'Windows 7 用户须知',
    win7Body: '若您在 Windows 7 环境下无法运行此软件，请先尝试依序安装以下补丁：',
    win7Kb3: 'KB3063858',
    win7Kb2: 'KB2999226',
    close: '关闭',
    extraChannels: [
      { label: '官方下载 (中国大陆)', desc: '从位于中国大陆的澪刻官方镜像服务器下载', url: 'https://lkdl.localizedkorabli.cn/lki/lk-next/lki_setup.exe' },
      { label: '蓝奏云下载', desc: '通过蓝奏云分享下载', url: 'https://tapio.lanzouu.com/b0nzmcv9i' },
    ],
  },
  cht: {
    btnText: '下載',
    modalTitle: '下載澪刻 Next',
    directLabel: '官方下載',
    directDesc: '從澪刻官方伺服器下載',
    storeLabel: 'Microsoft Store',
    storeDesc: '透過 Microsoft Store 下載',
    storeBtn: '前往商店',
    storeSoon: '即將上架',
    win7Title: 'Windows 7 使用者注意',
    win7Body: '若您在 Windows 7 環境下無法執行此軟體，請先嘗試依序安裝以下補丁：',
    win7Kb3: 'KB3063858',
    win7Kb2: 'KB2999226',
    close: '關閉',
  },
  en: {
    btnText: 'Download',
    modalTitle: 'Download LK Next',
    directLabel: 'Direct Download (Official)',
    directDesc: 'Download directly from the LocalizedKorabli\'s official server',
    storeLabel: 'Microsoft Store',
    storeDesc: 'Download via Microsoft Store',
    storeBtn: 'Get from Store',
    storeSoon: 'Coming Soon',
    win7Title: 'Windows 7 Users',
    win7Body: 'If the application fails to launch on Windows 7, try installing the following patches in order:',
    win7Kb3: 'KB3063858',
    win7Kb2: 'KB2999226',
    close: 'Close',
  },
  ja: {
    btnText: 'ダウンロード',
    modalTitle: '澪刻 Next をダウンロード',
    directLabel: '直接ダウンロード',
    directDesc: '澪刻公式サーバーから直接ダウンロード',
    storeLabel: 'Microsoft Store',
    storeDesc: 'Microsoft Store 経由でダウンロード',
    storeBtn: 'Store を開く',
    storeSoon: '近日公開',
    win7Title: 'Windows 7 をお使いの方へ',
    win7Body: 'Windows 7 でこのソフトが起動しない場合は、以下の更新プログラムを順番にインストールしてみてください：',
    win7Kb3: 'KB3063858',
    win7Kb2: 'KB2999226',
    close: '閉じる',
  },
  ru: {
    btnText: 'Скачать',
    modalTitle: 'Скачать LK Next',
    directLabel: 'Прямая загрузка',
    directDesc: 'Загрузить напрямую с официального сервера LocalizedKorabli',
    storeLabel: 'Microsoft Store',
    storeDesc: 'Загрузить через Microsoft Store',
    storeBtn: 'Открыть в Store',
    storeSoon: 'Скоро',
    win7Title: 'Для пользователей Windows 7',
    win7Body: 'Если приложение не запускается на Windows 7, попробуйте установить следующие обновления в указанном порядке:',
    win7Kb3: 'KB3063858',
    win7Kb2: 'KB2999226',
    close: 'Закрыть',
  },
}

const t = computed(() => texts[props.locale])
const hasStore = computed(() => !!props.storeUrl)
</script>

<template>
  <button class="vp-button brand dm-trigger" @click="openModal">
    {{ t.btnText }}
  </button>

  <Teleport v-if="isMounted" to="body">
    <div v-if="isOpen" class="dm-backdrop" @click="onBackdropClick">
      <div class="dm-modal" role="dialog" aria-modal="true">
        <div class="dm-header">
          <span class="dm-title">{{ t.modalTitle }}</span>
          <button class="dm-close" @click="closeModal" :aria-label="t.close">✕</button>
        </div>

        <div class="dm-options">
          <!-- Microsoft Store -->
          <a
            v-if="hasStore"
            class="dm-option"
            :href="storeUrl"
            target="_blank"
            rel="noopener noreferrer"
            @click="closeModal"
          >
            <div class="dm-option-icon dm-icon-store">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <div class="dm-option-body">
              <div class="dm-option-label">{{ t.storeLabel }}</div>
              <div class="dm-option-desc">{{ t.storeDesc }}</div>
            </div>
            <span class="dm-option-badge dm-badge-brand">{{ t.storeBtn }}</span>
          </a>
          <div v-else class="dm-option dm-option-disabled">
            <div class="dm-option-icon dm-icon-store">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <div class="dm-option-body">
              <div class="dm-option-label">{{ t.storeLabel }}</div>
              <div class="dm-option-desc">{{ t.storeDesc }}</div>
            </div>
            <span class="dm-option-badge dm-badge-soon">{{ t.storeSoon }}</span>
          </div>

          <!-- Direct Download -->
          <a class="dm-option" :href="DIRECT_URL" target="_blank" rel="noopener noreferrer" @click="closeModal">
            <div class="dm-option-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
            <div class="dm-option-body">
              <div class="dm-option-label">{{ t.directLabel }}</div>
              <div class="dm-option-desc">{{ t.directDesc }}</div>
            </div>
          </a>

          <!-- Extra channels (locale-specific) -->
          <a
            v-for="ch in t.extraChannels"
            :key="ch.url"
            class="dm-option"
            :href="ch.url"
            target="_blank"
            rel="noopener noreferrer"
            @click="closeModal"
          >
            <div class="dm-option-icon dm-icon-extra">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
            <div class="dm-option-body">
              <div class="dm-option-label">{{ ch.label }}</div>
              <div class="dm-option-desc">{{ ch.desc }}</div>
            </div>
          </a>
        </div>

        <!-- Windows 7 Notice -->
        <div class="dm-win7">
          <div class="dm-win7-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            {{ t.win7Title }}
          </div>
          <p class="dm-win7-body">{{ t.win7Body }}</p>
          <ul class="dm-win7-list">
            <li><a :href="KB3063858_URL" target="_blank" rel="noopener noreferrer">{{ t.win7Kb3 }}</a></li>
            <li><a :href="KB2999226_URL" target="_blank" rel="noopener noreferrer">{{ t.win7Kb2 }}</a></li>
          </ul>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.dm-trigger {
  cursor: pointer;
  border: none;
  font-family: inherit;
}

/* ── Backdrop ── */
.dm-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
}

/* ── Modal Box ── */
.dm-modal {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.3);
}

/* ── Header ── */
.dm-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.dm-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.dm-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;
}

.dm-close:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

/* ── Download Options ── */
.dm-options {
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dm-option {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  text-decoration: none !important;
  transition: border-color 0.2s, background 0.2s;
  cursor: pointer;
}

.dm-option:not(.dm-option-disabled):hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-mute);
}

.dm-option-disabled {
  opacity: 0.6;
  cursor: default;
}

.dm-option-icon {
  flex-shrink: 0;
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
}

.dm-icon-store {
  color: var(--vp-c-text-2);
}

.dm-icon-extra {
  color: var(--vp-c-text-2);
}

.dm-option-body {
  flex: 1;
  min-width: 0;
}

.dm-option-label {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.dm-option-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-top: 2px;
  line-height: 1.4;
}

.dm-option-badge {
  flex-shrink: 0;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
}

.dm-badge-brand {
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}

.dm-badge-soon {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

/* ── Win7 Notice ── */
.dm-win7 {
  margin: 0 24px 20px;
  padding: 14px 16px;
  border-radius: 10px;
  background: var(--vp-custom-block-warning-bg, rgba(255, 197, 23, 0.1));
  border: 1px solid var(--vp-custom-block-warning-border, rgba(255, 197, 23, 0.4));
}

.dm-win7-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--vp-custom-block-warning-text, #b8860b);
  margin-bottom: 8px;
}

.dm-win7-body {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin: 0 0 6px;
  line-height: 1.5;
}

.dm-win7-list {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin: 0;
  padding-left: 18px;
  list-style-type: circle;
  line-height: 1.8;
}

.dm-win7-list a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.dm-win7-list a:hover {
  text-decoration: underline;
}
</style>
