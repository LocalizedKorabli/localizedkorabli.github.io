import { defineConfig } from 'vitepress'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LocalizedKorabli",
  description: "Homepage for LocalizedKorabli, a community-based localization team to translate the video game 'Mir Korabley' into multiple languages.",
  // 多语言配置
  locales: {
    chs: {
      label: '简体中文',
      title: '澪刻LocalizedKorabli',
      lang: 'zh-CN',
      link: '/chs/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/chs/' },
          { text: '下载', link: '/chs/lk-next' },
          { text: '关于', link: '/chs/about' }
        ],
        sidebar: [
          {
            text: '下载本地化',
            items: [
              { text: '在线安装器', link: '/chs/lk-next' },
              { text: '离线安装包', link: '/chs/offline-installer' }
            ]
          }
        ],
        logoLink: '/chs/'
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Download', link: '/en/lk-next' },
          { text: 'About', link: '/en/about' }
        ],
        /* sidebar: [
          {
            text: 'Download I18n',
            items: [
              { text: 'Online Installer', link: '/en/lk-next' },
              { text: 'Offline Installer', link: '/en/offline-installer' }
            ]
          }
        ], */
        logoLink: '/en/'
      }
    },
    cht: {
      label: '繁體中文',
      title: '澪刻LocalizedKorabli',
      lang: 'zh-TW',
      link: '/cht/',
      themeConfig: {
        nav: [
          { text: '首頁', link: '/cht/' },
          { text: '下載', link: '/cht/lk-next' },
          { text: '關於', link: '/cht/about' }
        ],
        /* sidebar: [
          {
            text: '下載在地化',
            items: [
              { text: '線上安裝程式', link: '/cht/lk-next' },
              { text: '離綫安裝程式', link: '/cht/offline-installer' }
            ]
          }
        ] */
        logoLink: '/cht/'
      }
    },
    ja: {
      label: '日本語',
      title: '澪刻LocalizedKorabli',
      lang: 'ja-JP',
      link: '/ja/',
      themeConfig: {
        nav: [
          { text: 'ホーム', link: '/ja/' },
          { text: 'ダウンロード', link: '/ja/lk-next' },
          { text: 'について', link: '/ja/about' }
        ],
        /* sidebar: [
          {
            text: 'ダウンロード',
            items: [
              { text: 'オンライン版インストーラー', link: '/ja/lk-next' },
              { text: 'オフライン専用インストーラー', link: '/ja/offline-installer' }
            ]
          }
        ], */
        logoLink: '/ja/'
      }
    }
  },
  head: [
    // 如果你使用的是 .svg 格式（推荐，因为你之前提到过 /svg/lki.svg）
    ['link', { rel: 'icon', href: '/svg/lki.svg' }]
  ],
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/LocalizedKorabli' 
      },
      {
        icon: 'discord',
        link: 'https://discord.gg/3d9k2mkWy4' 
      },
      {
        icon: 'patreon',
        link: 'https://www.patreon.com/c/LocalizedKorabli' 
      }
    ],
    logo: '/svg/lki.svg',
    logoLink: '/',
    /* siteTitle: false */
  }
})