<script setup lang="ts">
const num = useRoute().params.slug
const { data: post } = await useFetch(`https://jsonplaceholder.typicode.com/posts/${num}`)
</script>

<template>
  <div>
    <pre>
      {{ post }}
    </pre>
  </div>
</template>
