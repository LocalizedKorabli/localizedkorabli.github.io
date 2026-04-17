<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

type Locale = 'chs' | 'cht' | 'en' | 'ja' | 'ru'

const props = defineProps<{
  locale: Locale
}>()

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
const STORE_PROTOCOL_URL = 'ms-windows-store://pdp/?productid=9P6S2T9MJTXQ'
const MSIX_URL = 'https://dl.localizedkorabli.org/lki/lk-next/lki_setup.Msix'
const KB3063858_URL = 'https://download.microsoft.com/download/0/8/e/08e0386b-f6af-4651-8d1b-c0a95d2731f0/Windows6.1-KB3063858-x64.msu'
const KB2999226_URL = 'https://download.microsoft.com/download/1/1/5/11565a9a-ea09-4f0a-a57e-520d5d138140/Windows6.1-KB2999226-x64.msu'

const texts: Record<Locale, {
  btnText: string
  modalTitle: string
  msixColTitle: string
  msixColNote: string
  exeColTitle: string
  exeColNote: string
  directLabel: string
  directDesc: string
  storeLabel: string
  storeDesc: string
  storeBtn: string
  msixLabel: string
  msixDesc: string
  win7Title: string
  win7Body: string
  win7Kb3: string
  win7Kb2: string
  close: string
  topChannels?: { label: string; desc: string; url: string }[]
  extraChannels?: { label: string; desc: string; url: string }[]
  msixExtraChannels?: { label: string; desc: string; url: string }[]
}> = {
  chs: {
    btnText: '下载',
    modalTitle: '下载澪刻 Next',
    msixColTitle: 'MSIX 安装程序',
    msixColNote: '支持 Windows 10/11',
    exeColTitle: 'EXE 安装程序',
    exeColNote: '支持 Windows 7/8/10/11',
    directLabel: '官方下载 (全球)',
    directDesc: '从海外服务器下载 EXE 安装程序',
    storeLabel: 'Microsoft Store',
    storeDesc: '通过 Microsoft Store 安装',
    storeBtn: '前往商店',
    msixLabel: '官方下载 (全球)',
    msixDesc: '从海外服务器下载 MSIX 安装程序',
    win7Title: 'Windows 7 用户须知',
    win7Body: '若您在 Windows 7 环境下无法运行此软件，请先尝试依序安装以下补丁：',
    win7Kb3: 'KB3063858',
    win7Kb2: 'KB2999226',
    close: '关闭',
    topChannels: [
      { label: '蓝奏云下载', desc: '从蓝奏云分享下载 EXE 安装程序', url: 'https://tapio.lanzouu.com/b0nzmcv9i' },
    ],
    extraChannels: [
      { label: '官方下载 (中国大陆)', desc: '从境内服务器下载 EXE 安装程序', url: 'http://lkdl.localizedkorabli.cn/lki/lk-next/lki_setup.exe' },
    ],
    msixExtraChannels: [
      { label: '官方下载 (中国大陆)', desc: '从境内服务器下载 MSIX 安装程序', url: 'http://lkdl.localizedkorabli.cn/lki/lk-next/lki_setup.Msix' },
    ],
  },
  cht: {
    btnText: '下載',
    modalTitle: '下載澪刻 Next',
    msixColTitle: 'MSIX 安裝程式',
    msixColNote: '支援 Windows 10/11',
    exeColTitle: 'EXE 安裝程式',
    exeColNote: '支援 Windows 7/8/10/11',
    directLabel: '官方下載',
    directDesc: '直接下載 EXE 安裝程式',
    storeLabel: 'Microsoft Store',
    storeDesc: '透過 Microsoft Store 安裝',
    storeBtn: '前往商店',
    msixLabel: '官方下載',
    msixDesc: '直接下載 MSIX 安裝程式',
    win7Title: 'Windows 7 使用者注意',
    win7Body: '若您在 Windows 7 環境下無法執行此軟體，請先嘗試依序安裝以下補丁：',
    win7Kb3: 'KB3063858',
    win7Kb2: 'KB2999226',
    close: '關閉',
  },
  en: {
    btnText: 'Download',
    modalTitle: 'Download LK Next',
    msixColTitle: 'MSIX Installer',
    msixColNote: 'Windows 10/11',
    exeColTitle: 'EXE Installer',
    exeColNote: 'Windows 7/8/10/11',
    directLabel: 'Direct Download',
    directDesc: 'Download the EXE installer directly',
    storeLabel: 'Microsoft Store',
    storeDesc: 'Install via Microsoft Store',
    storeBtn: 'Get from Store',
    msixLabel: 'Direct Download',
    msixDesc: 'Download the MSIX installer directly',
    win7Title: 'Windows 7 Users',
    win7Body: 'If the application fails to launch on Windows 7, try installing the following patches in order:',
    win7Kb3: 'KB3063858',
    win7Kb2: 'KB2999226',
    close: 'Close',
  },
  ja: {
    btnText: 'ダウンロード',
    modalTitle: '澪刻 Next をダウンロード',
    msixColTitle: 'MSIX インストーラー',
    msixColNote: 'Windows 10/11 対応',
    exeColTitle: 'EXE インストーラー',
    exeColNote: 'Windows 7/8/10/11 対応',
    directLabel: '直接ダウンロード',
    directDesc: 'EXE インストーラーを直接ダウンロード',
    storeLabel: 'Microsoft Store',
    storeDesc: 'Microsoft Store 経由でインストール',
    storeBtn: 'Store を開く',
    msixLabel: '直接ダウンロード',
    msixDesc: 'MSIX インストーラーを直接ダウンロード',
    win7Title: 'Windows 7 をお使いの方へ',
    win7Body: 'Windows 7 でこのソフトが起動しない場合は、以下の更新プログラムを順番にインストールしてみてください：',
    win7Kb3: 'KB3063858',
    win7Kb2: 'KB2999226',
    close: '閉じる',
  },
  ru: {
    btnText: 'Скачать',
    modalTitle: 'Скачать LK Next',
    msixColTitle: 'MSIX-установщик',
    msixColNote: 'Windows 10/11',
    exeColTitle: 'EXE-установщик',
    exeColNote: 'Windows 7/8/10/11',
    directLabel: 'Прямая загрузка',
    directDesc: 'Загрузить EXE-установщик напрямую',
    storeLabel: 'Microsoft Store',
    storeDesc: 'Установить через Microsoft Store',
    storeBtn: 'Открыть в Store',
    msixLabel: 'Прямая загрузка',
    msixDesc: 'Загрузить MSIX-установщик напрямую',
    win7Title: 'Для пользователей Windows 7',
    win7Body: 'Если приложение не запускается на Windows 7, попробуйте установить следующие обновления в указанном порядке:',
    win7Kb3: 'KB3063858',
    win7Kb2: 'KB2999226',
    close: 'Закрыть',
  },
}

const t = computed(() => texts[props.locale])
</script>

<template>
  <button class="vp-button brand dm-trigger" @click="openModal">
    {{ t.btnText }}
  </button>

  <Teleport v-if="isMounted" to="body">
    <Transition name="dm">
    <div v-if="isOpen" class="dm-backdrop" @click="onBackdropClick">
      <div class="dm-modal" role="dialog" aria-modal="true">
        <div class="dm-header">
          <span class="dm-title">{{ t.modalTitle }}</span>
          <button class="dm-close" @click="closeModal" :aria-label="t.close">✕</button>
        </div>

        <div class="dm-columns">
          <!-- Left: MSIX -->
          <div class="dm-col">
            <div class="dm-col-header">
              <span>{{ t.msixColTitle }}</span>
              <span class="dm-col-note">{{ t.msixColNote }}</span>
            </div>
            <div class="dm-col-options">
              <!-- Microsoft Store -->
              <a class="dm-option" :href="STORE_PROTOCOL_URL" target="_blank" rel="noopener noreferrer" @click="closeModal">
                <div class="dm-option-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </div>
                <div class="dm-option-body">
                  <div class="dm-option-label">{{ t.storeLabel }}</div>
                  <div class="dm-option-desc">{{ t.storeDesc }}</div>
                </div>
              </a>
              <!-- MSIX Package -->
              <a class="dm-option" :href="MSIX_URL" target="_blank" rel="noopener noreferrer" @click="closeModal">
                <div class="dm-option-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                </div>
                <div class="dm-option-body">
                  <div class="dm-option-label">{{ t.msixLabel }}</div>
                  <div class="dm-option-desc">{{ t.msixDesc }}</div>
                </div>
              </a>
              <!-- MSIX extra channels (locale-specific) -->
              <a
                v-for="ch in t.msixExtraChannels"
                :key="ch.url"
                class="dm-option"
                :href="ch.url"
                target="_blank"
                rel="noopener noreferrer"
                @click="closeModal"
              >
                <div class="dm-option-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                </div>
                <div class="dm-option-body">
                  <div class="dm-option-label">{{ ch.label }}</div>
                  <div class="dm-option-desc">{{ ch.desc }}</div>
                </div>
              </a>
            </div>
          </div>

          <div class="dm-col-divider"></div>

          <!-- Right: EXE -->
          <div class="dm-col">
            <div class="dm-col-header">
              <span>{{ t.exeColTitle }}</span>
              <span class="dm-col-note">{{ t.exeColNote }}</span>
            </div>
            <div class="dm-col-options">
              <!-- Top channels (before direct URL, locale-specific) -->
              <a
                v-for="ch in t.topChannels"
                :key="ch.url"
                class="dm-option"
                :href="ch.url"
                target="_blank"
                rel="noopener noreferrer"
                @click="closeModal"
              >
                <div class="dm-option-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
                <div class="dm-option-body">
                  <div class="dm-option-label">{{ ch.label }}</div>
                  <div class="dm-option-desc">{{ ch.desc }}</div>
                </div>
              </a>
              <!-- Direct Download -->
              <a class="dm-option" :href="DIRECT_URL" target="_blank" rel="noopener noreferrer" @click="closeModal">
                <div class="dm-option-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
                <div class="dm-option-body">
                  <div class="dm-option-label">{{ t.directLabel }}</div>
                  <div class="dm-option-desc">{{ t.directDesc }}</div>
                </div>
              </a>
              <!-- Extra channels (after direct URL, locale-specific) -->
              <a
                v-for="ch in t.extraChannels"
                :key="ch.url"
                class="dm-option"
                :href="ch.url"
                target="_blank"
                rel="noopener noreferrer"
                @click="closeModal"
              >
                <div class="dm-option-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
                <div class="dm-option-body">
                  <div class="dm-option-label">{{ ch.label }}</div>
                  <div class="dm-option-desc">{{ ch.desc }}</div>
                </div>
              </a>
            </div>
          </div>
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
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Modal transition ── */
.dm-enter-active,
.dm-leave-active {
  transition: opacity 0.2s ease;
}

.dm-enter-active .dm-modal,
.dm-leave-active .dm-modal {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.dm-enter-from,
.dm-leave-to {
  opacity: 0;
}

.dm-enter-from .dm-modal,
.dm-leave-to .dm-modal {
  transform: scale(0.96) translateY(-10px);
  opacity: 0;
}

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
  max-width: 680px;
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

/* ── Two-column layout ── */
.dm-columns {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0;
  padding: 16px 20px;
}

.dm-col {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.dm-col-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 10px;
  padding: 0 4px;
}

.dm-col-header > span:first-child {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-2);
}

.dm-col-note {
  font-size: 0.74rem;
  font-weight: 500;
  color: var(--vp-c-text-3, var(--vp-c-text-2));
  opacity: 0.75;
}

.dm-col-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dm-col-divider {
  width: 1px;
  background: var(--vp-c-divider);
  margin: 0 16px;
  align-self: stretch;
}

.dm-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  text-decoration: none !important;
  transition: border-color 0.2s, background 0.2s;
  cursor: pointer;
}

.dm-option:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-mute);
}

.dm-option-icon {
  flex-shrink: 0;
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
}


.dm-option-body {
  flex: 1;
  min-width: 0;
}

.dm-option-label {
  font-weight: 600;
  font-size: 0.88rem;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.dm-option-desc {
  font-size: 0.76rem;
  color: var(--vp-c-text-2);
  margin-top: 2px;
  line-height: 1.4;
}

@media (max-width: 480px) {
  .dm-columns {
    grid-template-columns: 1fr;
    padding: 16px;
  }

  .dm-col-divider {
    width: auto;
    height: 1px;
    margin: 12px 0;
  }
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
