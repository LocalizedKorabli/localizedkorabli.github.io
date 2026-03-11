---
layout: page
---
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()
onMounted(() => {
  router.go('/ja/lk-next')
})
</script>

リダイレクト中…