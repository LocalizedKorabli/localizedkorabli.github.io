---
layout: page
---
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()
onMounted(() => {
  router.go('/cht/lk-next')
})
</script>

重定向中…