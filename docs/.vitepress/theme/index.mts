import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import ContributorList from '../components/ContributorList.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    // 注册全局组件
    app.component('ContributorList', ContributorList)

    if (typeof window !== 'undefined') {
      router.onBeforeRouteChange = () => {
        if (document.startViewTransition) {
          document.startViewTransition()
        }
      }
    }
  }
} satisfies Theme