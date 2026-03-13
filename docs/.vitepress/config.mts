import { defineConfig } from 'vitepress'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LocalizedKorabli",
  description: "Homepage for LocalizedKorabli, a community-based localization team to translate the video game 'Мир кораблей' into multiple languages.",
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
        footer: {
          message: '本团队及项目与 Леста Игры 无官方关联。所有游戏资源版权归原权利人所有。',
          copyright: `© 2023–${new Date().getFullYear()} LocalizedKorabli 保留所有权利`
        },
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
        sidebar: [
          {
            text: 'Download I18n',
            items: [
              { text: 'Online Installer', link: '/en/lk-next' },
              { text: 'Offline Installer', link: '/en/offline-installer' }
            ]
          }
        ],
        footer: {
          message: 'The team and the project are not affiliated with Леста Игры. All game assets are the property of their respective owners.',
          copyright: `© 2023–${new Date().getFullYear()} LocalizedKorabli. All Rights Reserved.`
        },
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
        sidebar: [
          {
            text: '下載在地化',
            items: [
              { text: '線上安裝程式', link: '/cht/lk-next' },
              { text: '離綫安裝程式', link: '/cht/offline-installer' }
            ]
          }
        ],
        footer: {
          message: '本團隊及專案與 Леста Игры 無官方關聯。所有遊戲資源版權歸原權利人所有。',
          copyright: `© 2023–${new Date().getFullYear()} LocalizedKorabli 版權所有`
        },
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
        sidebar: [
          {
            text: 'ダウンロード',
            items: [
              { text: 'オンライン自動インストーラー', link: '/ja/lk-next' },
              { text: 'オフライン L10n パッケージ', link: '/ja/offline-installer' }
            ]
          }
        ],
        footer: {
          message: '当プロジェクトは Леста Игры とは一切関係ありません。ゲーム資産の著作権は各権利所有者に帰属します。',
          copyright: `© 2023–${new Date().getFullYear()} LocalizedKorabli. All Rights Reserved.`
        },
        logoLink: '/ja/'
      }
    }
  },
  head: [
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
      },
      {
        icon: 'x',
        link: 'https://x.com/RinkaaOfficial'
      }
    ],
    logo: '/svg/lki.svg',
    footer: {
      copyright: `Copyright © 2023–${new Date().getFullYear()} LocalizedKorabli`
    },
    logoLink: '/',
    /* siteTitle: false */
  }
})