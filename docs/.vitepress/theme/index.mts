import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import ContributorList from '../components/ContributorList.vue'
import DownloadButton from '../components/DownloadButton.vue'
import LateralDownloadButton from '../components/LateralDownloadButton.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    // 注册全局组件
    app.component('ContributorList', ContributorList)
    app.component('DownloadButton', DownloadButton)
    app.component('LateralDownloadButton', LateralDownloadButton)

    if (typeof window !== 'undefined') {
      router.onBeforeRouteChange = () => {
        if (document.startViewTransition) {
          document.startViewTransition()
        }
      }
    }
  }
} satisfies Theme