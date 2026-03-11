<script setup lang="ts">
const contributors = [
  "allforme3",
  "ArkLingJing",
  "AstrowingRalmia",
  "Autospy",
  "AYANAMI_DESU",
  "BattleFrame",
  "BuruburuBon",
  "ChasteSora",
  "chabanshengjia",
  "CHN_H2Y23",
  "Code_Ultimate",
  "DBOY",
  "EnmaAI__",
  "Evangelion_Shinji",
  "Fomalhaut_CCCP",
  "Forencto",
  "FrostLeafFurioso",
  "Gtafan",
  "GTAGame",
  "Hinanawi_Tenshii",
  "Karol",
  "Karyl_Neko",
  "Kuonji_Alice_My_Waifu",
  "Lenxington",
  "Lettuce_Games",
  "Ling8a",
  "LukaDream",
  "MatroseFuchs",
  "Melkway_",
  "MIDORI_FUSE",
  "Miyuya",
  "Niya",
  "qianyin_Hearst",
  "Rikoko_",
  "Schweizerli",
  "shimakazesama",
  "Sorasakii_Hina",
  "Sunaookami_Shiroko",
  "Toono_Hanna",
  "walksQAQ",
  "Xjfan2004",
  "Yv0nne",
  "ZeroDegressG",
  "zhixiang",
  "霁月明空",
  "没吃饱的幽幽子",
  "三潘乌龟",
  "桑尼米尔克",
  "西行寺雨季",
].sort((a, b) => a.localeCompare(b, 'zh', { numeric: true })); // A-Z
</script>

<template>
  <div class="contributor-list">
    <span v-for="name in contributors" :key="name" class="contributor-tag">
      {{ name }}
    </span>
  </div>
</template>
